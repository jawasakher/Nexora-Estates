import { Type } from 'class-transformer'
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator'
import { ListingType } from '@prisma/client'

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(180)
  title!: string

  @IsString()
  @IsNotEmpty()
  description!: string

  @IsString()
  @IsNotEmpty()
  propertyType!: string

  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceSale?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  priceRent?: number

  @IsOptional()
  @IsString()
  @MaxLength(3)
  currency?: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  area?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bedrooms?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  bathrooms?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  garages?: number

  @IsString()
  @IsNotEmpty()
  city!: string

  @IsString()
  @IsNotEmpty()
  country!: string

  @IsString()
  @IsNotEmpty()
  address!: string

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 7 })
  latitude?: number

  @IsOptional()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 7 })
  longitude?: number
}
