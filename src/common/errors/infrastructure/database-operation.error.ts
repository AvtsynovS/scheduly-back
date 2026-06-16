import { PRISMA_ERRORS } from '../../database/prisma.error.code';
import { InfrastructureException } from '../infrastructure.exception';

export class DatabaseOperationError extends InfrastructureException {
  readonly code = PRISMA_ERRORS.DB_OPERATION_ERROR;

  constructor(message = 'Database operation failed') {
    super(message);
  }
}
