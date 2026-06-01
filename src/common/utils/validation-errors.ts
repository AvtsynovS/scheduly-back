import { ValidationError } from 'class-validator';

export const validationErrors = (errors: ValidationError[]) => {
  const result = {};

  const getErrors = (errs: ValidationError[], parentPath = '') => {
    for (const error of errs) {
      const path = parentPath
        ? `${parentPath}.${error.property}`
        : error.property;

      if (error.constraints) {
        result[path] = Object.values(error.constraints);
      }

      if (error.children?.length) {
        getErrors(error.children, path);
      }
    }
  };

  getErrors(errors);
  return result;
};
