import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PlatformService } from '@services/platform.service';
import { HeaderWidget } from './core/header.widget';
import { UpdateDialog } from './core/update.dialog';

/**
 * _Root_ component of the application with the main layout.
 * @requires HeaderWidget to display the main navigation.
 * @requires RouterOutlet to display the different pages.
 * @requires UpdateDialog to ask the user to update the app when a new version is available.
 * @requires PlatformService to determine if the app is running on the server or the browser
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
