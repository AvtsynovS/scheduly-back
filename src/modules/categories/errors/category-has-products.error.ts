import { DomainException, ErrorDefinition } from '@common/errors';
import { CATEGORY_ERRORS } from './constants.error';

@ErrorDefinition({ status: 409 })
export class CategoryHasProductsError extends DomainException {
  readonly code = CATEGORY_ERRORS.HAS_PRODUCTS;

  constructor() {
    super('Category contains products and cannot be removed');
  }
}
