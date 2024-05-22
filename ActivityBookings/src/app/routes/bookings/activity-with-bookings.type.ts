import { Activity } from '@domain/activity.type';
import { Booking } from '@domain/booking.type';

export type ActivityWithBookings = Activity & { bookings: Booking[] };
