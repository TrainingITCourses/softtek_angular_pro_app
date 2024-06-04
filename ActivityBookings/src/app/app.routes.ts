import { Routes } from '@angular/router';

/**
 * Routes configuration for the application.
 * - Contains the different routes with their components, guards, and resolvers.
 * - The routes are lazy loaded to improve the performance.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./routes/home/home.page'),
  },
  {
    path: 'bookings/:slug',
    loadComponent: () => import('./routes/bookings/booking.page'),
  },
  {
    path: 'about',
    loadComponent: () => import('./routes/about/about.page'),
  },
];
