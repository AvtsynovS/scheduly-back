import { DomainException, ErrorDefinition } from '@common/errors';
import { CATEGORY_ERRORS } from './constants.error';

@ErrorDefinition({ status: 409 })
export class CategoryAlreadyExistsError extends DomainException {
  readonly code = CATEGORY_ERRORS.ALREADY_EXISTS;

  constructor(name?: string) {
    super(
      name ? `Category "${name}" already exists` : 'Category already exists',
    );
  }
}
