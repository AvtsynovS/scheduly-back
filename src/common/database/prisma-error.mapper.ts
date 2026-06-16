import { Prisma } from '@prisma/client';
import { DatabaseConstraintError } from '../errors/infrastructure/database-constraint.error';
import { DatabaseUnavailableError } from '../errors/infrastructure/database-unavailable.error';
import { DatabaseOperationError } from '../errors/infrastructure/database-operation.error';

export class PrismaErrorMapper {
  static map(error: unknown): Error {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // SQL/Prisma logical errors
      switch (error.code) {
        case 'P2002':
          return new DatabaseConstraintError();

        case 'P2025':
          return new DatabaseOperationError();
      }

      // CONNECTION ERRORS
      if (error.code === 'ECONNREFUSED') {
        return new DatabaseUnavailableError();
      }

      return new DatabaseUnavailableError();
    }

    //  engine-level errors
    if (
      error instanceof Prisma.PrismaClientInitializationError ||
      error instanceof Prisma.PrismaClientRustPanicError
    ) {
      return new DatabaseUnavailableError();
    }

    // fallback
    return new DatabaseUnavailableError();
  }
}
