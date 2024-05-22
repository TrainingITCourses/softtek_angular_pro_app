import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { ActivityListComponent } from './activity-list.component';
import { HomeService } from './home.service';

/**
 * Routed component for the Home page.
 * - Imports the `ActivityListComponent` as a presentation component.
 * - Provides the `HomeService` as a facade to get the data access.
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActivityListComponent],
  providers: [HomeService],
  template: `
    <h1>Activities</h1>
    <lab-activity-list [activities]="activities()" />
  `,
})
export default class HomePage {
  // * Injected services division

  #service: HomeService = inject(HomeService);

  // * Public signal division

  /** List of activities */
  activities: Signal<Activity[]> = this.#service.activities;
}
