import React, { useState, useEffect } from "react";
import { format, differenceInDays, differenceInWeeks, differenceInMonths, addDays, isBefore, isAfter, isSameDay } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Property, BookedDate } from "@/types/property";
import { X } from "lucide-react";

interface BookingCalendarProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
}

type DateRangeType = {
  from: Date | undefined;
  to: Date | undefined;
};

const BookingCalendar: React.FC<BookingCalendarProps> = ({ property, isOpen, onClose }) => {
  const [dateRange, setDateRange] = useState<DateRangeType>({
    from: undefined,
    to: undefined
  });
  
  const [summary, setSummary] = useState({
    days: 0,
    weeks: 0,
    months: 0,
    rate: 0,
    total: 0
  });

  // Check if a date is disabled (already booked)
  const isDateBooked = (date: Date): boolean => {
    if (!property.bookedDates) return false;
    
    return property.bookedDates.some(booking => {
      return (
        (isSameDay(date, booking.start) || isAfter(date, booking.start)) &&
        (isSameDay(date, booking.end) || isBefore(date, booking.end))
      );
    });
  };

  // Calculates the booking summary when dates change
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      const days = differenceInDays(dateRange.to, dateRange.from) + 1; // +1 to include the end date
      const weeks = differenceInWeeks(dateRange.to, dateRange.from);
      const months = differenceInMonths(dateRange.to, dateRange.from);
      
      // Calculate rate based on duration
      let rate = 0;
      let total = 0;
      
      if (months >= 1) {
        // If booking is for months, use the monthly rate
        rate = property.pricePerMonth;
        total = months * property.pricePerMonth;
        
        // Add remaining days at daily rate
        const remainingDays = days - (months * 30);
        if (remainingDays > 0) {
          total += remainingDays * property.pricePerDay;
        }
      } else if (weeks >= 1) {
        // If booking is for weeks, use the weekly rate
        rate = property.pricePerWeek;
        total = weeks * property.pricePerWeek;
        
        // Add remaining days at daily rate
        const remainingDays = days - (weeks * 7);
        if (remainingDays > 0) {
          total += remainingDays * property.pricePerDay;
        }
      } else {
        // Otherwise use the daily rate
        rate = property.pricePerDay;
        total = days * property.pricePerDay;
      }
      
      // Add cleaning fee and service fee
      total += 80; // L.E. 50 cleaning + L.E. 30 service fee
      
      setSummary({
        days,
        weeks,
        months,
        rate,
        total
      });
    } else {
      setSummary({
        days: 0,
        weeks: 0,
        months: 0,
        rate: 0,
        total: 0
      });
    }
  }, [dateRange, property]);

  const handleDateSelect = (range: { from: Date | undefined; to: Date | undefined }) => {
    setDateRange(range);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Book Your Stay</DialogTitle>
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-4 top-4" 
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div>
            <h3 className="font-medium mb-3">Select dates</h3>
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateSelect}
              numberOfMonths={1}
              disabled={(date) => {
                return (
                  isBefore(date, new Date()) || // Disable past dates
                  isDateBooked(date) // Disable booked dates
                );
              }}
              className="pointer-events-auto rounded-md border"
            />
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Booking Summary</h3>
            {dateRange.from && dateRange.to ? (
              <div className="space-y-4">
                <div className="rounded-md border p-3">
                  <p className="font-medium">Selected Dates</p>
                  <p>From: {format(dateRange.from, "PPP")}</p>
                  <p>To: {format(dateRange.to, "PPP")}</p>
                  <p className="mt-2">Duration: {summary.days} days</p>
                  {summary.weeks > 0 && (
                    <p>({summary.weeks} weeks and {summary.days - (summary.weeks * 7)} days)</p>
                  )}
                  {summary.months > 0 && (
                    <p>({summary.months} months, {Math.floor((summary.days - (summary.months * 30)) / 7)} weeks, and {summary.days % 7} days)</p>
                  )}
                </div>
                
                <div className="rounded-md border p-3">
                  <p className="font-medium">Price Details</p>
                  <div className="space-y-1 mt-2">
                    <div className="flex justify-between">
                      <span>Accommodation</span>
                      <span>L.E.{summary.total - 80}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>L.E.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>L.E.30</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>L.E.{summary.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-md border p-4 text-center text-gray-500">
                <p>Select a date range to view booking details</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter>
          <div className="w-full flex flex-col-reverse sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              className="bg-nest-primary hover:bg-nest-primary/90"
              disabled={!dateRange.from || !dateRange.to}
              onClick={() => {
                // Here you'd typically submit the booking
                // For now, just close the dialog
                alert("Booking submitted! (This is just a demo)");
                onClose();
              }}
            >
              Confirm Booking - L.E.{summary.total}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BookingCalendar;
