import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { routes } from './app.routes';
import { provideErrorHandler } from './core/error.service';
import { metricsInterceptor } from './core/metrics.interceptor';

/**
 * The configuration of the application. It provides:
 * - The `router` with the routes and component input binding.
 * - Client hydration for server-side rendering.
 * - HTTP client with fetch and an auth interceptor.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideErrorHandler(),
    provideRouter(routes, withComponentInputBinding()),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([metricsInterceptor])),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
};
