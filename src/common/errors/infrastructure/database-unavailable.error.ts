import { PRISMA_ERRORS } from '../../database/prisma.error.code';
import { InfrastructureException } from '../infrastructure.exception';

export class DatabaseUnavailableError extends InfrastructureException {
  readonly code = PRISMA_ERRORS.DB_UNAVAILABLE;

  constructor() {
    super('Database is unavailable');
  }
}
