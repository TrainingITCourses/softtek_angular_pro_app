import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'lab-location',
  standalone: true,
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <span>📍at {{ value() }} </span> `,
})
export class LocationComponent {
  // * Properties division

  /** Location value */
  value: InputSignal<string> = input.required<string>();
}
