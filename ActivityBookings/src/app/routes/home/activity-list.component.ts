import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { CurrencyComponent } from '@ui/currency.component';
import { DateComponent } from '@ui/date.component';
import { LocationComponent } from '@ui/location.component';

/**
 * Presentation component for the list of activities.
 * - Displays a list of activities with their name, location, price and date.
 * - If no activities are found, it displays a message.
 * - Uses the `LocationComponent`, `CurrencyComponent` and `DateComponent` to display the price and date.
 */
@Component({
  selector: 'lab-activity-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyComponent, DateComponent, LocationComponent],
  template: `
    @for(activity of activities(); track activity.id ){
    <div>
      <span>
        <a href="">{{ activity.name }}</a>
      </span>
      <lab-location [value]="activity.location" />
      <lab-currency [value]="activity.price" />
      <lab-date [value]="activity.date" />
    </div>
    } @empty {
    <input disabled value="No activities found" />
    }
  `,
})
export class ActivityListComponent {
  activities: InputSignal<Activity[]> = input.required<Activity[]>();
}
