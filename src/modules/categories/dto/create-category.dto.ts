import { REGEX } from '@common/constants';
import { IsOptional, IsString, Matches } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  name!: string;
  @IsString()
  @Matches(REGEX.HEX_COLOR, {
    message: 'Color must be valid HEX (e.g. #FFFFFF)',
  })
  color!: string;
  @IsOptional()
  @IsString()
  description?: string;
}
