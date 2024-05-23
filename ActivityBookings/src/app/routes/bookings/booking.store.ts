import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivityWithBookings } from './activity-with-bookings.type';

@Injectable()
export class BookingStore {
  #activityWithBookings: WritableSignal<ActivityWithBookings> = signal({
    ...NULL_ACTIVITY,
    bookings: [],
  });
  //activityStatus: WritableSignal<ActivityStatus> = signal(NULL_ACTIVITY.status);

  // * selectors division

  activityWithBookings: Signal<ActivityWithBookings> = this.#activityWithBookings.asReadonly();

  activity: Signal<Activity> = computed(() => {
    const activityWithBookings = this.#activityWithBookings();
    const { bookings, ...activity } = activityWithBookings;
    return activity;
  });

  bookings: Signal<Booking[]> = computed(() => this.#activityWithBookings().bookings);

  activityStatus: Signal<ActivityStatus> = computed(() => this.#activityWithBookings().status);

  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.bookings()));

  // * reducers division

  setActivity(activity: ActivityWithBookings): void {
    this.#activityWithBookings.set(activity);
  }

  setNewBooking(booking: Booking): void {
    this.#activityWithBookings.update((activityWithBookings) => {
      activityWithBookings.bookings = [...activityWithBookings.bookings, booking];
      const bookedPlaces = getBookedPlaces(activityWithBookings.bookings);
      const newStatus = getNextActivityStatus(activityWithBookings, bookedPlaces);
      if (newStatus.toLocaleLowerCase() !== activityWithBookings.status.toLocaleLowerCase()) {
        activityWithBookings.status = newStatus;
      }
      return { ...activityWithBookings };
    });
  }

  changeActivityStatus(newStatus: ActivityStatus): void {
    this.#activityWithBookings.update((activityWithBookings) => {
      activityWithBookings.status = newStatus;
      return { ...activityWithBookings };
    });
  }
}
