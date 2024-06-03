import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Activity } from '@domain/activity.type';
import { ActivitiesRepository } from '@services/activities.repository';
import { BehaviorSubject, switchMap } from 'rxjs';

/**
 * Facade service for the Home page
 * - NOT Provided in the root injector.
 * - Uses the `ActivitiesRepository` to get the activities data.
 */
@Injectable()
export class HomeService {
  // * Injected services division

  /** The repository used to get activities data from the API*/
  #activitiesRepository: ActivitiesRepository = inject(ActivitiesRepository);

  // * Private subject triggers division

  /**
   * Subject to trigger the search term change
   */
  #searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // * Public signals division

  /**
   * List of activities
   * - Run when the search term changes
   * - Uses the `ActivitiesRepository` to get the activities data
   * - Interop with the Observable world
   * @returns Signal of Activity[]
   * */
  activities: Signal<Activity[]> = toSignal(
    this.#searchTerm$.pipe(switchMap((term) => this.#activitiesRepository.getByQuery$(term))),
    { initialValue: [] },
  );

  // * Dispatchers division

  /**
   * Dispatches the search term to the repository
   * @param term The search term to dispatch
   */
  dispatchProductSearchByTerm(term: string) {
    this.#searchTerm$.next(term);
  }
}
