import { Injectable, inject } from '@angular/core';
import { Activity, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking, NULL_BOOKING } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { BehaviorSubject, Observable, catchError, combineLatest, map, merge, of, switchMap, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BookingService {
  // ! Observable world

  // * Injected services division

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  // * Subject triggers division
  // public API to trigger observables
  // could be refactored to private members with public methods

  slug$ = new BehaviorSubject<string>('');
  activityId$ = new BehaviorSubject<string>('');
  updatedActivity$ = new BehaviorSubject<Activity>(NULL_ACTIVITY);
  newBooking$ = new BehaviorSubject<Booking>(NULL_BOOKING);
  error$ = new BehaviorSubject<string>('');

  // * Observable sources division
  // pipes source triggers to repository observables

  /**
   * Merges the result when slug changes or when activity is updated
   * @returns Observable of Activity
   */
  getActivity$(): Observable<Activity> {
    return merge(this.#getActivityBySlug$(), this.#putActivity$());
  }

  /**
   * Updates the bookings when activityId changes or when a new booking is posted
   * @returns Observable of Booking[]
   */
  getBookings$(): Observable<Booking[]> {
    const getBookingsTriggers: [Observable<Booking[]>, Observable<Booking>] = [
      this.#getBookingsByActivityId$(),
      this.#postBooking$(),
    ];
    return combineLatest<[Booking[], Booking]>(getBookingsTriggers).pipe(map(this.#toCombinedBookings));
  }

  // * Private methods division

  /**
   * Runs when slug changes
   * - resets activityId, updatedActivity and newBooking
   * - gets activity by slug
   * @returns Observable of Activity for the slug
   */
  #getActivityBySlug$(): Observable<Activity> {
    return this.slug$.pipe(
      tap((_) => this.activityId$.next('')),
      tap((_) => this.updatedActivity$.next(NULL_ACTIVITY)),
      tap((_) => this.newBooking$.next(NULL_BOOKING)),
      switchMap((slug) =>
        this.#activitiesRepository.getBySlug$(slug).pipe(
          catchError((error) => {
            this.error$.next(error.message);
            return of(NULL_ACTIVITY);
          }),
        ),
      ),
    );
  }

  /**
   * Runs when updatedActivity changes
   * - updates the activity
   * @returns Observable of Activity updated
   */
  #putActivity$(): Observable<Activity> {
    return this.updatedActivity$.pipe(switchMap((activity) => this.#activitiesRepository.putActivity$(activity)));
  }

  /**
   * Runs when activityId changes
   * - gets bookings by activityId
   * @returns Observable of Booking[] for the activityId
   */
  #getBookingsByActivityId$(): Observable<Booking[]> {
    return this.activityId$.pipe(switchMap((activityId) => this.#bookingsRepository.getByActivityId$(activityId)));
  }

  /**
   * Runs when newBooking changes
   * - posts the new booking
   * @returns Observable of Booking posted
   */
  #postBooking$(): Observable<Booking> {
    return this.newBooking$.pipe(switchMap((booking) => this.#bookingsRepository.postBooking$(booking)));
  }

  // * Mappers division

  /**
   * Combines the initial bookings with the new booking
   * @param combinedBookings Bookings obtained from getBookingsByActivityId$ and newBooking$
   * @returns The combined bookings based on the new booking
   */
  #toCombinedBookings = (combinedBookings: [Booking[], Booking]): Booking[] => {
    const initialBookings = combinedBookings[0];
    const newBooking = combinedBookings[1];
    const noNewBooking = newBooking.id === NULL_BOOKING.id;
    if (noNewBooking) return initialBookings;
    // add new booking to the list
    return [...initialBookings, newBooking];
  };
}
