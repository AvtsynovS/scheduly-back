import { CATEGORY_ERRORS } from './constants.error';
import { DomainException, ErrorDefinition } from '@common/errors';

@ErrorDefinition({ status: 404 })
export class CategoryNotFoundError extends DomainException {
  readonly code = CATEGORY_ERRORS.NOT_FOUND;

  constructor() {
    super(`Category not found`);
  }
}
