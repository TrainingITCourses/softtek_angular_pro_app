import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { PlatformService } from '@services/platform.service';
import { Observable, filter, map, of, tap } from 'rxjs';

/**
 * Service to check for updates and update the app.
 */
@Injectable({ providedIn: 'root' })
export class UpdateService {
  // * Private injection division

  /** Angular PWA service that runs in a parallel thread and checks for update */
  #swUpdate: SwUpdate = inject(SwUpdate);

  #platformService: PlatformService = inject(PlatformService);

  // * Public signal division

  /** Signal that emits when a new version is ready to be installed */
  versionReady: Signal<VersionReadyEvent | null> = toSignal(this.#getAppUpdates$(), { initialValue: null });

  constructor() {
    if (this.#platformService.isBrowser) this.#checkForUpdates();
  }

  #getAppUpdates$(): Observable<VersionReadyEvent | null> {
    if (this.#platformService.isServer) return of(null);
    // Observable pipe to listen for version updates
    return this.#swUpdate.versionUpdates.pipe(
      tap((event: VersionEvent) => console.log('☁️ Version event ' + new Date(), event)),
      filter((event: VersionEvent) => event.type === 'VERSION_READY'),
      map((event: VersionEvent) => event as VersionReadyEvent),
      tap((event: VersionReadyEvent) => console.log('🚀 Version ready', event)),
    );
  }

  // * Public methods division

  /** Update the app with the new version by reloading the browser after verfy it was downloaded */
  updateApp() {
    document.location.reload();
  }

  #checkForUpdates() {
    // console.log('✅ Schedule checks every minute!');
    setInterval(() => {
      console.log('⌛ Checking for updates ' + new Date());
      this.#swUpdate.checkForUpdate().then(() => console.log('✅ Check completed'));
    }, 60 * 1000);
  }
}
