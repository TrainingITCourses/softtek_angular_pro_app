import { HttpErrorResponse } from '@angular/common/http';
import { EnvironmentProviders, ErrorHandler, inject, makeEnvironmentProviders } from '@angular/core';
import { LogLevel, LoggerService } from '@services/logger.service';

/**
 * Service to handle errors and show notifications.
 * @description Must be provided as the ErrorHandler in the app config function.
 * @requires LoggerService to log the errors
 * @extends ErrorHandler
 */
class ErrorService extends ErrorHandler {
  // * Injected services division

  #loggerService: LoggerService = inject(LoggerService);

  /**
   * Custom error handler used to show errors as notifications
   * @param error The error to handle
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override handleError(error: any): void {
    let message = 'An error occurred';
    let level: LogLevel = 'ERROR';
    if (error instanceof HttpErrorResponse) {
      message = error.message;
    } else {
      message = error.toString();
    }
    this.#loggerService.log(message, level);

    // Allow the default Angular error handler to run
    // super.handleError(error);
  }
}

/**
 * Provide the error handler for the application using a custom ErrorService.
 * @description Preferred way to provide Inversion of Control.
 * @returns The providers configured for the error handler
 */
export function provideErrorHandler(): EnvironmentProviders {
  return makeEnvironmentProviders([{ provide: ErrorHandler, useClass: ErrorService }]);
}
