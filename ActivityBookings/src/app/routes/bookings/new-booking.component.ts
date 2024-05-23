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
  activity: InputSignal<Activity> = input.required<Activity>();
  bookedPlaces: InputSignal<number> = input.required<number>();

  // emits the booking event with the number of participants
  book: OutputEmitterRef<number> = output<number>();

  maxParticipants: Signal<number> = computed(
    () => this.activity().maxParticipants - this.bookedPlaces(),
  );

  participants: WritableSignal<number> = signal<number>(0);

  canBook: Signal<boolean> = computed(() => this.participants() > 0);

  onParticipantChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = parseInt(target.value, 10);
    this.participants.set(value);
  }

  onBook() {
    this.book.emit(this.participants());
  }
}
