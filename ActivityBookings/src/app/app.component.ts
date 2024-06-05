import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { HeaderWidget } from './core/header.widget';
import { UpdateDialog } from './core/update.dialog';

/**
 * _Root_ component of the application with the main layout.
 * - Contains the header, the main content and the footer.
 * - Uses the `router-outlet` to display the different pages.
 * - When running on the browser, shows a dialog to update the app when a new version is available.
 */
@Component({
  selector: 'lab-root',
  standalone: true,
  imports: [HeaderWidget, RouterOutlet, UpdateDialog],
  template: `
    <lab-header />
    <router-outlet />
    @defer (when isBrowser) {
      <lab-update-dialog />
    }
  `,
  styles: [],
})
export class AppComponent {
  // * Injected services division

  #platformService: PlatformService = inject(PlatformService);

  /** Flag to show or execute only whe running on browser */
  isBrowser: boolean = this.#platformService.isBrowser;
}
