import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Activity } from '@domain/activity.type';
import { ActivitiesRepository } from '@services/activities.repository';

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

  // * Public signals division

  /** List of activities */
  activities: Signal<Activity[]> = toSignal(this.#activitiesRepository.getActivities$(), {
    initialValue: [],
  });
}
