import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { ActivityStatusComponent } from '@ui/activity-status.component';

@Component({
  selector: 'lab-activity-details',
  standalone: true,
  imports: [ActivityStatusComponent],
  template: `
    <section>
      <h2>{{ activity().name }}</h2>
      <p>Minimum quorum participants: {{ activity().minParticipants }}</p>
      <p>Maximum capacity participants: {{ activity().maxParticipants }}</p>
      <p>Status: <lab-activity-status [value]="activity().status" /></p>
    </section>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityDetailsComponent {
  activity: InputSignal<Activity> = input.required<Activity>();
}
