import { PRISMA_ERRORS } from '../../database/prisma.error.code';
import { InfrastructureException } from '../infrastructure.exception';

export class DatabaseConstraintError extends InfrastructureException {
  readonly code = PRISMA_ERRORS.DB_CONSTRAINT;

  constructor() {
    super('Database constraint violated');
  }
}
