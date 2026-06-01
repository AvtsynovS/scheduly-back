import { Injectable } from '@nestjs/common';
import { CURRENCIES } from './constants/currencies.constants';

@Injectable()
export class CurrenciesService {
  findAll() {
    return CURRENCIES;
  }
}
