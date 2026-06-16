import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PRISMA_ERRORS } from './prisma.error.code';

export function mapPrismaError(error: PrismaClientKnownRequestError) {
  switch (error.code) {
    case 'P2007':
      return {
        status: 404,
        code: PRISMA_ERRORS.NOT_FOUND,
        message: 'Entity was not found in database',
      };
    case 'P2002': // unique constraint
      return {
        status: 409,
        code: PRISMA_ERRORS.UNIQUE_CONSTRAINT_VIOLATION,
        message: 'Duplicate value violates unique constraint',
      };

    default:
      return {
        status: 500,
        code: PRISMA_ERRORS.INTERNAL_ERROR,
        message: 'Unexpected database error',
      };
  }
}
