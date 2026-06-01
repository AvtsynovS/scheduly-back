import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { IsCurrency } from './validator/currency-validator';

@Module({
  controllers: [CurrenciesController],
  providers: [CurrenciesService, IsCurrency],
})
export class CurrenciesModule {}
