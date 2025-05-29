import { Property } from "./property";

export type BookingStatus = "pending" | "confirmed" | "completed" | "cancelled";
export type ServiceRequestType =
  | "cleaning"
  | "maintenance"
  | "supplies"
  | "other";

export interface ServiceRequest {
  id: number;
  bookingId: number;
  type: ServiceRequestType;
  description: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  createdAt: Date;
}

export interface Booking {
  id: number;
  propertyId: number;
  property: Property;
  guestName: string;
  guestEmail: string;
  guestId?: string; // Used to identify which user made the booking
  checkInDate: Date;
  checkOutDate: Date;
  totalAmount: number;
  status: BookingStatus;
  createdAt: Date;
  paymentStatus: "pending" | "paid" | "refunded";
  serviceRequests?: ServiceRequest[];
}
