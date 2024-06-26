import { Injectable, Signal, computed, effect, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { BookingService } from './booking.service';

/**
 * Store to manage the bookings in the app.
 * @description NOT Provided in the root injector.
 * @requires BookingService to manage the state
 */
@Injectable()
export class BookingStore {
  // ! Interop Signal-Observable world

  // * Injected services division

  #service: BookingService = inject(BookingService);

  // * Interop Signals division
  // populated by service observables
  // fully reactive, no need to unsubscribe

  error: Signal<string> = toSignal(this.#service.error$, { initialValue: '' });

  activity: Signal<Activity> = toSignal(this.#service.getActivity$(), { initialValue: NULL_ACTIVITY });

  bookings: Signal<Booking[]> = toSignal(this.#service.getBookings$(), { initialValue: [] });

  // * Computed signals division

  #activityId: Signal<string> = computed(() => this.activity().id);
  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.bookings()));
  nextActivityStatus: Signal<ActivityStatus> = computed(() =>
    getNextActivityStatus(this.activity(), this.bookedPlaces()),
  );

  // * Effects division

  /**
   * Effect to run when activityId changes.
   * Dispatches command to get bookings by activityId.
   */
  readonly #onActivityIdUpdatedEffect = effect(() => {
    const activityId = this.#activityId();
    if (activityId !== '') {
      untracked(() => this.#dispatchGetBookingsByActivityId(activityId));
    }
  });

  /**
   * Effect to run when activity or activityStatus changes.
   * Dispatches command to update activity status if needed..
   */
  readonly #onActivityStatusUpdatedEffect = effect(() => {
    const activity = this.activity();
    const nextStatus = this.nextActivityStatus();
    if (activity.status !== nextStatus) {
      untracked(() => this.#dispatchPutNewActivityStatus(activity, nextStatus));
    }
  });

  // * Dispatchers division
  // Updates subjects to trigger service commands
  // Can be renamed without dispatch prefix
  // Can be generalized in one single dispatcher that accepts a command type and a payload

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#service.slug$.next(slug);
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#service.newBooking$.next(booking);
  }

  #dispatchGetBookingsByActivityId(activityId: string): void {
    this.#service.activityId$.next(activityId);
  }

  #dispatchPutNewActivityStatus(activity: Activity, status: ActivityStatus): void {
    const updatedActivity = { ...activity, status };
    this.#service.updatedActivity$.next(updatedActivity);
  }
}
