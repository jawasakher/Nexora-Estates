import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import {
  BookingStatus,
  Prisma,
  PropertyStatus,
  UserRole,
  UserStatus,
} from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser } from '../auth/auth.types'
import { AdminListQueryDto } from './dto/admin-list-query.dto'
import { ModeratePropertyDto } from './dto/moderate-property.dto'
import { UpdateUserRoleDto } from './dto/update-user-role.dto'

const isUuid = (value: string) => /^[0-9a-f-]{36}$/i.test(value)

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async overview() {
    const [users, owners, properties, pendingProperties, bookings, pendingBookings, leads] =
      await this.prisma.$transaction([
        this.prisma.user.count({ where: { status: { not: UserStatus.DELETED } } }),
        this.prisma.user.count({ where: { role: UserRole.OWNER, status: UserStatus.ACTIVE } }),
        this.prisma.property.count({ where: { status: { not: PropertyStatus.ARCHIVED } } }),
        this.prisma.property.count({ where: { status: PropertyStatus.PENDING_REVIEW } }),
        this.prisma.booking.count(),
        this.prisma.booking.count({ where: { status: BookingStatus.PENDING } }),
        this.prisma.lead.count(),
      ])

    return {
      data: {
        users,
        owners,
        properties,
        pendingProperties,
        bookings,
        pendingBookings,
        leads,
      },
    }
  }

  async listUsers(query: AdminListQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.UserWhereInput = {
      status: { not: UserStatus.DELETED },
      ...(query.q && {
        OR: [
          { email: { contains: query.q, mode: 'insensitive' } },
          { name: { contains: query.q, mode: 'insensitive' } },
          { clerkUserId: { contains: query.q, mode: 'insensitive' } },
        ],
      }),
    }
    const [users, total] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        where,
        select: {
          id: true,
          clerkUserId: true,
          email: true,
          name: true,
          avatarUrl: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          _count: { select: { properties: true, bookings: true, leads: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.user.count({ where }),
    ])

    return { data: users, meta: this.meta(page, limit, total) }
  }

  async updateUserRole(actor: AuthenticatedUser, userId: string, dto: UpdateUserRoleDto) {
    this.assertUuid(userId, 'User id')
    if (actor.id === userId) throw new ConflictException('Admins cannot change their own role')

    const user = await this.prisma.user.findUnique({ where: { id: userId } })
    if (!user) throw new NotFoundException('User not found')
    if (user.role === dto.role) return { data: user }

    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.user.update({ where: { id: user.id }, data: { role: dto.role } })
      await tx.auditLog.create({
        data: {
          actorId: actor.id,
          action: 'USER_ROLE_UPDATED',
          entityType: 'User',
          entityId: user.id,
          before: { role: user.role },
          after: { role: result.role },
        },
      })
      return result
    })

    return { data: updated }
  }

  async listProperties(query: AdminListQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.PropertyWhereInput = query.q
      ? {
          OR: [
            { title: { contains: query.q, mode: 'insensitive' } },
            { city: { contains: query.q, mode: 'insensitive' } },
            { country: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {}
    const [properties, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        include: {
          owner: { select: { id: true, email: true, name: true, role: true } },
          _count: { select: { images: true, bookings: true, leads: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.property.count({ where }),
    ])

    return { data: properties, meta: this.meta(page, limit, total) }
  }

  async publishProperty(actor: AuthenticatedUser, propertyId: string) {
    return this.moderateProperty(actor, propertyId, PropertyStatus.PUBLISHED, undefined)
  }

  async rejectProperty(actor: AuthenticatedUser, propertyId: string, dto: ModeratePropertyDto) {
    if (!dto.reason?.trim()) throw new BadRequestException('Rejection reason is required')
    return this.moderateProperty(actor, propertyId, PropertyStatus.HIDDEN, dto.reason.trim())
  }

  async listBookings(query: AdminListQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.BookingWhereInput = query.q
      ? {
          OR: [
            { user: { email: { contains: query.q, mode: 'insensitive' } } },
            { property: { title: { contains: query.q, mode: 'insensitive' } } },
          ],
        }
      : {}
    const [bookings, total] = await this.prisma.$transaction([
      this.prisma.booking.findMany({
        where,
        include: {
          user: { select: { id: true, email: true, name: true } },
          property: { select: { id: true, title: true, ownerId: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.booking.count({ where }),
    ])

    return { data: bookings, meta: this.meta(page, limit, total) }
  }

  async listLeads(query: AdminListQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.LeadWhereInput = query.q
      ? {
          OR: [
            { name: { contains: query.q, mode: 'insensitive' } },
            { email: { contains: query.q, mode: 'insensitive' } },
            { message: { contains: query.q, mode: 'insensitive' } },
          ],
        }
      : {}
    const [leads, total] = await this.prisma.$transaction([
      this.prisma.lead.findMany({
        where,
        include: {
          property: { select: { id: true, title: true } },
          submitter: { select: { id: true, email: true, name: true } },
          assignedTo: { select: { id: true, email: true, name: true } },
        },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.lead.count({ where }),
    ])

    return { data: leads, meta: this.meta(page, limit, total) }
  }

  async listAuditLogs(query: AdminListQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.AuditLogWhereInput = query.q
      ? {
          OR: [
            { action: { contains: query.q, mode: 'insensitive' } },
            { entityType: { contains: query.q, mode: 'insensitive' } },
            { entityId: query.q },
          ],
        }
      : {}
    const [logs, total] = await this.prisma.$transaction([
      this.prisma.auditLog.findMany({
        where,
        include: { actor: { select: { id: true, email: true, name: true, role: true } } },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.auditLog.count({ where }),
    ])

    return { data: logs, meta: this.meta(page, limit, total) }
  }

  private async moderateProperty(
    actor: AuthenticatedUser,
    propertyId: string,
    status: PropertyStatus,
    reason?: string,
  ) {
    this.assertUuid(propertyId, 'Property id')
    const property = await this.prisma.property.findUnique({ where: { id: propertyId } })
    if (!property) throw new NotFoundException('Property not found')
    if (property.status === PropertyStatus.ARCHIVED) {
      throw new ConflictException('Archived properties cannot be moderated')
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const result = await tx.property.update({
        where: { id: property.id },
        data: {
          status,
          isAvailable: status === PropertyStatus.PUBLISHED,
          publishedAt: status === PropertyStatus.PUBLISHED ? new Date() : null,
        },
      })
      await tx.auditLog.create({
        data: {
          actorId: actor.id,
          action: status === PropertyStatus.PUBLISHED ? 'PROPERTY_PUBLISHED' : 'PROPERTY_REJECTED',
          entityType: 'Property',
          entityId: property.id,
          before: { status: property.status },
          after: { status: result.status, reason: reason || null },
        },
      })
      return result
    })

    return { data: updated }
  }

  private assertUuid(value: string, label: string) {
    if (!isUuid(value)) throw new BadRequestException(`${label} must be a UUID`)
  }

  private meta(page: number, limit: number, total: number) {
    return { page, limit, total, hasNextPage: page * limit < total }
  }
}
