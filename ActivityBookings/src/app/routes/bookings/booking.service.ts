import { Injectable, effect, inject, untracked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityStatus } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { BookingStore } from './booking.store';

// ToDo: try to
// invert the dependency between BookingService and BookingStore
// or
// export BookingStore signals to reduce the dependencies for callers

@Injectable()
export class BookingService {
  // * Injected services division

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);
  #route = inject(ActivatedRoute);

  #bookingStore: BookingStore = inject(BookingStore);

  readonly #onActivityStatusUpdatedEffect = effect(() => {
    const activity = this.#bookingStore.activity();
    const nextStatus = this.#bookingStore.nextActivityStatus();
    if (activity.status !== nextStatus) {
      untracked(() => this.#dispatchPutNewActivityStatus(nextStatus));
    }
  });

  constructor() {
    const slug: string = this.#route.snapshot.paramMap.get('slug') || '';
    this.#dispatchGetActivityWithBookingsBySlug(slug);
  }

  // * Dispatchers division

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#bookingsRepository.postBooking$(booking).subscribe((booking) => {
      this.#bookingStore.addNewBooking(booking);
    });
  }

  #dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#activitiesRepository.getBySlug$(slug).subscribe((activity) => {
      this.#bookingStore.setActivity(activity);
      this.#bookingsRepository.getByActivityId$(activity.id).subscribe((bookings) => {
        this.#bookingStore.setBookings(bookings);
      });
    });
  }

  #dispatchPutNewActivityStatus(nextStatus: ActivityStatus): void {
    this.#bookingStore.changeActivityStatus(nextStatus);
    const activity = this.#bookingStore.activity();
    this.#activitiesRepository.putActivity$(activity).subscribe();
  }
}
