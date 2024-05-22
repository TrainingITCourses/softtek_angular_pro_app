import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderWidget } from './core/header.widget';

/**
 * _Root_ component of the application with the main layout.
 * - Contains the header, the main content and the footer.
 * - Uses the `router-outlet` to display the different pages.
 */
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
export class AppComponent {}
