import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Activity } from '@domain/activity.type';
import { ActivityStatusComponent } from '@ui/activity-status.component';
import { CurrencyComponent } from '@ui/currency.component';
import { DateComponent } from '@ui/date.component';
import { LocationComponent } from '@ui/location.component';

/**
 * Presentation component for the list of activities.
 * - Displays a list of activities with their name, location, price and date.
 * - If no activities are found, it displays a message.
 * @requires ActivityStatusComponent to display the status of the activity
 * @requires CurrencyComponent to display the price of the activity
 * @requires DateComponent to display the date of the activity
 * @requires LocationComponent to display the location of the activity
 * @requires RouterLink to navigate to the activity details page
 */
@Component({
  selector: 'lab-activity-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActivityStatusComponent, CurrencyComponent, DateComponent, LocationComponent, RouterLink],
  template: `
    @for (activity of activities(); track activity.id) {
      <div>
        <span>
          <a [routerLink]="['/', 'bookings', activity.slug]">{{ activity.name }}</a>
        </span>
        <lab-location [value]="activity.location" />
        <lab-currency [value]="activity.price" />
        <lab-date [value]="activity.date" />
        <lab-activity-status [value]="activity.status" />
      </div>
    } @empty {
      <input disabled value="No activities found" />
    }
  `,
})
export class ActivityListComponent {
  // * Input signal division

  /** List of activities to be displayed */
  activities: InputSignal<Activity[]> = input.required<Activity[]>();
}
