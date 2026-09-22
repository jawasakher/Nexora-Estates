import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator'

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  propertyId!: string

  @IsDateString()
  checkInDate!: string

  @IsDateString()
  checkOutDate!: string

  @IsInt()
  @Min(1)
  guests!: number

  @IsOptional()
  @IsString()
  customerNote?: string
}
