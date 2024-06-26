import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  effect,
  inject,
  input,
  untracked,
} from '@angular/core';
import { Activity, ActivityStatus } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivityDetailsComponent } from './activity-details.component';
import { BookingStore } from './booking.store';
import BookingsListComponent from './bookings-list.component';
import { NewBookingComponent } from './new-booking.component';
import { PlacesComponent } from './places.component';

/**
 * Booking page component routed to /bookings/:slug
 * @requires BookingStore to manage state
 * @requires ActivityDetailsComponent to display activity details
 * @requires BookingsListComponent to display bookings
 * @requires PlacesComponent to display booked and remaining places
 * @requires NewBookingComponent to create a new booking
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActivityDetailsComponent, PlacesComponent, BookingsListComponent, NewBookingComponent],
  providers: [BookingStore],
  template: `
    <lab-activity-details [activity]="activity()" />
    <lab-bookings-list [bookings]="bookings()" />
    <lab-places [activity]="activity()" [bookedPlaces]="bookedPlaces()" />
    @defer (when isBookable()) {
      <lab-new-booking [activity]="activity()" [bookedPlaces]="bookedPlaces()" (book)="onBookNow($event)" />
    } @placeholder {
      <cite> 🕳️ No bookings available</cite>
    } @loading (minimum 1s) {
      <cite> ⌛ Waiting for component instructions</cite>
    }
  `,
})
export default class BookingPage {
  // ! Signal world

  // * Injected services division

  #store = inject(BookingStore);

  // * Signals division

  /** Input received from router param :slug */
  slug: InputSignal<string> = input<string>('');

  activity: Signal<Activity> = this.#store.activity;

  activityStatus: Signal<ActivityStatus> = this.#store.nextActivityStatus;

  bookings: Signal<Booking[]> = this.#store.bookings;

  bookedPlaces: Signal<number> = this.#store.bookedPlaces;

  isBookable: Signal<boolean> = computed(() => ['published', 'confirmed'].includes(this.activityStatus()));

  // * Effects division

  /**
   * Effect to run when slug changes.
   * Dispatches get activity with bookings by slug.
   */
  readonly #onSlugUpdatedEffect = effect(() => {
    const slug: string = this.slug();
    untracked(() => this.#store.dispatchGetActivityWithBookingsBySlug(slug));
  });

  // * Event handlers division

  onBookNow(participants: number) {
    this.#store.dispatchPostBooking(this.activity().id, participants);
  }
}
