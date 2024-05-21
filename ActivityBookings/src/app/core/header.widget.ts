import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '@env/environment';

@Component({
  selector: 'lab-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <header>
      <nav>
        <ul>
          <a [routerLink]="['/']" class="title">{{ title }}</a>
        </ul>
        <ul>
          <li>
            <a [routerLink]="['/']">To do...</a>
          </li>
        </ul>
      </nav>
    </header>
  `,
  styles: `
   .title {
      font-size: 1.2rem;
      font-weight: bold;
    }`,
})
export class HeaderWidget {
  /** Application title */
  title: string = environment.appName;
}
