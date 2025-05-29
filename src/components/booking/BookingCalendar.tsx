import React, { useState, useEffect } from "react";
import {
  format,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
  isBefore,
  isAfter,
  isSameDay
} from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Property } from "@/types/property";
import { X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BookingCalendarProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

type DateRangeType = {
  from: Date | undefined;
  to: Date | undefined;
};

interface Booking {
  checkInDate: string;
  checkOutDate: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ property, isOpen, onClose }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [bookedDates, setBookedDates] = useState<Booking[]>([]);
  const [summary, setSummary] = useState({ days: 0, weeks: 0, months: 0, total: 0 });

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/bookings/${property._id}`);
        const data = await res.json();
        setBookedDates(data);
      } catch (err) {
        console.error("Failed to fetch booked dates", err);
      }
    };
    if (property._id) fetchBookedDates();
  }, [property._id]);

  const isDateBooked = (date: Date): boolean => {
    return bookedDates.some(({ checkInDate, checkOutDate }) => {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      return (isSameDay(date, start) || isAfter(date, start)) && (isSameDay(date, end) || isBefore(date, end));
    });
  };

  useEffect(() => {
    if (dateRange?.from && dateRange?.to) {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1;
      const weeks = differenceInWeeks(dateRange.to, dateRange.from);
      const months = differenceInMonths(dateRange.to, dateRange.from);

      let total = 0;
      if (months >= 1) {
        total = months * property.pricePerMonth + (days - months * 30) * property.pricePerDay;
      } else if (weeks >= 1) {
        total = weeks * property.pricePerWeek + (days - weeks * 7) * property.pricePerDay;
      } else {
        total = days * property.pricePerDay;
      }
      total += 80;

      setSummary({ days, weeks, months, total });
    } else {
      setSummary({ days: 0, weeks: 0, months: 0, total: 0 });
    }
  }, [dateRange, property]);

  const proceedToPayment = () => {
    if (!dateRange?.from || !dateRange?.to || !user) {
      toast.error("You must be logged in to book.");
      return;
    }

    // Store booking details in localStorage for the payment page
    const bookingData = {
      property: {
        id: property._id,
        name: property.name,
        location: property.location,
        image: property.images?.[0]
      },
      checkInDate: dateRange.from.toISOString(),
      checkOutDate: dateRange.to.toISOString(),
      totalAmount: summary.total,
      days: summary.days
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));
    onClose();
    navigate('/payment');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Book Your Stay</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <h3 className="font-medium mb-3">Select dates</h3>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={setDateRange}
              disabled={date => isBefore(date, new Date()) || isDateBooked(date)}
              className="rounded-md border"
              numberOfMonths={1}
            />
          </div>

          <div>
            <h3 className="font-medium mb-3">Booking Summary</h3>
            {dateRange?.from && dateRange?.to ? (
              <div className="space-y-4">
                <div className="border rounded p-3">
                  <p>From: {format(dateRange.from, "PPP")}</p>
                  <p>To: {format(dateRange.to, "PPP")}</p>
                  <p>Duration: {summary.days} days</p>
                </div>
                <div className="border rounded p-3">
                  <p>Total Price: <strong>L.E.{summary.total}</strong></p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 border p-3 text-center rounded">Please select a date range.</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex justify-between w-full">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button
              className="bg-nest-primary hover:bg-nest-primary/90"
              disabled={!dateRange?.from || !dateRange?.to || !user}
              onClick={proceedToPayment}
            >
              Book Now - L.E.{summary.total}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCalendar;
