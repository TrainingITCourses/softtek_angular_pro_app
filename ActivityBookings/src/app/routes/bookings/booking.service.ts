import { Injectable, inject } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  // * Injected services division

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  // * Public methods division

  getActivityBySlug$(slug: string): Observable<Activity> {
    return this.#activitiesRepository.getBySlug$(slug);
  }

  getBookingsByActivityId$(activityId: string): Observable<Booking[]> {
    return this.#bookingsRepository.getByActivityId$(activityId);
  }

  postBooking$(newBooking: Booking): Observable<Booking> {
    return this.#bookingsRepository.postBooking$(newBooking);
  }

  putActivity$(activity: Activity): Observable<Activity> {
    return this.#activitiesRepository.putActivity$(activity);
  }
}
