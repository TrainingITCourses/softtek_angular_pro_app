import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderWidget } from './core/header.widget';

@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [HeaderWidget, RouterOutlet],
  template: `
    <lab-header />
    <router-outlet />
  `,
  styles: [],
})
export class AppComponent {
  title = 'ActivityBookings';
}
