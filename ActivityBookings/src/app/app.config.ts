import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * The configuration of the application. It provides:
 * - The `router` with the routes and component input binding.
 * - Client hydration for server-side rendering.
 * - HTTP client with fetch and an auth interceptor.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withInterceptors([])),
  ],
};
