import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { environment } from '@env/environment';

/**
 * Presentation component for displaying a date value.
 * - Displays the date value in the configured date format.
 * - Uses the `DatePipe` to format the value.
 */
@Component({
  selector: 'lab-date',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DatePipe],
  template: ` <span>📅 on {{ value() | date : dateFormat }}</span> `,
})
export class DateComponent {
  // * Input division

  /** Date to be displayed */
  value: InputSignal<Date> = input.required<Date>();

  // * Properties division

  dateFormat: string = environment.dateFormat;
}
