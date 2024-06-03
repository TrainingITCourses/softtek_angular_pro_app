import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  Signal,
  computed,
  inject,
  input,
} from '@angular/core';
import { Activity } from '@domain/activity.type';
import { BookingStore } from './booking.store';

@Component({
  selector: 'lab-places',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section>
      <div>
        <span>Booked places:</span> <mark>{{ bookedPlaces() }}</mark>
      </div>
      <div>
        <span>Remaining places:</span> <mark>{{ remainingPlaces() }}</mark>
      </div>
    </section>
  `,
})
export class PlacesComponent {
  // ! Signal world

  // * Injected services division

  #store = inject(BookingStore);

  // * Input Signals division

  activity: InputSignal<Activity> = input.required<Activity>();

  bookedPlaces: InputSignal<number> = input<number>(0);

  // * Computed signals division

  remainingPlaces: Signal<number> = computed(
    () => this.activity().maxParticipants - this.bookedPlaces(),
  );
}
