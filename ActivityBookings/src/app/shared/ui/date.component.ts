import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'lab-date',
  standalone: true,
  imports: [DatePipe],
  template: ` <span>on {{ value() | date : dateFormat }}</span> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateComponent {
  value: InputSignal<Date> = input.required<Date>();
  dateFormat = environment.dateFormat;
}
