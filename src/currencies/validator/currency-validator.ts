import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { CURRENCIES } from '../constants/currencies.constants';

@ValidatorConstraint({ name: 'IsCurrency', async: false })
@Injectable()
export class IsCurrency implements ValidatorConstraintInterface {
  validate(value: string) {
    return CURRENCIES.some(({ code }) => code === value);
  }

  // TODO Возвращаем код для перевода на фронте
  defaultMessage() {
    return 'Invalid currency code';
  }
}
