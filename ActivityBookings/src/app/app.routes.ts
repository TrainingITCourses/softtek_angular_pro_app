import { Routes } from '@angular/router';
import { activityResolver } from './routes/bookings/activity.resolver';

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
    resolve: { activity: activityResolver },
  },
];
