import { DomainException } from './domain.exception';

/**
 * Базовая ошибка инфраструктурного слоя.
 *
 * Используется для:
 * - БД (Prisma)
 * - внешних сервисов (HTTP, S3, Redis и т.д.)
 * - сетевых проблем
 *
 * НЕ содержит бизнес-логики (Category, Client и т.д.)
 */
export abstract class InfrastructureException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
