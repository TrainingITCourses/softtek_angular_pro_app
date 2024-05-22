import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

/**
 * Repository service for the activities.
 * - Provides the activities data from the API.
 * - Provided in the root injector.
 */
@Injectable({
  providedIn: 'root',
})
export class ActivitiesRepository {
  // * Private properties division

  /** The API URL for the activities  */
  #apiUrl: string = `${environment.apiUrl}/activities`;

  // * Injected services division

  /** The HTTP client to make requests to the API */
  #http: HttpClient = inject(HttpClient);

  // * Public methods division

  /**
   * Get all activities from the API
   * @returns An observable with the activities
   */
  getActivities$(): Observable<Activity[]> {
    const url = this.#apiUrl;
    // const url = `${this.#apiUrl}/?status=404`;
    // const url = `${this.#apiUrl}/?delay=5000`;
    return this.#http.get<Activity[]>(url);
  }
}
