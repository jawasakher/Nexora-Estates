import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { BookingStatus, Prisma, PropertyStatus } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser } from '../auth/auth.types'
import { BookingQueryDto } from './dto/booking-query.dto'
import { CreateBookingDto } from './dto/create-booking.dto'

const activeStatuses: BookingStatus[] = [BookingStatus.PENDING, BookingStatus.CONFIRMED]

const isUuid = (value: string) => /^[0-9a-f-]{36}$/i.test(value)

const nightsBetween = (checkIn: Date, checkOut: Date) =>
  Math.ceil((checkOut.getTime() - checkIn.getTime()) / 86_400_000)

const serializeBooking = (
  booking: Prisma.BookingGetPayload<{ include: { property: { include: { images: true } } } }>,
) => ({
  _id: booking.id,
  id: booking.id,
  propertyId: booking.propertyId,
  checkInDate: booking.checkInDate,
  checkOutDate: booking.checkOutDate,
  guests: booking.guests,
  totalPrice: Number(booking.totalPrice),
  currency: booking.currency,
  status: booking.status,
  paymentStatus: booking.paymentStatus,
  isPaid: booking.paymentStatus === 'PAID',
  customerNote: booking.customerNote,
  ownerNote: booking.ownerNote,
  rejectionReason: booking.rejectionReason,
  createdAt: booking.createdAt,
  updatedAt: booking.updatedAt,
  property: {
    _id: booking.property.id,
    id: booking.property.id,
    title: booking.property.title,
    address: booking.property.address,
    city: booking.property.city,
    country: booking.property.country,
    images: booking.property.images
      .sort((first, second) => first.sortOrder - second.sortOrder)
      .map((image) => image.url),
  },
})

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: AuthenticatedUser, dto: CreateBookingDto) {
    if (!isUuid(dto.propertyId)) throw new BadRequestException('propertyId must be a UUID')

    const checkIn = new Date(dto.checkInDate)
    const checkOut = new Date(dto.checkOutDate)
    const nights = nightsBetween(checkIn, checkOut)

    if (nights < 1) {
      throw new BadRequestException('checkOutDate must be after checkInDate')
    }

    return this.prisma.$transaction(async (tx) => {
      const lockedProperties = await tx.$queryRaw<{ id: string }[]>(Prisma.sql`
        SELECT id FROM "Property" WHERE id = ${dto.propertyId}::uuid FOR UPDATE
      `)

      if (!lockedProperties.length) throw new NotFoundException('Property not found')

      const property = await tx.property.findUnique({ where: { id: dto.propertyId } })
      if (!property || property.status !== PropertyStatus.PUBLISHED || !property.isAvailable) {
        throw new ConflictException('Property is not available for booking')
      }

      if (property.bedrooms && dto.guests > property.bedrooms * 2) {
        throw new BadRequestException('Guest count exceeds property capacity')
      }

      const conflict = await tx.booking.findFirst({
        where: {
          propertyId: property.id,
          status: { in: activeStatuses },
          checkInDate: { lt: checkOut },
          checkOutDate: { gt: checkIn },
        },
        select: { id: true },
      })

      if (conflict) throw new ConflictException('Selected dates are already booked')

      const nightlyPrice = property.priceRent ?? property.priceSale
      if (nightlyPrice === null) {
        throw new ConflictException('Property has no bookable price')
      }

      const booking = await tx.booking.create({
        data: {
          userId: user.id,
          propertyId: property.id,
          checkInDate: checkIn,
          checkOutDate: checkOut,
          guests: dto.guests,
          totalPrice: Number(nightlyPrice) * nights,
          currency: property.currency,
          customerNote: dto.customerNote?.trim(),
        },
        include: { property: { include: { images: true } } },
      })

      return { data: serializeBooking(booking) }
    })
  }

  async findMine(user: AuthenticatedUser, query: BookingQueryDto) {
    const where: Prisma.BookingWhereInput = {
      userId: user.id,
      ...(query.status && { status: query.status }),
      ...(query.propertyId && { propertyId: query.propertyId }),
    }
    return this.paginated(where, query)
  }

  async findOwner(user: AuthenticatedUser, query: BookingQueryDto) {
    const where: Prisma.BookingWhereInput = {
      ...(user.role === 'ADMIN' ? {} : { property: { ownerId: user.id } }),
      ...(query.status && { status: query.status }),
      ...(query.propertyId && { propertyId: query.propertyId }),
    }
    return this.paginated(where, query)
  }

  async findOne(user: AuthenticatedUser, bookingId: string) {
    const booking = await this.getBooking(bookingId)
    this.assertCanAccess(user, booking)
    return { data: serializeBooking(booking) }
  }

  async cancel(user: AuthenticatedUser, bookingId: string) {
    const booking = await this.getBooking(bookingId)
    this.assertCanAccess(user, booking)

    if (!activeStatuses.includes(booking.status)) {
      throw new ConflictException('Booking cannot be cancelled in its current state')
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.CANCELLED },
      include: { property: { include: { images: true } } },
    })
    return { data: serializeBooking(updated) }
  }

  async confirm(user: AuthenticatedUser, bookingId: string) {
    const booking = await this.getBooking(bookingId)
    this.assertOwnerAccess(user, booking)

    if (booking.status !== BookingStatus.PENDING) {
      throw new ConflictException('Only pending bookings can be confirmed')
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      await tx.$queryRaw(Prisma.sql`
        SELECT id FROM "Property" WHERE id = ${booking.propertyId}::uuid FOR UPDATE
      `)
      const conflict = await tx.booking.findFirst({
        where: {
          id: { not: booking.id },
          propertyId: booking.propertyId,
          status: BookingStatus.CONFIRMED,
          checkInDate: { lt: booking.checkOutDate },
          checkOutDate: { gt: booking.checkInDate },
        },
      })
      if (conflict) throw new ConflictException('Dates conflict with a confirmed booking')

      return tx.booking.update({
        where: { id: booking.id },
        data: { status: BookingStatus.CONFIRMED },
        include: { property: { include: { images: true } } },
      })
    })

    return { data: serializeBooking(updated) }
  }

  async reject(user: AuthenticatedUser, bookingId: string, reason: string) {
    const booking = await this.getBooking(bookingId)
    this.assertOwnerAccess(user, booking)
    if (booking.status !== BookingStatus.PENDING) {
      throw new ConflictException('Only pending bookings can be rejected')
    }

    const updated = await this.prisma.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.REJECTED, rejectionReason: reason.trim() },
      include: { property: { include: { images: true } } },
    })
    return { data: serializeBooking(updated) }
  }

  private async paginated(where: Prisma.BookingWhereInput, query: BookingQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const [bookings, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: { property: { include: { images: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.booking.count({ where }),
    ])

    return {
      data: bookings.map(serializeBooking),
      meta: { page, limit, total, hasNextPage: page * limit < total },
    }
  }

  private async getBooking(bookingId: string) {
    if (!isUuid(bookingId)) throw new BadRequestException('Booking id must be a UUID')
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: { property: { include: { images: true } } },
    })
    if (!booking) throw new NotFoundException('Booking not found')
    return booking
  }

  private assertCanAccess(user: AuthenticatedUser, booking: Awaited<ReturnType<BookingsService['getBooking']>>) {
    if (user.role === 'ADMIN' || booking.userId === user.id || booking.property.ownerId === user.id) return
    throw new ForbiddenException('You do not have access to this booking')
  }

  private assertOwnerAccess(user: AuthenticatedUser, booking: Awaited<ReturnType<BookingsService['getBooking']>>) {
    if (user.role === 'ADMIN' || (user.role === 'OWNER' && booking.property.ownerId === user.id)) return
    throw new ForbiddenException('Owner access is required')
  }
}
