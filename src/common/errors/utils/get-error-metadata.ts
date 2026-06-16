import 'reflect-metadata';

import { ERROR_METADATA_KEY } from '../constants/error.constants';
import { ErrorMetadata } from '../error-metadata.interface';

export function getErrorMetadata(target: object): ErrorMetadata | undefined {
  return Reflect.getMetadata(ERROR_METADATA_KEY, target);
}
