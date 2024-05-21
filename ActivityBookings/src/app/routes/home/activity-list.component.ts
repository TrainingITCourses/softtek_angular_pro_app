import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { CurrencyComponent } from '@ui/currency.component';
import { DateComponent } from '@ui/date.component';

@Component({
  selector: 'lab-activity-list',
  standalone: true,
  imports: [CurrencyComponent, DateComponent],
  template: `
    @for(activity of activities(); track activity.id ){
    <div>
      <span>
        <a href="">{{ activity.name }}</a>
      </span>
      <span>at {{ activity.location }}</span>
      <lab-currency [value]="activity.price" />
      <lab-date [value]="activity.date" />
    </div>
    } @empty {
    <input disabled value="No activities found" />
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityListComponent {
  activities: InputSignal<Activity[]> = input.required<Activity[]>();
}
