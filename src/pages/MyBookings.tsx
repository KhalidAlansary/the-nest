
import React, { useState } from 'react';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Booking, ServiceRequestType } from '@/types/booking';
import { bookings } from '@/data/bookings';
import { Calendar, Home, Wrench, Brush, ShowerHead } from 'lucide-react';

const MyBookings = () => {
  const { user } = useAuth();
  const [serviceDialogOpen, setServiceDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [serviceType, setServiceType] = useState<ServiceRequestType>('cleaning');
  const [serviceDescription, setServiceDescription] = useState('');

  // In a real app, we would filter bookings by guest ID
  // For demo purposes, we'll just show all bookings and pretend they belong to the current user
  const myBookings = bookings;

  const upcomingBookings = myBookings.filter(
    booking => booking.status === 'confirmed' && new Date(booking.checkInDate) > new Date()
  );
  
  const activeBookings = myBookings.filter(
    booking => booking.status === 'confirmed' && 
    new Date(booking.checkInDate) <= new Date() &&
    new Date(booking.checkOutDate) >= new Date()
  );
  
  const pastBookings = myBookings.filter(
    booking => booking.status === 'completed' || 
    (booking.status === 'confirmed' && new Date(booking.checkOutDate) < new Date())
  );

  const handleServiceRequest = (booking: Booking) => {
    setSelectedBooking(booking);
    setServiceDialogOpen(true);
  };

  const handleServiceSubmit = () => {
    // In a real app, this would send the request to the backend
    toast.success("Service request submitted successfully!");
    setServiceDialogOpen(false);
    setServiceType('cleaning');
    setServiceDescription('');
  };

  const getServiceIcon = (type: ServiceRequestType) => {
    switch (type) {
      case 'cleaning':
        return <Brush className="h-4 w-4" />;
      case 'maintenance':
        return <Wrench className="h-4 w-4" />;
      case 'supplies':
        return <ShowerHead className="h-4 w-4" />;
      default:
        return <Home className="h-4 w-4" />;
    }
  };

  // Function to determine what actions are available based on booking status
  const canRequestService = (booking: Booking) => {
    return booking.status === 'confirmed' && 
      new Date(booking.checkInDate) <= new Date() &&
      new Date(booking.checkOutDate) >= new Date();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow section-padding py-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-nest-dark mb-4">My Bookings</h1>
            <p className="text-gray-600">
              View your booking history and request services for active stays.
            </p>
          </div>

          {/* Booking Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Upcoming Stays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-nest-primary" />
                  <p className="text-3xl font-bold">{upcomingBookings.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Stays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Home className="mr-2 text-green-600" />
                  <p className="text-3xl font-bold text-green-600">{activeBookings.length}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Past Stays</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="mr-2 text-gray-600" />
                  <p className="text-3xl font-bold text-gray-600">{pastBookings.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Bookings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-nest-dark mb-4">Active Stays</h2>
            {activeBookings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeBookings.map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    {booking.property.images && booking.property.images.length > 0 && (
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={booking.property.images[0].url} 
                          alt={booking.property.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle>{booking.property.name}</CardTitle>
                      <CardDescription>{booking.property.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Check-in</span>
                        <span className="font-medium">{format(booking.checkInDate, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Check-out</span>
                        <span className="font-medium">{format(booking.checkOutDate, 'MMM dd, yyyy')}</span>
                      </div>
                      <div className="pt-3">
                        <Button 
                          className="w-full bg-nest-primary hover:bg-nest-primary/90"
                          onClick={() => handleServiceRequest(booking)}
                        >
                          <Wrench className="mr-2 h-4 w-4" />
                          Request Service
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">You don't have any active stays right now.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Upcoming Bookings */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-nest-dark mb-4">Upcoming Bookings</h2>
            {upcomingBookings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.property.name}</TableCell>
                      <TableCell>{format(booking.checkInDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(booking.checkOutDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>L.E.{booking.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">You don't have any upcoming bookings.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Past Bookings */}
          <div>
            <h2 className="text-xl font-semibold text-nest-dark mb-4">Past Bookings</h2>
            {pastBookings.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Property</TableHead>
                    <TableHead>Check In</TableHead>
                    <TableHead>Check Out</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell className="font-medium">{booking.property.name}</TableCell>
                      <TableCell>{format(booking.checkInDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>{format(booking.checkOutDate, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge className="bg-gray-100 text-gray-800">
                          {booking.status === 'confirmed' ? 'Completed' : booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>L.E.{booking.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <Card>
                <CardContent className="py-8 text-center">
                  <p className="text-gray-500">You don't have any past bookings.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      {/* Service Request Dialog */}
      <Dialog open={serviceDialogOpen} onOpenChange={setServiceDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Request Service</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Property</p>
              <p className="font-medium">{selectedBooking?.property.name}</p>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Service Type</p>
              <Select value={serviceType} onValueChange={(value) => setServiceType(value as ServiceRequestType)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cleaning">
                    <div className="flex items-center">
                      <Brush className="mr-2 h-4 w-4" />
                      <span>Cleaning</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="maintenance">
                    <div className="flex items-center">
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>Maintenance</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="supplies">
                    <div className="flex items-center">
                      <ShowerHead className="mr-2 h-4 w-4" />
                      <span>Additional Supplies</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="other">
                    <div className="flex items-center">
                      <Home className="mr-2 h-4 w-4" />
                      <span>Other</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Description</p>
              <Textarea 
                placeholder="Please describe what you need..."
                value={serviceDescription}
                onChange={(e) => setServiceDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setServiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleServiceSubmit} disabled={!serviceDescription.trim()}>Submit Request</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default MyBookings;
