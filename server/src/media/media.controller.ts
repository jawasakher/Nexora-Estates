import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AuthenticatedUser } from '../auth/auth.types'
import { CurrentUser } from '../auth/current-user.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { AttachImageDto } from './dto/attach-image.dto'
import { ReorderImagesDto } from './dto/reorder-images.dto'
import { MediaService } from './media.service'

@Controller('owner')
@UseGuards(AuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('media/signature')
  createUploadSignature(@CurrentUser() user: AuthenticatedUser) {
    return this.mediaService.createUploadSignature(user)
  }

  @Post('properties/:propertyId/images')
  attachImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('propertyId') propertyId: string,
    @Body() dto: AttachImageDto,
  ) {
    return this.mediaService.attachImage(user, propertyId, dto)
  }

  @Patch('properties/:propertyId/images/reorder')
  reorderImages(
    @CurrentUser() user: AuthenticatedUser,
    @Param('propertyId') propertyId: string,
    @Body() dto: ReorderImagesDto,
  ) {
    return this.mediaService.reorderImages(user, propertyId, dto)
  }

  @Delete('properties/:propertyId/images/:imageId')
  removeImage(
    @CurrentUser() user: AuthenticatedUser,
    @Param('propertyId') propertyId: string,
    @Param('imageId') imageId: string,
  ) {
    return this.mediaService.removeImage(user, propertyId, imageId)
  }
}
