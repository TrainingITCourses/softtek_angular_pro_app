// import { inject } from '@angular/core';
// import { ResolveFn } from '@angular/router';
// import { ActivityWithBookings } from './activity-with-bookings.type';
// import { BookingService } from './booking.service';

// export const activityResolver: ResolveFn<ActivityWithBookings> = (route, state) => {
//   const slug: string = route.paramMap.get('slug') || '';
//   const service = inject(BookingService);
//   return service.getActivityWithBookingsBySlug$(slug);
// };
