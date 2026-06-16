import { BadRequestException } from '@nestjs/common';

export function validationExceptionFactory(errors: any[]) {
  return new BadRequestException({
    code: 'VALIDATION_ERROR',
    fields: errors.map((error) => ({
      field: error.property,
      constraints: error.constraints,
    })),
  });
}
