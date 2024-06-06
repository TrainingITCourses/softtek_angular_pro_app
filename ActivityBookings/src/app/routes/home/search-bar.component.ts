import { ChangeDetectionStrategy, Component, InputSignal, OutputRef, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

/**
 * Presentation component for a search bar.
 * @description Displays a search input field.
 * @returns Emits the search term when the user types in the search input.
 */
@Component({
  selector: 'lab-search-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <input type="search" [placeholder]="placeholder()" (input)="onSearchInput($event)" /> `,
})
export class SearchBarComponent {
  // * inputs division

  /**
   * The search input placeholder.
   */
  placeholder: InputSignal<string> = input('Search...');

  /** Subject observable for the search term*/
  #search$ = new Subject<string>();

  // * outputs division

  /**
   * Emits the search term when the user types in the search input.
   */
  search: OutputRef<string> = outputFromObservable(
    this.#search$.pipe(
      debounceTime(300),
      filter((term: string) => term.length > 2 || term.length === 0),
      distinctUntilChanged(),
    ),
  );

  // * event handlers division

  /** search input event handler */
  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.#search$.next(value);
  }
}
