import { ChangeDetectionStrategy, Component, InputSignal, Signal, computed, input } from '@angular/core';
import { Booking } from '@domain/booking.type';

/**
 * Presentation component for displaying a list of bookings.
 * @description Displays the number of participants and the date of the booking.
 */
@Component({
  selector: 'lab-bookings-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ul>
      @for (booking of bookingsString(); track booking) {
        <li>{{ booking }}</li>
      } @empty {
        <li>No bookings yet</li>
      }
    </ul>
  `,
})
export default class BookingsListComponent {
  // ! Signal world

  // * Signals division

  bookings: InputSignal<Booking[]> = input.required<Booking[]>();

  bookingsString: Signal<string[]> = computed(() =>
    this.bookings().map((booking) => `${booking.participants} booked on ${booking.date}`),
  );
}
