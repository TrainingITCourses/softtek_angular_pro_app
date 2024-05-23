import { Injectable, effect, inject } from '@angular/core';
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

  #onActivityStatusUpdated = effect(() => {
    const updated = this.#bookingStore.activityStatusUpdated();
    if (!updated) return;
    console.log('Activity status updated', updated);
    this.#dispatchPutActivity();
  });

  dispatchGetActivityWithBookingsBySlug(slug: string): void {
    this.#activitiesRepository.getBySlug$(slug).subscribe((activity) => {
      console.log('Activity  loaded', activity);
      this.#bookingStore.setActivity(activity);
      this.#bookingsRepository.getByActivityId$(activity.id).subscribe((bookings) => {
        console.log('Bookings loaded', bookings);
        bookings.forEach((booking) => this.#bookingStore.addNewBooking(booking));
      });
    });
  }

  dispatchPostBooking(activityId: string, participants: number): void {
    const booking: Booking = { activityId, participants, date: new Date(), userId: '0', id: '' };
    this.#bookingsRepository.postBooking$(booking).subscribe((booking) => {
      console.log('Booking created', booking);
      this.#bookingStore.addNewBooking(booking);
    });
  }

  #dispatchPutActivity(): void {
    const activity = this.#bookingStore.activity();
    this.#activitiesRepository
      .putActivity$(activity)
      .subscribe((activity) => console.log('Activity updated', activity));
  }
}
