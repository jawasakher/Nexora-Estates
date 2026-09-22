import { Type } from 'class-transformer'
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator'
import { ListingType } from '@prisma/client'

export class PropertyQueryDto {
  @IsOptional()
  @IsString()
  q?: string

  @IsOptional()
  @IsString()
  city?: string

  @IsOptional()
  @IsString()
  country?: string

  @IsOptional()
  @IsString()
  propertyType?: string

  @IsOptional()
  @IsEnum(ListingType)
  listingType?: ListingType

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  minPrice?: number

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  maxPrice?: number

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
}
