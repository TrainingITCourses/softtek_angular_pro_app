import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Booking, NULL_BOOKING } from '@domain/booking.type';
import { environment } from '@env/environment';
import { Observable, of } from 'rxjs';

/**
 * Repository to manage the bookings in the app.
 * - Provides the bookings data from the API.
 * - Provided in the root injector.
 * @requires HttpClient to make requests to the API
 */
@Injectable({ providedIn: 'root' })
export class BookingsRepository {
  // * Private properties division

  /** The API URL for the activities  */
  #apiUrl: string = `${environment.apiUrl}/bookings`;

  // * Injected services division

  /** The HTTP client to make requests to the API */
  #http: HttpClient = inject(HttpClient);

  // * Public methods division

  /**
   * Get bookings for an Activity from the API
   * @param activityId The ID of the activity to get the bookings
   * @returns An observable with the bookings
   */
  getByActivityId$(activityId: string): Observable<Booking[]> {
    if (activityId === '') return of([]);
    const url = `${this.#apiUrl}/?key=activityId&value=${activityId}`;
    return this.#http.get<Booking[]>(url);
  }

  /**
   * Post a new booking to the API
   * @param booking The booking to post
   * @returns An observable with the booking
   */
  postBooking$(booking: Booking): Observable<Booking> {
    if (booking === NULL_BOOKING) return of(NULL_BOOKING);
    return this.#http.post<Booking>(this.#apiUrl, booking);
  }
}
