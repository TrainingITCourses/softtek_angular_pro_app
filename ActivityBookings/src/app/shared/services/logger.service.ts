import { Injectable } from '@angular/core';
import { environment } from '@env/environment';

/**
 * The different levels of logging.
 */
export type LogLevel = 'DEBUG' | 'INFO' | 'ERROR';

/**
 * Service to log messages with different levels.
 * @description The service is provided in the root injector.
 */
@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  #minLogLevel: LogLevel = environment.production ? 'INFO' : 'DEBUG';

  /**
   * Logs a message with a specific level.
   * @param message The message to log.
   * @param level The level of the message.
   */
  log(message: string, level: LogLevel): void {
    switch (level) {
      case 'DEBUG':
        if (this.#minLogLevel === 'DEBUG') {
          console.log(' 💟 ' + message);
        }
        break;
      case 'INFO':
        if (this.#minLogLevel === 'DEBUG' || this.#minLogLevel === 'INFO') {
          console.log(' 🩵 ' + message);
        }
        break;
      case 'ERROR':
        console.log(' 💔 ' + message);
        break;
    }
  }
}
