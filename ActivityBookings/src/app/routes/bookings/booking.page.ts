import { ChangeDetectionStrategy, Component, Signal, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { map } from 'rxjs';
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
  // * Injected services division

  #route: ActivatedRoute = inject(ActivatedRoute);
  #store: BookingStore = inject(BookingStore);

  // * Signals division

  activity: Signal<Activity> = this.#store.activity;

  bookings: Signal<string[]> = computed(() =>
    this.#store
      .bookings()
      .map((booking) => `${booking.participants} participant/s booked on ${booking.date}`),
  );
  bookedPlaces: Signal<number> = this.#store.bookedPlaces;
  remainingPlaces: Signal<number> = computed(
    () => this.activity().maxParticipants - this.bookedPlaces(),
  );
  isBookable: Signal<boolean> = computed(
    () => this.activity().status === 'published' || this.activity().status === 'confirmed',
  );

  constructor() {
    this.#route.paramMap // ! should be unsubscribed
      .pipe(map((params) => params.get('slug') || ''))
      .subscribe((slug) => this.#store.dispatchGetActivityWithBookingsBySlug(slug));
  }

  // * Event handlers division

  onBookNow(participants: number): void {
    this.#store.dispatchPostBooking(this.activity().id, participants);
  }
}
