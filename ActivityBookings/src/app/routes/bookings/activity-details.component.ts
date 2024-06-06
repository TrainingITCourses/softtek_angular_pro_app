import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { Activity } from '@domain/activity.type';
import { ActivityStatusComponent } from '@ui/activity-status.component';

/**
 * Presentation component for displaying the details of an activity.
 * @description Displays the name, minimum and maximum participants and status of the activity.
 * @requires ActivityStatusComponent to display the status of the activity
 */
@Component({
  selector: 'lab-activity-details',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ActivityStatusComponent],
  template: `
    <section>
      <h2>{{ activity().name }}</h2>
      <p>Minimum quorum participants: {{ activity().minParticipants }}</p>
      <p>Maximum capacity participants: {{ activity().maxParticipants }}</p>
      <p>Status: <lab-activity-status [value]="activity().status" /></p>
    </section>
  `,
})
export class ActivityDetailsComponent {
  // * Input signal division

  /** The activity to be displayed */
  activity: InputSignal<Activity> = input.required<Activity>();
}
