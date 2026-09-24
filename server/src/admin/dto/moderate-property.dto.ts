import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ModeratePropertyDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  reason?: string
}
