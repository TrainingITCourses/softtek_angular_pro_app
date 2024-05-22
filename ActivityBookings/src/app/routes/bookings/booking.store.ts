import { Injectable, Signal, WritableSignal, computed, signal } from '@angular/core';
import { ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking, NULL_BOOKING } from '@domain/booking.type';
import { ActivityWithBookings } from './activity-with-bookings.type';

@Injectable()
export class BookingStore {
  #activity: WritableSignal<ActivityWithBookings> = signal({ ...NULL_ACTIVITY, bookings: [] });
  #newBooking: WritableSignal<Booking> = signal(NULL_BOOKING);

  activity: Signal<ActivityWithBookings> = this.#activity.asReadonly();
  newBooking: Signal<Booking> = this.#newBooking.asReadonly();

  bookedPlaces: Signal<number> = computed(() => {
    const activity = this.activity();
    const bookings = activity.bookings;
    return bookings.reduce((acc, booking) => acc + booking.participants, 0);
  });

  setActivity(activity: ActivityWithBookings): void {
    this.#activity.set(activity);
  }

  setNewBooking(booking: Booking): void {
    this.#newBooking.set(booking);
    this.#activity.update((activity) => {
      activity.bookings.push(booking);
      return { ...activity };
    });
  }

  changeActivityStatus(newStatus: ActivityStatus): void {
    this.#activity.update((activity) => {
      activity.status = newStatus;
      return { ...activity };
    });
  }
}
