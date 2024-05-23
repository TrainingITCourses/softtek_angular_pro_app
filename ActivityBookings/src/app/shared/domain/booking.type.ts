/**
 * PaymentMethod type definition
 * @description This is an enum for the booking possible payment methods
 */
export type PaymentMethod = 'none' | 'cash' | 'creditCard' | 'paypal';

/**
 * PaymentStatus type definition
 * @description This is an enum for the booking possible payment status
 */
export type PaymentStatus = 'none' | 'pending' | 'paid' | 'refunded';

/**
 * Booking type definition
 * @description This is a DTO for the booking entity
 */
export type Booking = {
  id: string;
  activityId: string;
  userId: string;
  date: Date;
  participants: number;
  payment?: {
    method: PaymentMethod;
    amount: number;
    status: PaymentStatus;
  };
};

/** Null object pattern for the Booking type */
export const NULL_BOOKING: Booking = {
  id: '',
  activityId: '',
  userId: '',
  date: new Date(),
  participants: 0,
  payment: {
    method: 'none',
    amount: 0,
    status: 'none',
  },
};
