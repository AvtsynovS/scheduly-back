import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContextService } from './request-context.service';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly contextService: RequestContextService) {}

  use(req: Request, res: Response, next: () => void) {
    const requestId =
      typeof req.headers['x-request-id'] === 'string'
        ? req.headers['x-request-id']
        : randomUUID();

    this.contextService.run(
      {
        requestId,
      },
      next,
    );
  }
}
