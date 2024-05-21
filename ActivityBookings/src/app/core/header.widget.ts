import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-header',
  standalone: true,
  imports: [],
  template: `
    <p>
      header works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderWidget {

}
