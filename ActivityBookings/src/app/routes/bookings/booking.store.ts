import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';

@Injectable()
export class BookingStore {
  #activity: WritableSignal<Activity> = signal<Activity>(NULL_ACTIVITY);
  #bookings: WritableSignal<Booking[]> = signal<Booking[]>([]);

  // * selectors division

  activity: Signal<Activity> = this.#activity.asReadonly();
  bookings: Signal<Booking[]> = this.#bookings.asReadonly();

  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.#bookings()));
  nextActivityStatus: Signal<ActivityStatus> = computed(() =>
    getNextActivityStatus(this.activity(), this.bookedPlaces()),
  );

  // * reducers division

  setActivity(activity: Activity): void {
    this.#activity.set(activity);
  }

  addNewBooking(booking: Booking): void {
    this.#bookings.update((bookings) => [...bookings, booking]);
  }

  changeActivityStatus(newStatus: ActivityStatus): void {
    this.#activity.update((activity) => ({ ...activity, status: newStatus }));
  }
}
