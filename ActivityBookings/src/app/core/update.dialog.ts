import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { VersionReadyEvent } from '@angular/service-worker';
import { UpdateService } from './update.service';

@Component({
  selector: 'lab-update-dialog',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [JsonPipe],
  template: `
    <dialog [open]="open()">
      <article>
        <header>
          <button aria-label="Close" rel="prev" (click)="onCloseClick()"></button>
          <p>
            <strong>🚀 There are a new version</strong>
          </p>
        </header>
        <main>
          <p>An update is available, do you want to install it?</p>
          <p>{{ currentVersion() }} ⏩ {{ latestVersion() }}</p>
          <p>{{ latestVersionDescription() }}</p>
          <p>Release date: {{ latestVersionDate() }}</p>
        </main>
        <footer>
          <button className="secondary" (click)="onCloseClick()">Cancel</button>
          <button (click)="onUpdateAppClick()">Update</button>
        </footer>
      </article>
    </dialog>
  `,
  styles: [],
})
export class UpdateDialog {
  #updateService: UpdateService = inject(UpdateService);
  versionReady: Signal<VersionReadyEvent | null> = this.#updateService.versionReady;
  #hasUpdates: Signal<boolean> = computed(() => this.versionReady() !== null);
  #closedByUser: WritableSignal<boolean> = signal(false);
  open: Signal<boolean> = computed(() => this.#hasUpdates() && !this.#closedByUser());
  #current: Signal<any> = computed(() => this.versionReady()?.currentVersion.appData || {});
  currentVersion: Signal<string> = computed(() => this.#current().version || 'No current version number known');
  #latest: Signal<any> = computed(() => this.versionReady()?.latestVersion.appData || {});
  latestVersion: Signal<string> = computed(() => this.#latest().version || 'No new version number known');
  latestVersionDescription: Signal<string> = computed(() => this.#latest().description || 'No description available');
  latestVersionDate: Signal<string> = computed(() => this.#latest().date || 'No date available');
  onCloseClick() {
    this.#closedByUser.set(true);
  }
  onUpdateAppClick() {
    this.#updateService.updateApp();
  }
}
