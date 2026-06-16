import { DomainException, ErrorDefinition } from '@common/errors';
import { CATEGORY_ERRORS } from './constants.error';

@ErrorDefinition({ status: 409 })
export class CategoryArchivedError extends DomainException {
  readonly code = CATEGORY_ERRORS.ARCHIVED;

  constructor() {
    super('Category is archived');
  }
}
