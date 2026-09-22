import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { CurrentUser } from '../auth/current-user.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { AuthenticatedUser } from '../auth/auth.types'
import { AvailabilityDto } from './dto/availability.dto'
import { CreatePropertyDto } from './dto/create-property.dto'
import { PropertyQueryDto } from './dto/property-query.dto'
import { UpdatePropertyDto } from './dto/update-property.dto'
import { PropertiesService } from './properties.service'

@Controller()
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get('properties')
  findPublic(@Query() query: PropertyQueryDto) {
    return this.propertiesService.findPublic(query)
  }

  @Get('properties/:idOrSlug')
  findPublicOne(@Param('idOrSlug') idOrSlug: string) {
    return this.propertiesService.findPublicOne(idOrSlug)
  }
}

@Controller('owner/properties')
@UseGuards(AuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class OwnerPropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  findMine(@CurrentUser() user: AuthenticatedUser, @Query() query: PropertyQueryDto) {
    return this.propertiesService.findOwnerProperties(user, query)
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreatePropertyDto) {
    return this.propertiesService.create(user, dto)
  }

  @Patch(':id')
  update(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') propertyId: string,
    @Body() dto: UpdatePropertyDto,
  ) {
    return this.propertiesService.update(user, propertyId, dto)
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthenticatedUser, @Param('id') propertyId: string) {
    return this.propertiesService.remove(user, propertyId)
  }

  @Patch(':id/availability')
  setAvailability(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') propertyId: string,
    @Body() dto: AvailabilityDto,
  ) {
    return this.propertiesService.setAvailability(user, propertyId, dto.isAvailable)
  }
}
