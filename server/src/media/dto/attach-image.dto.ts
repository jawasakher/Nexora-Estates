import { Type } from 'class-transformer'
import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, IsUrl, Min } from 'class-validator'

export class AttachImageDto {
  @IsUrl({ require_tld: false })
  @IsNotEmpty()
  url!: string

  @IsString()
  @IsNotEmpty()
  storageKey!: string

  @IsOptional()
  @IsString()
  altText?: string

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sortOrder?: number

  @IsOptional()
  @IsBoolean()
  isCover?: boolean
}
