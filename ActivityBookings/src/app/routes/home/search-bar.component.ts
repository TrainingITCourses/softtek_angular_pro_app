import { ChangeDetectionStrategy, Component, OutputRef, input } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'lab-search-bar',
  standalone: true,
  imports: [],
  template: `
    <input type="search" [placeholder]="placeholder()" (input)="onSearchInput($event)" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  placeholder = input<string>('Type to search...');

  #search$ = new Subject<string>();

  search: OutputRef<string> = outputFromObservable(
    this.#search$.pipe(
      debounceTime(300),
      filter((term) => term.length > 2 || term.length === 0),
      distinctUntilChanged(),
    ),
  );

  onSearchInput(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.#search$.next(value);
  }
}
