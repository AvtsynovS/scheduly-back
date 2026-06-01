import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { validationErrors } from '../utils/validation-errors';

export const validationExceptionFactory = (errors: ValidationError[]) => {
  return new BadRequestException({
    message: 'VALIDATION_ERROR',
    errors: validationErrors(errors),
  });
};
