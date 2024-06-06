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

/**
 * Presentation component for creating a new booking.
 * @description Allows the user to input the number of participants and book the activity.
 * @returns The number of participants to book.
 */
@Component({
  selector: 'lab-new-booking',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      <button [disabled]="!canBook()" (click)="onBookClick()">Book</button>
    </section>
  `,
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

  onParticipantChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    this.participants.set(value);
  }

  onBookClick(): void {
    this.book.emit(this.participants());
  }
}
