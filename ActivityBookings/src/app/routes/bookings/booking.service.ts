import { Injectable, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking, NULL_BOOKING } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';

@Injectable()
export class BookingService {
  // ! Observable world

  // * Injected services division

  #route = inject(ActivatedRoute);
  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  // * Subject triggers division
  #slug$ = this.#route.paramMap.pipe(map((params) => params.get('slug') || ''));
  activityId$ = new BehaviorSubject<string>('');
  updatedActivity$ = new BehaviorSubject<Activity>(NULL_ACTIVITY);
  newBooking$ = new BehaviorSubject<Booking>(NULL_BOOKING);

  // * Observable sources division

  getActivity$(): Observable<Activity> {
    return combineLatest<[Activity, Activity]>([
      this.#getActivityBySlug$(),
      this.#putActivity$(),
    ]).pipe(map(this.#toCombinedActivity));
  }

  getBookings$(): Observable<Booking[]> {
    return combineLatest<[Booking[], Booking]>([
      this.#getBookingsByActivityId$(),
      this.#postBooking$(),
    ]).pipe(map(this.#toCombinedBookings));
  }

  // * Private methods division

  #getActivityBySlug$(): Observable<Activity> {
    return this.#slug$.pipe(switchMap((slug) => this.#activitiesRepository.getBySlug$(slug)));
  }

  #putActivity$(): Observable<Activity> {
    return this.updatedActivity$.pipe(
      switchMap((activity) => this.#activitiesRepository.putActivity$(activity)),
    );
  }

  #getBookingsByActivityId$(): Observable<Booking[]> {
    return this.activityId$.pipe(
      switchMap((activityId) => this.#bookingsRepository.getByActivityId$(activityId)),
    );
  }

  #postBooking$(): Observable<Booking> {
    return this.newBooking$.pipe(
      switchMap((booking) => this.#bookingsRepository.postBooking$(booking)),
    );
  }

  // * Mappers division

  #toCombinedActivity = (combinedActivities: Activity[]): Activity => {
    const initialActivity = combinedActivities[0];
    const updatedActivity = combinedActivities[1];
    if (updatedActivity.id === NULL_ACTIVITY.id) return initialActivity;
    return updatedActivity;
  };

  #toCombinedBookings = (combinedBookings: [Booking[], Booking]): Booking[] => {
    const initialBookings = combinedBookings[0];
    const newBooking = combinedBookings[1];
    if (newBooking.id === NULL_BOOKING.id) return initialBookings;
    if (initialBookings.some((booking) => booking.id === newBooking.id)) return initialBookings;
    return [...initialBookings, newBooking];
  };
}
