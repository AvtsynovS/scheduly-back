import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { RequestContextService } from '../request-context/request-context.service';
import { ErrorResponseDto } from '../dto/responses/error-response.dto';
import { DomainException } from '../errors/domain.exception';
import { getErrorMetadata } from '../errors/utils/get-error-metadata';
import { ERRORS_CODE } from '../errors/constants/error.constants';
import { InfrastructureException } from '../errors/infrastructure.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly context: RequestContextService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const requestId = this.context.getRequestId();
    const timestamp = new Date().toISOString();

    response.setHeader('X-Request-Id', requestId ?? '');

    /**
     * 1. INFRASTRUCTURE ERRORS (DB, external services, etc.)
     */
    if (exception instanceof InfrastructureException) {
      const metadata = getErrorMetadata(exception.constructor);

      const body: ErrorResponseDto = {
        success: false,
        code: exception.code,
        status: metadata?.status ?? 500,
        message: exception.message,
        requestId,
        timestamp,
      };

      return response.status(body.status).json(body);
    }

    /**
     * 2. Domain errors
     */
    if (exception instanceof DomainException) {
      const metadata = getErrorMetadata(exception.constructor);

      const responseBody: ErrorResponseDto = {
        success: false,
        code: exception.code,
        status: metadata?.status ?? 500,
        message: exception.message,
        requestId,
        timestamp,
      };

      return response.status(metadata?.status ?? 500).json(responseBody);
    }

    /**
     * 3. Nest / HTTP errors
     */
    if (exception instanceof HttpException) {
      const res = exception.getResponse();
      const status = exception.getStatus();

      const responseBody: ErrorResponseDto = {
        success: false,
        code: ERRORS_CODE.HTTP_ERROR,
        status,
        message: exception.message,
        requestId,
        timestamp,
      };

      if (typeof res === 'object' && res !== null) {
        const body = res as Record<string, any>;

        responseBody.code = status === 400 ? 'VALIDATION_ERROR' : 'HTTP_ERROR';

        responseBody.message = Array.isArray(body.message)
          ? body.message.join(', ')
          : (body.message ?? exception.message);
      }

      return response.status(status).json(responseBody);
    }

    /**
     * 4. Fallback
     */
    return response.status(500).json({
      success: false,
      code: ERRORS_CODE.INTERNAL_ERROR,
      status: 500,
      message: 'Internal server error',
      requestId,
      timestamp,
    });
  }
}
