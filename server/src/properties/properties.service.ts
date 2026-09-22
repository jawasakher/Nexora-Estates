import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { Prisma, PropertyStatus } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser } from '../auth/auth.types'
import { CreatePropertyDto } from './dto/create-property.dto'
import { PropertyQueryDto } from './dto/property-query.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'

const toNumber = (value: Prisma.Decimal | number | null | undefined) =>
  value === null || value === undefined ? null : Number(value)

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'property'

  const isUuid = (value: string) => /^[0-9a-f-]{36}$/i.test(value)

const serializeProperty = (property: Prisma.PropertyGetPayload<{ include: { images: true } }>) => ({
  _id: property.id,
  id: property.id,
  slug: property.slug,
  title: property.title,
  description: property.description,
  propertyType: property.propertyType,
  status: property.status,
  listingType: property.listingType,
  currency: property.currency,
  price: {
    rent: toNumber(property.priceRent),
    sale: toNumber(property.priceSale),
  },
  facilities: {
    bedrooms: property.bedrooms ?? 0,
    bathrooms: property.bathrooms ?? 0,
    garages: property.garages ?? 0,
  },
  area: toNumber(property.area),
  city: property.city,
  country: property.country,
  address: property.address,
  latitude: toNumber(property.latitude),
  longitude: toNumber(property.longitude),
  isAvailable: property.isAvailable,
  images: property.images
    .sort((first, second) => first.sortOrder - second.sortOrder)
    .map((image) => image.url),
  createdAt: property.createdAt,
  updatedAt: property.updatedAt,
})

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublic(query: PropertyQueryDto) {
    const page = query.page || 1
    const limit = query.limit || 20
    const where: Prisma.PropertyWhereInput = {
      status: PropertyStatus.PUBLISHED,
      isAvailable: true,
      ...(query.city && { city: { contains: query.city, mode: 'insensitive' } }),
      ...(query.country && { country: { contains: query.country, mode: 'insensitive' } }),
      ...(query.propertyType && { propertyType: { contains: query.propertyType, mode: 'insensitive' } }),
      ...(query.listingType && { listingType: query.listingType }),
      ...(query.bedrooms !== undefined && { bedrooms: { gte: query.bedrooms } }),
      ...(query.bathrooms !== undefined && { bathrooms: { gte: query.bathrooms } }),
    }

    const andFilters: Prisma.PropertyWhereInput[] = []
    if (query.q) {
      andFilters.push({
        OR: [
          { title: { contains: query.q, mode: 'insensitive' } },
          { description: { contains: query.q, mode: 'insensitive' } },
          { city: { contains: query.q, mode: 'insensitive' } },
          { address: { contains: query.q, mode: 'insensitive' } },
        ],
      })
    }

    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      const priceFilter = {
        ...(query.minPrice !== undefined && { gte: query.minPrice }),
        ...(query.maxPrice !== undefined && { lte: query.maxPrice }),
      }
      andFilters.push({
        OR: [
        { priceRent: priceFilter },
        { priceSale: priceFilter },
        ],
      })
    }

    if (andFilters.length) where.AND = andFilters

    const [properties, total] = await this.prisma.$transaction([
      this.prisma.property.findMany({
        where,
        include: { images: true },
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.property.count({ where }),
    ])

    return {
      data: properties.map(serializeProperty),
      meta: {
        page,
        limit,
        total,
        hasNextPage: page * limit < total,
      },
    }
  }

  async findPublicOne(idOrSlug: string) {
    const identityFilter: Prisma.PropertyWhereInput = isUuid(idOrSlug)
      ? { id: idOrSlug }
      : { slug: idOrSlug }
    const property = await this.prisma.property.findFirst({
      where: {
        status: PropertyStatus.PUBLISHED,
        isAvailable: true,
        ...identityFilter,
      },
      include: { images: true },
    })

    if (!property) throw new NotFoundException('Property not found')
    return { data: serializeProperty(property) }
  }

  async findOwnerProperties(user: AuthenticatedUser, query: PropertyQueryDto) {
    const where: Prisma.PropertyWhereInput = user.role === 'ADMIN' ? {} : { ownerId: user.id }
    const properties = await this.prisma.property.findMany({
      where,
      include: { images: true },
      orderBy: { createdAt: 'desc' },
      skip: ((query.page || 1) - 1) * (query.limit || 20),
      take: query.limit || 20,
    })

    return { data: properties.map(serializeProperty) }
  }

  async create(user: AuthenticatedUser, dto: CreatePropertyDto) {
    if (!['OWNER', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Owner role is required')
    }

    const baseSlug = slugify(dto.title)
    const slug = `${baseSlug}-${Date.now().toString(36)}`
    const property = await this.prisma.property.create({
      data: {
        ownerId: user.id,
        title: dto.title.trim(),
        slug,
        description: dto.description.trim(),
        propertyType: dto.propertyType.trim(),
        listingType: dto.listingType,
        priceSale: dto.priceSale,
        priceRent: dto.priceRent,
        currency: dto.currency?.toUpperCase(),
        area: dto.area,
        bedrooms: dto.bedrooms,
        bathrooms: dto.bathrooms,
        garages: dto.garages,
        city: dto.city.trim(),
        country: dto.country.trim(),
        address: dto.address.trim(),
        latitude: dto.latitude,
        longitude: dto.longitude,
      },
      include: { images: true },
    })

    return { data: serializeProperty(property) }
  }

  async update(user: AuthenticatedUser, propertyId: string, dto: UpdatePropertyDto) {
    const property = await this.getOwnedProperty(user, propertyId)
    const data: Prisma.PropertyUpdateInput = {}

    for (const [key, value] of Object.entries(dto)) {
      if (value !== undefined) data[key as keyof Prisma.PropertyUpdateInput] = value as never
    }

    for (const key of ['title', 'description', 'propertyType', 'city', 'country', 'address']) {
      const value = data[key as keyof Prisma.PropertyUpdateInput]
      if (typeof value === 'string') data[key as keyof Prisma.PropertyUpdateInput] = value.trim() as never
    }

    const updated = await this.prisma.property.update({
      where: { id: property.id },
      data,
      include: { images: true },
    })

    return { data: serializeProperty(updated) }
  }

  async remove(user: AuthenticatedUser, propertyId: string) {
    const property = await this.getOwnedProperty(user, propertyId)
    await this.prisma.property.update({
      where: { id: property.id },
      data: { status: PropertyStatus.ARCHIVED, isAvailable: false },
    })
    return { data: { _id: property.id, status: PropertyStatus.ARCHIVED } }
  }

  async setAvailability(user: AuthenticatedUser, propertyId: string, isAvailable: boolean) {
    const property = await this.getOwnedProperty(user, propertyId)
    const updated = await this.prisma.property.update({
      where: { id: property.id },
      data: { isAvailable, status: isAvailable ? PropertyStatus.PUBLISHED : PropertyStatus.HIDDEN },
      include: { images: true },
    })
    return { data: serializeProperty(updated) }
  }

  private async getOwnedProperty(user: AuthenticatedUser, propertyId: string) {
    if (!isUuid(propertyId)) {
      throw new BadRequestException('Property id must be a UUID')
    }

    const property = await this.prisma.property.findUnique({ where: { id: propertyId } })
    if (!property) throw new NotFoundException('Property not found')
    if (user.role !== 'ADMIN' && property.ownerId !== user.id) {
      throw new ForbiddenException('You do not own this property')
    }
    if (property.status === PropertyStatus.ARCHIVED) {
      throw new ConflictException('Archived properties cannot be modified')
    }
    return property
  }
}
