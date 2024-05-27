import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Activity, NULL_ACTIVITY } from '@domain/activity.type';
import { environment } from '@env/environment';
import { Observable, map, of } from 'rxjs';

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

  /**
   * Get an activity by its slug from the API
   * @param slug The slug of the activity to get
   * @returns An observable with the activity
   */
  getBySlug$(slug: string): Observable<Activity> {
    if (slug === '') return of(NULL_ACTIVITY);
    const url = `${this.#apiUrl}/?key=slug&value=${slug}`;
    return this.#http
      .get<Activity[]>(url)
      .pipe(map((activities) => activities[0] || NULL_ACTIVITY));
  }

  getByQuery$(query: string): Observable<Activity[]> {
    const url = `${this.#apiUrl}/?q=${query}`;
    return this.#http.get<Activity[]>(url);
  }

  putActivity$(activity: Activity): Observable<Activity> {
    if (activity === NULL_ACTIVITY) return of(NULL_ACTIVITY);
    const url = `${this.#apiUrl}/${activity.id}`;
    return this.#http.put<Activity>(url, activity);
  }
}
