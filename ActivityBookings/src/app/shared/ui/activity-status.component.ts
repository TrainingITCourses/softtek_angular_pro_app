import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  input,
} from '@angular/core';
import { ActivityStatus } from '@domain/activity.type';

@Component({
  selector: 'lab-activity-status',
  standalone: true,
  imports: [],
  template: ` <span>{{ icon() }} {{ value().toUpperCase() }} </span> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActivityStatusComponent {
  value: InputSignal<ActivityStatus> = input.required<ActivityStatus>();

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
