import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';

@Injectable()
export class BookingStore {
  #activity: WritableSignal<Activity> = signal<Activity>(NULL_ACTIVITY);
  #bookings: WritableSignal<Booking[]> = signal<Booking[]>([]);
  #activityStatusUpdated: WritableSignal<boolean> = signal<boolean>(false);

  // * selectors division

  activity: Signal<Activity> = this.#activity.asReadonly();

  bookings: Signal<Booking[]> = this.#bookings.asReadonly();

  activityStatusUpdated: Signal<Boolean> = this.#activityStatusUpdated.asReadonly();

  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.#bookings()));

  // * reducers division

  setActivity(activity: Activity): void {
    this.#activity.set(activity);
  }

  addNewBooking(booking: Booking): void {
    this.#bookings.update((bookings) => [...bookings, booking]);
    this.#checkActivityStatus();
  }

  #checkActivityStatus() {
    const bookedPlaces = getBookedPlaces(this.#bookings());
    const newStatus = getNextActivityStatus(this.#activity(), bookedPlaces);
    if (newStatus.toLocaleLowerCase() !== this.#activity().status.toLocaleLowerCase()) {
      this.#changeActivityStatus(newStatus);
    }
  }

  #changeActivityStatus(newStatus: ActivityStatus): void {
    this.#activity.update((activity) => ({ ...activity, status: newStatus }));
    this.#activityStatusUpdated.set(true);
  }
}
