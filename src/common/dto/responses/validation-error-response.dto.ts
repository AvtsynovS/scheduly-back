import { ErrorResponseDto } from './error-response.dto';

export class ValidationErrorFieldDto {
  field!: string;
  constraints!: Record<string, string>;
}

export class ValidationErrorResponseDto extends ErrorResponseDto {
  fields!: ValidationErrorFieldDto[];
}
