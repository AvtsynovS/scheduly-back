import 'reflect-metadata';

import { ERROR_METADATA_KEY } from './constants/error.constants';
import { ErrorMetadata } from './error-metadata.interface';

export function ErrorDefinition(metadata: ErrorMetadata): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata(ERROR_METADATA_KEY, metadata, target);
  };
}
