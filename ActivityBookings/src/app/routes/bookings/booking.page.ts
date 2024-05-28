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
  imports: [ActivityDetailsComponent, NewBookingComponent],
  providers: [BookingStore],
  template: `
    <lab-activity-details [activity]="activity()" />
    <ul>
      @for(booking of bookings(); track booking){
      <li>{{ booking }}</li>
      } @empty {
      <li>No bookings yet</li>
      }
    </ul>
    <section>
      <div>
        <span>Booked places:</span> <mark>{{ bookedPlaces() }}</mark>
      </div>
      <div>
        <span>Remaining places:</span> <mark>{{ remainingPlaces() }}</mark>
      </div>
    </section>
    @if(isBookable()){
    <lab-new-booking
      [activity]="activity()"
      [bookedPlaces]="bookedPlaces()"
      (book)="onBookNow($event)"></lab-new-booking>
    }
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

  remainingPlaces: Signal<number> = computed(
    () => this.activity().maxParticipants - this.bookedPlaces(),
  );

  isBookable: Signal<boolean> = computed(
    () => this.activity().status === 'published' || this.activity().status === 'confirmed',
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
