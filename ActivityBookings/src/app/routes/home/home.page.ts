import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { ActivityListComponent } from './activity-list.component';
import { HomeService } from './home.service';
import { SearchBarComponent } from './search-bar.component';

/**
 * Routed component for the Home page.
 * @requires HomeService to manage the state
 * @requires ActivityListComponent to display the activities
 * @requires SearchBarComponent to search activities
 */
@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActivityListComponent, SearchBarComponent],
  providers: [HomeService],
  template: `
    <h1>Activities</h1>
    <lab-search-bar [placeholder]="'Search activities...'" (search)="onSearch($event)" />
    <lab-activity-list [activities]="activities()" />
  `,
})
export default class HomePage {
  // * Injected services division

  #service: HomeService = inject(HomeService);

  // * Public signal division

  /** List of activities */
  activities: Signal<Activity[]> = this.#service.activities;

  // * event handlers division

  /** when the user search for something, set it on the store */
  onSearch(term: string) {
    if (typeof term === 'string') this.#service.dispatchProductSearchByTerm(term);
  }
}
