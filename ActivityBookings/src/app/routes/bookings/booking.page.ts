import { JsonPipe } from '@angular/common';
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
import { ActivityDetailsComponent } from './activity-details.component';
import { BookingStore } from './booking.store';
import { NewBookingComponent } from './new-booking.component';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe, ActivityDetailsComponent, NewBookingComponent],
  providers: [BookingStore],
  template: `
    <lab-activity-details [activity]="activity()" />
    <pre>{{ bookings() | json }}</pre>
    <p>Booked places: {{ bookedPlaces() }}</p>
    <p>Activity status: {{ activityStatus() }}</p>
    <lab-new-booking
      [activity]="activity()"
      [bookedPlaces]="bookedPlaces()"
      (book)="onBookNow($event)"></lab-new-booking>
  `,
})
export default class BookingPage {
  // ! Signal world

  // * Injected services division

  #store = inject(BookingStore);

  // * Signals division

  slug: InputSignal<string> = input<string>('');

  activity: Signal<Activity> = this.#store.activity;

  activityStatus: Signal<ActivityStatus> = this.#store.nextActivityStatus;

  bookedPlaces: Signal<number> = this.#store.bookedPlaces;

  bookings: Signal<string[]> = computed(() =>
    this.#store.bookings().map((booking) => `${booking.participants} booked on ${booking.date}`),
  );

  // * Effects division

  readonly #onSlugUpdatedEffect = effect(() => {
    const slug = this.slug();
    untracked(() => this.#store.dispatchGetActivityWithBookingsBySlug(slug));
  });

  // * Event handlers division

  onBookNow(participants: number) {
    this.#store.dispatchPostBooking(this.activity().id, participants);
  }
}
