import { IsNotEmpty, IsString } from 'class-validator'

export class RejectBookingDto {
  @IsString()
  @IsNotEmpty()
  reason!: string
}
