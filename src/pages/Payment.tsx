import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CreditCard, Calendar, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { useAuth } from "@/hooks/useAuth"; // adjust the path if needed

interface BookingDetails {
  property: {
    id: string;
    name: string;
    location: string;
    image?: string;
  };
  checkInDate: string;
  checkOutDate: string;
  totalAmount: number;
  days: number;
}

const Payment = () => {
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null,
  );
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const storedBooking = localStorage.getItem("pendingBooking");
    if (storedBooking) {
      setBookingDetails(JSON.parse(storedBooking));
    } else {
      // If no booking data, redirect to properties
      navigate("/properties");
    }
  }, [navigate]);

  const handlePayment = async () => {
    if (!bookingDetails) return;

    setIsProcessing(true);
    if (!user?.id) {
      toast.error("User not logged in.");
      return;
    }

    const userId = user.id;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/bookings/paid`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            property: bookingDetails.property.id,
            user: userId,
            checkInDate: bookingDetails.checkInDate,
            checkOutDate: bookingDetails.checkOutDate,
            totalAmount: bookingDetails.totalAmount,
          }),
        },
      );

      if (!res.ok) throw new Error("Booking creation failed");

      toast.success("Payment successful and booking confirmed!");
      localStorage.removeItem("pendingBooking");
      navigate("/my-bookings");
    } catch (err) {
      toast.error("Failed to confirm booking. Try again.");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (!bookingDetails) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col auth-section">
      <Navigation />

      <main className="flex-grow section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="mb-4 text-white hover:bg-white/10"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back
            </Button>

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Complete Your Booking
            </h1>
            <p className="text-white/80">
              Review your booking details and enter payment information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MapPin className="mr-2" size={20} />
                    Booking Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {bookingDetails.property.name}
                    </h3>
                    <p className="text-gray-600">
                      {bookingDetails.property.location}
                    </p>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-in</span>
                      <span className="font-medium">
                        {format(
                          new Date(bookingDetails.checkInDate),
                          "MMM dd, yyyy",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Check-out</span>
                      <span className="font-medium">
                        {format(
                          new Date(bookingDetails.checkOutDate),
                          "MMM dd, yyyy",
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-medium">
                        {bookingDetails.days} days
                      </span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Base rate</span>
                      <span>L.E.{bookingDetails.totalAmount - 80}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>L.E.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>L.E.30</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>L.E.{bookingDetails.totalAmount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CreditCard className="mr-2" size={20} />
                    Payment Details
                  </CardTitle>
                  <CardDescription>
                    Enter your payment information to complete the booking
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          type="text"
                          value={expiryDate}
                          onChange={(e) =>
                            setExpiryDate(formatExpiry(e.target.value))
                          }
                          placeholder="MM/YY"
                          maxLength={5}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          value={cvv}
                          onChange={(e) =>
                            setCvv(
                              e.target.value.replace(/\D/g, "").slice(0, 3),
                            )
                          }
                          placeholder="123"
                          maxLength={3}
                          required
                        />
                      </div>
                    </div>

                    <div className="pt-6">
                      <Button
                        type="submit"
                        className="w-full bg-nest-primary hover:bg-nest-primary/90"
                        onClick={handlePayment}
                        disabled={isProcessing}
                      >
                        {isProcessing
                          ? "Processing..."
                          : `Pay L.E.${bookingDetails.totalAmount}`}
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-600 pt-2">
                      <p>Your payment information is secure and encrypted</p>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
