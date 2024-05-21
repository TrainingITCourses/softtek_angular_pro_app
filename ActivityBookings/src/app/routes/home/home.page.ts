import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivityListComponent } from './activity-list.component';
import { HomeService } from './home.service';

@Component({
  standalone: true,
  imports: [ActivityListComponent],
  template: `
    <h1>Activities</h1>
    <lab-activity-list [activities]="activities()" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HomePage {
  // * Injected services division

  #service: HomeService = inject(HomeService);

  // * Public signal division

  /** List of activities */
  activities = this.#service.activities;
}
