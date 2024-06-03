import {
  ChangeDetectionStrategy,
  Component,
  InputSignal,
  OutputEmitterRef,
  Signal,
  WritableSignal,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { Activity } from '@domain/activity.type';

@Component({
  selector: 'lab-new-booking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <section class="grid">
      <label>Participants:</label>
      <input
        #quantityInput
        type="number"
        placeholder="Participants"
        min="0"
        max="{{ maxParticipants() }}"
        [value]="participants()"
        (change)="onParticipantChange($event)" />
      <button [disabled]="!canBook()" (click)="onBook()">Book</button>
    </section>
  `,
  styles: ``,
})
export class NewBookingComponent {
  // ! Signal world

  // * Input Signals division

  activity: InputSignal<Activity> = input.required<Activity>();
  bookedPlaces: InputSignal<number> = input.required<number>();

  // * Output Emitters division

  /** Output that emits the booking event with the number of participants*/
  book: OutputEmitterRef<number> = output<number>();

  // * Signals division

  participants: WritableSignal<number> = signal<number>(0);

  maxParticipants: Signal<number> = computed(() => this.activity().maxParticipants - this.bookedPlaces());

  canBook: Signal<boolean> = computed(() => this.participants() > 0);

  // * Event handlers division

  onParticipantChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    this.participants.set(value);
  }

  onBook() {
    this.book.emit(this.participants());
  }
}
