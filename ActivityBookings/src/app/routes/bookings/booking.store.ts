import {
  Injectable,
  Signal,
  WritableSignal,
  computed,
  effect,
  inject,
  signal,
  untracked,
} from '@angular/core';
import { getBookedPlaces, getNextActivityStatus } from '@domain/activity.logic';
import { Activity, ActivityStatus, NULL_ACTIVITY } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { BookingService } from './booking.service';

@Injectable()
export class BookingStore {
  // * Injected services division

  #service = inject(BookingService);

  // * signals state division

  #activity: WritableSignal<Activity> = signal<Activity>(NULL_ACTIVITY);
  #bookings: WritableSignal<Booking[]> = signal<Booking[]>([]);

  // * selectors division

  activity: Signal<Activity> = this.#activity.asReadonly();
  bookings: Signal<Booking[]> = this.#bookings.asReadonly();

  bookedPlaces: Signal<number> = computed(() => getBookedPlaces(this.#bookings()));
  nextActivityStatus: Signal<ActivityStatus> = computed(() =>
    getNextActivityStatus(this.activity(), this.bookedPlaces()),
  );
  #activityId: Signal<string> = computed(() => this.activity().id);

  // * effects division

  readonly #onActivityIdUpdatedEffect = effect(() => {
    const activityId = this.#activityId();
    if (activityId !== '') {
      untracked(() => this.#dispatchGetBookingsByActivityId(activityId));
    }
  });

  readonly #onActivityStatusUpdatedEffect = effect(() => {
    const activity = this.activity();
    const nextStatus = this.nextActivityStatus();
    if (activity.status !== nextStatus) {
      untracked(() => this.#dispatchPutNewActivityStatus(activity, nextStatus));
    }
  });

  // * reducers division

  setActivity(activity: Activity): void {
    this.#activity.set(activity);
  }

  setBookings(bookings: Booking[]): void {
    this.#bookings.set(bookings);
  }

  addNewBooking(newBooking: Booking): void {
    this.#bookings.update((bookings) => [...bookings, newBooking]);
  }

  changeActivityStatus(status: ActivityStatus): void {
    this.#activity.update((activity) => ({ ...activity, status }));
  }

  // * Dispatchers division

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#service
      .getActivityBySlug$(slug) // should be unsubscribed
      .subscribe((activity) => this.setActivity(activity));
  }

  #dispatchGetBookingsByActivityId(activityId: string): void {
    this.#service
      .getBookingsByActivityId$(activityId) // should be unsubscribed
      .subscribe((bookings) => this.setBookings(bookings));
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#service
      .postBooking$(booking) // should be unsubscribed
      .subscribe((booking) => this.addNewBooking(booking));
  }

  #dispatchPutNewActivityStatus(activity: Activity, nextStatus: ActivityStatus): void {
    const updatedActivity = { ...activity, status: nextStatus };
    this.#service
      .putActivity$(updatedActivity) // should be unsubscribed
      .subscribe((_) => this.changeActivityStatus(nextStatus));
  }
}
