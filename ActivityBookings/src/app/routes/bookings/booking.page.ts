import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivityWithBookings } from './activity-with-bookings.type';
import { BookingService } from './booking.service';
import { BookingStore } from './booking.store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  providers: [BookingService, BookingStore],
  template: `
    <pre>{{ activity() | json }}</pre>
    <pre>{{ bookings() | json }}</pre>
    <p>Booked places: {{ bookedPlaces() }}</p>
    <button (click)="onBookNow()">Book now</button>
  `,
})
export default class BookingPage {
  // * Injected services division

  #route = inject(ActivatedRoute);
  #service = inject(BookingService);
  #store: BookingStore = inject(BookingStore);

  // * Signals division

  activityWithBookings: Signal<ActivityWithBookings> = this.#store.activityWithBookings;
  activity: Signal<Activity> = this.#store.activity;
  bookings: Signal<Booking[]> = this.#store.bookings;
  bookedPlaces: Signal<number> = this.#store.bookedPlaces;

  constructor() {
    const slug: string = this.#route.snapshot.paramMap.get('slug') || '';
    this.#service.dispatchGetActivityWithBookingsBySlug(slug);
  }

  // * Event handlers division

  onBookNow() {
    this.#service.dispatchPostBooking(this.activityWithBookings().id, 1);
  }
}
