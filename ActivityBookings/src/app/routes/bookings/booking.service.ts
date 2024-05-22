import { Injectable, inject } from '@angular/core';
import { getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ActivityWithBookings } from './activity-with-bookings.type';
import { BookingStore } from './booking.store';

@Injectable()
export class BookingService {
  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  #bookingStore: BookingStore = inject(BookingStore);

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#getActivityWithBookingsBySlug$(slug).subscribe((activity) => {
      console.log('Activity with bookings loaded', activity);
      this.#bookingStore.setActivity(activity);
    });
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    this.#postBooking$(activityId, participants).subscribe((booking) => {
      console.log('Booking created, need to reload', booking);
      const activity = this.#bookingStore.activity();
      this.#bookingStore.setNewBooking(booking);
      const newStatus: ActivityStatus = getNextActivityStatus(
        activity,
        this.#bookingStore.bookedPlaces(), // ! not updated
      );
      if (newStatus !== activity.status) {
        this.dispatchPutActivity(activity);
      }
      // this.dispatchGetActivityWithBookingsBySlug(activity.slug);
    });
  }

  dispatchPutActivity(activity: Activity): void {
    // ! beware of sending the bookings array, still is an ActivityWithBookings
    this.#activitiesRepository
      .putActivity$(activity)
      .subscribe(() => this.#bookingStore.changeActivityStatus(activity.status));
  }

  /**
   * Get an activity with its bookings by its slug
   * @param slug The slug of the activity to get
   * @returns An observable with the activity and its bookings
   */
  #getActivityWithBookingsBySlug$(slug: string): Observable<ActivityWithBookings> {
    return this.#activitiesRepository.getBySlug$(slug).pipe(
      switchMap((activity) =>
        this.#bookingsRepository.getByActivityId$(activity.id).pipe(
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
  #postBooking$(activityId: string, participants: number): Observable<Booking> {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    return this.#bookingsRepository.postBooking$(booking);
  }
}
