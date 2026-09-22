import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '../auth/auth.guard'
import { AuthenticatedUser } from '../auth/auth.types'
import { CurrentUser } from '../auth/current-user.decorator'
import { RolesGuard } from '../auth/roles.guard'
import { Roles } from '../auth/roles.decorator'
import { BookingQueryDto } from './dto/booking-query.dto'
import { CreateBookingDto } from './dto/create-booking.dto'
import { RejectBookingDto } from './dto/reject-booking.dto'
import { BookingsService } from './bookings.service'

@Controller('bookings')
@UseGuards(AuthGuard)
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findMine(@CurrentUser() user: AuthenticatedUser, @Query() query: BookingQueryDto) {
    return this.bookingsService.findMine(user, query)
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateBookingDto) {
    return this.bookingsService.create(user, dto)
  }

  @Get(':id')
  findOne(@CurrentUser() user: AuthenticatedUser, @Param('id') bookingId: string) {
    return this.bookingsService.findOne(user, bookingId)
  }

  @Patch(':id/cancel')
  cancel(@CurrentUser() user: AuthenticatedUser, @Param('id') bookingId: string) {
    return this.bookingsService.cancel(user, bookingId)
  }
}

@Controller('owner/bookings')
@UseGuards(AuthGuard, RolesGuard)
@Roles('OWNER', 'ADMIN')
export class OwnerBookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Get()
  findOwner(@CurrentUser() user: AuthenticatedUser, @Query() query: BookingQueryDto) {
    return this.bookingsService.findOwner(user, query)
  }

  @Post(':id/confirm')
  confirm(@CurrentUser() user: AuthenticatedUser, @Param('id') bookingId: string) {
    return this.bookingsService.confirm(user, bookingId)
  }

  @Post(':id/reject')
  reject(
    @CurrentUser() user: AuthenticatedUser,
    @Param('id') bookingId: string,
    @Body() dto: RejectBookingDto,
  ) {
    return this.bookingsService.reject(user, bookingId, dto.reason)
  }
}
