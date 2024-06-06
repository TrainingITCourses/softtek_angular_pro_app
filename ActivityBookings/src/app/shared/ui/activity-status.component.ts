import { ChangeDetectionStrategy, Component, InputSignal, Signal, computed, input } from '@angular/core';
import { ActivityStatus } from '@domain/activity.type';

/**
 * Component to display the status of an activity.
 */
@Component({
  selector: 'lab-activity-status',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span>{{ icon() }} {{ value().toUpperCase() }} </span> `,
})
export class ActivityStatusComponent {
  // * Input signal division

  /** The activity status value */
  value: InputSignal<ActivityStatus> = input.required<ActivityStatus>();

  // * Computed signal division

  icon: Signal<string> = computed(() => {
    const status: ActivityStatus = this.value();
    switch (status) {
      case 'draft':
        return '☁️';
      case 'published':
        return '📢';
      case 'confirmed':
        return '✅';
      case 'sold-out':
        return '🕳️';
      case 'cancelled':
        return '🔴';
      case 'done':
        return '📜';
      default:
        return '❓'; // Question mark
    }
  });
}
