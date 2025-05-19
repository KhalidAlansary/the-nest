
import { Property } from './property';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Booking {
  id: number;
  propertyId: number;
  property: Property;
  guestName: string;
  guestEmail: string;
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
  paymentStatus: 'pending' | 'paid' | 'refunded';
}
