import { Module } from '@nestjs/common'
import { AuthModule } from '../auth/auth.module'
import { BookingsController, OwnerBookingsController } from './bookings.controller'
import { BookingsService } from './bookings.service'

@Module({
  imports: [AuthModule],
  controllers: [BookingsController, OwnerBookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
