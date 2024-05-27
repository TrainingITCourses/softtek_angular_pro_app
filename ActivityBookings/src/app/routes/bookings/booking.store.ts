import { Injectable, Signal, computed, effect, inject, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { BookingService } from './booking.service';

@Injectable()
export class BookingStore {
  // ! Interop Signal-Observable world

  // * Injected services division

  #bookingService: BookingService = inject(BookingService);

  // * Signals division

  activity: Signal<Activity> = toSignal(this.#bookingService.getActivity$(), {
    initialValue: NULL_ACTIVITY,
  });

  bookings: Signal<Booking[]> = toSignal(this.#bookingService.getBookings$(), { initialValue: [] });

  // * Computed signals division

  #activityId: Signal<string> = computed(() => this.activity().id);
  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.bookings()));
  nextActivityStatus: Signal<ActivityStatus> = computed(() =>
    getNextActivityStatus(this.activity(), this.bookedPlaces()),
  );

  // * Effects division

  readonly #onActivityIdUpdatedEffect = effect(() => {
    const activityId = this.#activityId();
    if (activityId !== '') {
      untracked(() => this.#dispatchGetBookingsByActivityId(activityId));
    }
  });

  readonly #onActivityStatusUpdatedEffect = effect(() => {
    const activity = this.activity();
    const nextStatus = this.nextActivityStatus();
    if (activity.status !== nextStatus) {
      untracked(() => this.#dispatchPutNewActivityStatus(activity, nextStatus));
    }
  });

  // * Dispatchers division

  // ToDo: Could be generalized to a single dispatcher method receiving an action type and payload

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#bookingService.newBooking$.next(booking);
  }

  #dispatchGetBookingsByActivityId(activityId: string): void {
    this.#bookingService.activityId$.next(activityId);
  }

  #dispatchPutNewActivityStatus(activity: Activity, status: ActivityStatus): void {
    const updatedActivity = { ...activity, status };
    this.#bookingService.updatedActivity$.next(updatedActivity);
  }
}
