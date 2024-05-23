import { Injectable, effect, inject } from '@angular/core';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { Observable, catchError, map, of, switchMap } from 'rxjs';
import { ActivityWithBookings } from './activity-with-bookings.type';
import { BookingStore } from './booking.store';

@Injectable()
export class BookingService {
  // * Injected services division

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  #bookingStore: BookingStore = inject(BookingStore);

  #onActivityStatusChange = effect(() => {
    const status = this.#bookingStore.activityStatus();
    console.log('Activity status changed', status);
    this.#dispatchPutActivity();
  });

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#getActivityWithBookingsBySlug$(slug).subscribe((activityWithBookings) => {
      console.log('Activity with bookings loaded', activityWithBookings);
      this.#bookingStore.setActivity(activityWithBookings);
    });
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    this.#postBooking$(activityId, participants).subscribe((booking) => {
      console.log('Booking created', booking);
      this.#bookingStore.setNewBooking(booking);
      // const activity = this.#bookingStore.activity();
      // const newStatus: ActivityStatus = getNextActivityStatus(
      //   activity,
      //   this.#bookingStore.bookedPlaces(), // ! not updated
      // );
      // if (newStatus !== activity.status) {
      //   this.#dispatchPutActivity(activity);
      // }
      // this.dispatchGetActivityWithBookingsBySlug(activity.slug);
    });
  }

  #dispatchPutActivity(): void {
    const activity = this.#bookingStore.activity();
    if (activity.id === '') return;
    this.#activitiesRepository
      .putActivity$(activity)
      .subscribe
      //() => this.#bookingStore.changeActivityStatus(activity.status)
      ();
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
