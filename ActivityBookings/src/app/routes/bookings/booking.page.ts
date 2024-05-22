import { JsonPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Signal,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityWithBookings, BookingService } from './booking.service';

@Component({
  standalone: true,
  imports: [JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre>{{ activity() | json }}</pre>
    <p>Booked places: {{ bookedPlaces() }}</p>
    <button (click)="onBookNow()">Book now</button>
  `,
})
export default class BookingPage {
  // * Injected services division

  /** The activated route with current activity */
  #route = inject(ActivatedRoute);

  #service = inject(BookingService);

  /** The pre resolved activity based on the slug  */
  #resolvedActivity: ActivityWithBookings = this.#route.snapshot.data['activity'];
  /** The Activity signal */
  activity: WritableSignal<ActivityWithBookings> = signal(this.#resolvedActivity);

  bookedPlaces: Signal<number> = computed(() => {
    const activity = this.activity();
    const bookings = activity.bookings;
    return bookings.reduce((acc, booking) => acc + booking.participants, 0);
  });

  /**
   * Book now button click handler
   */
  onBookNow() {
    this.#service.postBooking$(this.#resolvedActivity.id, 1).subscribe((booking) => {
      console.log('Booking created, need to reload', booking);
      this.#service
        .getActivityWithBookingsBySlug(this.#resolvedActivity.slug)
        .subscribe((activity) => {
          this.activity.set(activity);
        });
    });
  }
}
