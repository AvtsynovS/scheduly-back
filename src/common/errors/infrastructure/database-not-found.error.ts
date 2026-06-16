import { PRISMA_ERRORS } from '../../database/prisma.error.code';
import { InfrastructureException } from '../infrastructure.exception';

export class DatabaseNotFoundError extends InfrastructureException {
  readonly code = PRISMA_ERRORS.DB_NOT_FOUND;

  constructor() {
    super('Record not found in database');
  }
}
