import { ChangeDetectionStrategy, Component, InputSignal, Signal, computed, input } from '@angular/core';
import { Activity } from '@domain/activity.type';

/**
 * Presentation component for displaying the number of booked and remaining places.
 */
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

  // * Input Signals division

  /** The activity to display the places for */
  activity: InputSignal<Activity> = input.required<Activity>();

  /** The number of already booked places */
  bookedPlaces: InputSignal<number> = input<number>(0);

  // * Computed signals division

  remainingPlaces: Signal<number> = computed(() => this.activity().maxParticipants - this.bookedPlaces());
}
