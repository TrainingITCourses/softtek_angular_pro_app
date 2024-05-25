import { Injectable, effect, inject, untracked } from '@angular/core';
import { ActivityStatus } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BookingsRepository } from '@services/bookings.repository';
import { BookingStore } from './booking.store';

@Injectable()
export class BookingService {
  // * Injected services division

  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);
  #bookingsRepository: BookingsRepository = inject(BookingsRepository);

  #bookingStore: BookingStore = inject(BookingStore);

  readonly #onActivityStatusUpdatedEffect = effect(() => {
    const activity = this.#bookingStore.activity();
    const nextStatus = this.#bookingStore.nextActivityStatus();
    if (activity.status !== nextStatus) {
      untracked(() => this.#dispatchPutActivity(nextStatus));
    }
  });

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#activitiesRepository.getBySlug$(slug).subscribe((activity) => {
      this.#bookingStore.setActivity(activity);
      this.#bookingsRepository.getByActivityId$(activity.id).subscribe((bookings) => {
        bookings.forEach((booking) => this.#bookingStore.addNewBooking(booking));
      });
    });
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#bookingsRepository.postBooking$(booking).subscribe((booking) => {
      this.#bookingStore.addNewBooking(booking);
    });
  }

  #dispatchPutActivity(nextStatus: ActivityStatus): void {
    this.#bookingStore.changeActivityStatus(nextStatus);
    const activity = this.#bookingStore.activity();
    this.#activitiesRepository.putActivity$(activity).subscribe();
  }
}
