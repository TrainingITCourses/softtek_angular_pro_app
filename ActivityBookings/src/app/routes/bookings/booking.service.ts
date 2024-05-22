import { Injectable, inject } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

export type ActivityWithBookings = Activity & { bookings: Booking[] };

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  bookingsRepository: BookingsRepository = inject(BookingsRepository);

  /**
   * Get an activity with its bookings by its slug
   * @param slug The slug of the activity to get
   * @returns An observable with the activity and its bookings
   */
  getActivityWithBookingsBySlug(slug: string): Observable<ActivityWithBookings> {
    return this.activitiesRepository.getBySlug$(slug).pipe(
      switchMap((activity) =>
        this.bookingsRepository.getByActivityId$(activity.id).pipe(
          map((bookings) => ({ ...activity, bookings })),
          catchError(() => of({ ...activity, bookings: [] })),
        ),
      ),
    );
  }

  /**
   * Post a new booking for an activity
   * @param activityId The ID of the activity to book
   * @param participants The number of participants
   * @returns An observable with the booking
   */
  postBooking$(activityId: string, participants: number): Observable<Booking> {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    return this.bookingsRepository.postBooking$(booking);
  }
}
