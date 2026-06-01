import { CURRENCIES } from '../constants/currencies.constants';

export type CurrencyCode = (typeof CURRENCIES)[number]['code'];
