import { Injectable, Signal, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SwUpdate, VersionEvent, VersionReadyEvent } from '@angular/service-worker';
import { PlatformService } from '@services/platform.service';
import { Observable, filter, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateService {
  #swUpdate: SwUpdate = inject(SwUpdate);
  #platformService: PlatformService = inject(PlatformService);

  versionReady: Signal<VersionReadyEvent | null> = toSignal(this.#getAppUpdates$(), { initialValue: null });

  #getAppUpdates$(): Observable<VersionReadyEvent | null> {
    if (this.#platformService.isServer) return of(null);
    setInterval(() => this.#checkForUpdates(), 60 * 1000);
    return this.#swUpdate.versionUpdates.pipe(
      tap((event: VersionEvent) => console.log('☁️ Version event ' + new Date(), event)),
      filter((event: VersionEvent) => event.type === 'VERSION_READY'),
      map((event: VersionEvent) => event as VersionReadyEvent),
      tap((event: VersionReadyEvent) => console.log('🚀 Version ready', event)),
    );
  }

  updateApp() {
    this.#swUpdate.activateUpdate().then(() => document.location.reload());
  }

  #checkForUpdates() {
    console.log('⌛ Checking for updates ' + new Date());
    this.#swUpdate.checkForUpdate();
  }
}
