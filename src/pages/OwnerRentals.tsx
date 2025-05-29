import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Booking, BookingStatus } from "@/types/booking";
import { toast } from "sonner";

const OwnerRentals = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">(
    "all",
  );

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user?.id) return;
        const res = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/bookings/owner/${user.id}`,
        );
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
      } catch (err: any) {
        toast.error(err.message || "Could not load bookings.");
      }
    };

    fetchBookings();
  }, [user]);

  const filteredBookings = bookings.filter(
    (booking) => statusFilter === "all" || booking.status === statusFilter,
  );

  const totalRevenue = filteredBookings
    .filter((booking) => booking.paymentStatus === "paid")
    .reduce((sum, booking) => sum + booking.totalAmount, 0);

  const bookingCounts = {
    all: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    confirmed: bookings.filter((b) => b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
    cancelled: bookings.filter((b) => b.status === "cancelled").length,
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow section-padding py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-nest-dark mb-4">
              My Property Rentals
            </h1>
            <p className="text-gray-600">
              Manage and track all bookings for your properties.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-nest-primary">
                  L.E.{totalRevenue}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{bookingCounts.all}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Confirmed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {bookingCounts.confirmed}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">
                  {bookingCounts.pending}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-nest-dark">
              Booking List
            </h2>
            <div className="w-48">
              <Select
                value={statusFilter}
                onValueChange={(value) =>
                  setStatusFilter(value as BookingStatus | "all")
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableCaption>List of all property bookings</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[150px]">Property</TableHead>
                  <TableHead>Guest</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">
                        {booking.property.name}
                      </TableCell>
                      <TableCell>{booking.guestName}</TableCell>
                      <TableCell>
                        {booking.checkInDate
                          ? format(
                              new Date(booking.checkInDate),
                              "MMM dd, yyyy",
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell>
                        {booking.checkOutDate
                          ? format(
                              new Date(booking.checkOutDate),
                              "MMM dd, yyyy",
                            )
                          : "N/A"}
                      </TableCell>
                      <TableCell className="text-right">
                        L.E.{booking.totalAmount}
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status.charAt(0).toUpperCase() +
                            booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            booking.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }
                        >
                          {booking.paymentStatus.charAt(0).toUpperCase() +
                            booking.paymentStatus.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-4 text-gray-500"
                    >
                      No bookings found matching the selected filter.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OwnerRentals;
