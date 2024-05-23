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

    <!-- <h3>Doble: {{ doble() }}</h3>
    <h3>Es múltiplo de tres: {{ esMultiploDe3() }}</h3>
    <h3>Es múltiplo de tres EN LETRAS: {{ esMultiploDeTres() }}</h3>
    <h3>Es grande: {{ esGrande() }}</h3>
    <h3>Es múltiplo de tres y grande: {{ esMultiplode3Grande() }}</h3> -->
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

  // doble = computed(() => this.participants() * 2);

  // esMultiploDe3 = computed(() => {
  //   // this.esMultiploDeTres.set(this.participants() % 3 === 0);
  //   return this.participants() % 3 === 0;
  // });

  // esMultiploDeTres = signal<boolean>(false);

  // esGrande = computed(() => this.participants() > 4);

  // esMultiplode3Grande = computed(() => this.esMultiploDe3() && this.esGrande());

  constructor() {
    // effect(
    //   () => {
    //     this.esMultiploDeTres.set(this.participants() % 3 === 0);
    //   },
    //   {
    //     allowSignalWrites: true,
    //   },
    // );
  }
}
