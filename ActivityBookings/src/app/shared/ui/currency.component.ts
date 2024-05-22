import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, InputSignal, input } from '@angular/core';

/**
 * Presentation component for displaying a currency value.
 * - Displays the currency value with the currency symbol.
 * - Uses the `CurrencyPipe` to format the value.
 */
@Component({
  selector: 'lab-currency',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CurrencyPipe],
  template: ` <span>💸 for {{ value() | currency }}</span> `,
})
export class CurrencyComponent {
  // * Input division

  /** Amount to be displayed as a currency */
  value: InputSignal<number> = input.required<number>();

  // ToDo: Add a property to define the currency code
}
