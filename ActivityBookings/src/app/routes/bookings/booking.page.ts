import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    <p>Booked places: {{ bookedPlaces() }}</p>
    <button (click)="onBookNow()">Book now</button>
  `,
})
export default class BookingPage {
  // * Injected services division

  #route = inject(ActivatedRoute);
  #service = inject(BookingService);
  #bookingStore: BookingStore = inject(BookingStore);

  // * Signals division

  activity: Signal<ActivityWithBookings> = this.#bookingStore.activity;
  bookedPlaces: Signal<number> = this.#bookingStore.bookedPlaces;

  constructor() {
    const slug: string = this.#route.snapshot.paramMap.get('slug') || '';
    this.#service.dispatchGetActivityWithBookingsBySlug(slug);
  }

  // * Event handlers division

  onBookNow() {
    this.#service.dispatchPostBooking(this.activity().id, 1);
  }
}
