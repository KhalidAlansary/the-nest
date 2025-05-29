import { Booking, ServiceRequest } from "@/types/booking";
import { properties } from "./properties";

// Helper function to create dates
const createDate = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day);
};

// Sample service requests
const serviceRequests: ServiceRequest[] = [
  {
    id: 1,
    bookingId: 1,
    type: "cleaning",
    description:
      "Would like the room to be cleaned today around 2pm if possible.",
    status: "completed",
    createdAt: createDate(2025, 5, 26),
  },
  {
    id: 2,
    bookingId: 1,
    type: "maintenance",
    description: "The air conditioning isn't working properly.",
    status: "in-progress",
    createdAt: createDate(2025, 5, 27),
  },
];

// Sample bookings data
export const bookings: Booking[] = [
  {
    id: 1,
    propertyId: 1,
    property: properties[0],
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    guestId: "user1",
    checkInDate: createDate(2025, 5, 25),
    checkOutDate: createDate(2025, 5, 30),
    totalAmount: 750,
    status: "confirmed",
    createdAt: createDate(2025, 4, 15),
    paymentStatus: "paid",
    serviceRequests: serviceRequests.filter((sr) => sr.bookingId === 1),
  },
  {
    id: 2,
    propertyId: 1,
    property: properties[0],
    guestName: "Alice Smith",
    guestEmail: "alice.smith@example.com",
    guestId: "user2",
    checkInDate: createDate(2025, 6, 10),
    checkOutDate: createDate(2025, 6, 15),
    totalAmount: 750,
    status: "pending",
    createdAt: createDate(2025, 4, 20),
    paymentStatus: "pending",
  },
  {
    id: 3,
    propertyId: 2,
    property: properties[1],
    guestName: "Robert Johnson",
    guestEmail: "robert.j@example.com",
    guestId: "user3",
    checkInDate: createDate(2025, 5, 20),
    checkOutDate: createDate(2025, 5, 23),
    totalAmount: 360,
    status: "confirmed",
    createdAt: createDate(2025, 4, 10),
    paymentStatus: "paid",
  },
  {
    id: 4,
    propertyId: 3,
    property: properties[2],
    guestName: "Emma Watson",
    guestEmail: "emma.w@example.com",
    guestId: "user1",
    checkInDate: createDate(2025, 5, 28),
    checkOutDate: createDate(2025, 6, 2),
    totalAmount: 1000,
    status: "confirmed",
    createdAt: createDate(2025, 4, 22),
    paymentStatus: "paid",
  },
];
