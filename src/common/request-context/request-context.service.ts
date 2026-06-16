import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'node:async_hooks';
import { RequestContext } from './request-context.interface';

@Injectable()
export class RequestContextService {
  private readonly storage = new AsyncLocalStorage<RequestContext>();

  run(context: RequestContext, callback: () => void) {
    this.storage.run(context, callback);
  }

  getContext() {
    return this.storage.getStore();
  }

  getRequestId() {
    return this.storage.getStore()?.requestId;
  }
}
