import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { VersionReadyEvent } from '@angular/service-worker';
import { UpdateService } from './update.service';

/**
 * Dialog component to ask user to update the app when a new version is available.
 * @requires UpdateService to check for updates and update the app.
 */
@Component({
  selector: 'lab-update-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <dialog [open]="open()">
      <article>
        <header>
          <button aria-label="Close" rel="prev" (click)="onCloseClick()"></button>
          <h2>🚀 There are a new version</h2>
        </header>
        <main>
          <p>{{ currentVersion() }} ⏩ {{ latestVersion() }}</p>
          <p>{{ latestVersionDescription() }}</p>
          <p>Release date: {{ latestVersionDate() }}</p>
          <p>Do you want to install it?</p>
        </main>
        <footer>
          <button className="secondary" (click)="onCloseClick()">Cancel</button>
          <button (click)="onUpdateAppClick()">Update</button>
        </footer>
      </article>
    </dialog>
  `,
})
export class UpdateDialog {
  // * Injected services division

  #updateService: UpdateService = inject(UpdateService);

  // * Signals division

  #versionReady: Signal<VersionReadyEvent | null> = this.#updateService.versionReady;
  #closedByUser: WritableSignal<boolean> = signal(false);

  // * Computed signals division

  #hasUpdates: Signal<boolean> = computed(() => this.#versionReady() !== null);
  #current: Signal<any> = computed(() => this.#versionReady()?.currentVersion.appData || {});
  #latest: Signal<any> = computed(() => this.#versionReady()?.latestVersion.appData || {});
  open: Signal<boolean> = computed(() => this.#hasUpdates() && !this.#closedByUser());
  currentVersion: Signal<string> = computed(() => this.#current().version || 'No current version number known');
  latestVersion: Signal<string> = computed(() => this.#latest().version || 'No new version number known');
  latestVersionDescription: Signal<string> = computed(() => this.#latest().description || 'No description available');
  latestVersionDate: Signal<string> = computed(() => this.#latest().date || 'No date available');

  // * Event handlers division

  onCloseClick(): void {
    this.#closedByUser.set(true);
  }

  onUpdateAppClick(): void {
    this.#updateService.updateApp();
  }
}
