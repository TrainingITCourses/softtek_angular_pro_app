import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-booking',
  standalone: true,
  imports: [],
  template: ` <p>booking works!</p> `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BookingPage {}
