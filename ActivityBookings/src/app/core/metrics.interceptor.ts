import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoggerService } from '@services/logger.service';
import { filter, tap } from 'rxjs';

/**
 * Interceptor to log metrics for HTTP requests.
 * @description Logs the time taken to complete the request.
 * @param req
 * @param next
 * @returns The observable of the HTTP event
 */
export const metricsInterceptor: HttpInterceptorFn = (req, next) => {
  // If is an OPTIONS request, skip the interceptor
  if (req.method === 'OPTIONS') {
    return next(req);
  }

  // * Injected services division

  const logger: LoggerService = inject(LoggerService);

  const start = Date.now();
  return next(req).pipe(
    filter((event) => event.type === HttpEventType.Response),
    tap(() => {
      const elapsed = Date.now() - start;
      logger.log(`${req.method} request for ${req.url} took ${elapsed} ms.`, 'DEBUG');
    }),
  );
};
