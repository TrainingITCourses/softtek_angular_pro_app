import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

@Component({
  selector: 'lab-currency',
  standalone: true,
  imports: [CurrencyPipe],
  template: ` <span>for {{ value() | currency }}</span> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CurrencyComponent {
  value: InputSignal<number> = input.required<number>();
}
