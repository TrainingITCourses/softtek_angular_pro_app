import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Activity } from '@domain/activity.type';
import { ActivitiesRepository } from '@services/activities.repository';

@Injectable({
  providedIn: 'root',
})
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
