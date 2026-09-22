import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { createHash } from 'node:crypto'
import { PrismaService } from '../prisma/prisma.service'
import { AuthenticatedUser } from '../auth/auth.types'
import { AttachImageDto } from './dto/attach-image.dto'
import { ReorderImagesDto } from './dto/reorder-images.dto'

const isUuid = (value: string) => /^[0-9a-f-]{36}$/i.test(value)

@Injectable()
export class MediaService {
  private readonly cloudName?: string
  private readonly apiKey?: string
  private readonly apiSecret?: string
  private readonly folder: string

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    this.cloudName = this.config.get<string>('CLOUDINARY_CLOUD_NAME')
    this.apiKey = this.config.get<string>('CLOUDINARY_API_KEY')
    this.apiSecret = this.config.get<string>('CLOUDINARY_API_SECRET')
    this.folder = this.config.get<string>('CLOUDINARY_FOLDER') || 'nexora-estates/properties'
  }

  createUploadSignature(user: AuthenticatedUser) {
    this.assertOwner(user)
    this.assertCloudinaryConfigured()

    const timestamp = Math.floor(Date.now() / 1000)
    const signature = this.sign({ folder: this.folder, timestamp })

    return {
      data: {
        cloudName: this.cloudName,
        apiKey: this.apiKey,
        folder: this.folder,
        timestamp,
        signature,
      },
    }
  }

  async attachImage(user: AuthenticatedUser, propertyId: string, dto: AttachImageDto) {
    const property = await this.getOwnedProperty(user, propertyId)
    const image = await this.prisma.propertyImage.create({
      data: {
        propertyId: property.id,
        url: dto.url,
        storageKey: dto.storageKey,
        altText: dto.altText,
        sortOrder: dto.sortOrder ?? 0,
        isCover: dto.isCover ?? false,
      },
    })

    if (image.isCover) {
      await this.prisma.propertyImage.updateMany({
        where: { propertyId: property.id, id: { not: image.id } },
        data: { isCover: false },
      })
    }

    return { data: image }
  }

  async reorderImages(user: AuthenticatedUser, propertyId: string, dto: ReorderImagesDto) {
    const property = await this.getOwnedProperty(user, propertyId)
    const images = await this.prisma.propertyImage.findMany({
      where: { propertyId: property.id },
      select: { id: true },
    })
    const existingIds = new Set(images.map((image) => image.id))

    if (dto.imageIds.length !== images.length || dto.imageIds.some((id) => !existingIds.has(id))) {
      throw new BadRequestException('imageIds must contain every image belonging to the property')
    }

    await this.prisma.$transaction(
      dto.imageIds.map((imageId, index) =>
        this.prisma.propertyImage.update({
          where: { id: imageId },
          data: { sortOrder: index },
        }),
      ),
    )

    return { data: { propertyId: property.id, imageIds: dto.imageIds } }
  }

  async removeImage(user: AuthenticatedUser, propertyId: string, imageId: string) {
    const property = await this.getOwnedProperty(user, propertyId)
    const image = await this.prisma.propertyImage.findFirst({
      where: { id: imageId, propertyId: property.id },
    })

    if (!image) throw new NotFoundException('Image not found')

    await this.destroyCloudinaryAsset(image.storageKey)
    await this.prisma.propertyImage.delete({ where: { id: image.id } })

    return { data: { id: image.id, deleted: true } }
  }

  private async getOwnedProperty(user: AuthenticatedUser, propertyId: string) {
    if (!isUuid(propertyId)) throw new BadRequestException('Property id must be a UUID')

    const property = await this.prisma.property.findUnique({ where: { id: propertyId } })
    if (!property) throw new NotFoundException('Property not found')
    if (user.role !== 'ADMIN' && property.ownerId !== user.id) {
      throw new ForbiddenException('You do not own this property')
    }
    if (property.status === 'ARCHIVED') {
      throw new ConflictException('Archived properties cannot be modified')
    }
    return property
  }

  private assertOwner(user: AuthenticatedUser) {
    if (!['OWNER', 'ADMIN'].includes(user.role)) {
      throw new ForbiddenException('Owner role is required')
    }
  }

  private assertCloudinaryConfigured() {
    if (!this.cloudName || !this.apiKey || !this.apiSecret) {
      throw new ServiceUnavailableException('Cloudinary storage is not configured')
    }
  }

  private sign(parameters: Record<string, string | number>) {
    this.assertCloudinaryConfigured()
    const payload = Object.entries(parameters)
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([key, value]) => `${key}=${value}`)
      .join('&')

    return createHash('sha1').update(`${payload}${this.apiSecret}`).digest('hex')
  }

  private async destroyCloudinaryAsset(storageKey: string | null) {
    if (!storageKey || !this.cloudName || !this.apiKey || !this.apiSecret) return

    const timestamp = Math.floor(Date.now() / 1000)
    const signature = this.sign({ public_id: storageKey, timestamp })
    const body = new URLSearchParams({
      public_id: storageKey,
      timestamp: String(timestamp),
      api_key: this.apiKey,
      signature,
    })

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${this.cloudName}/image/destroy`,
      { method: 'POST', body },
    )

    if (!response.ok) {
      throw new ServiceUnavailableException('Cloudinary image deletion failed')
    }
  }
}
