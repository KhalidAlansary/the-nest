import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Bed, Bath, Users, DollarSign, Calendar, ArrowLeft, Star, Tv, Wifi, Table } from "lucide-react";
import { properties } from '@/data/properties';
import { Property } from '@/types/property';
import BookingCalendar from '@/components/booking/BookingCalendar';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'day' | 'week' | 'month'>('day');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const property = properties.find(p => p.id === Number(id)) as Property;
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
            <p className="mb-6">The property you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/properties')}>
              View All Properties
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getPrice = () => {
    switch (selectedTab) {
      case 'day':
        return `L.E. ${property.pricePerDay} / night`;
      case 'week':
        return `L.E. ${property.pricePerWeek} / week`;
      case 'month':
        return `L.E. ${property.pricePerMonth} / month`;
    }
  };

  // Helper to render the correct icon based on the facility
  const renderFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'tv':
        return <Tv size={20} />;
      case 'wifi':
        return <Wifi size={20} />;
      case 'bath':
        return <Bath size={20} />;
      case 'table':
        return <Table size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow section-padding">
        <div className="container mx-auto">
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-4" 
              onClick={() => navigate('/properties')}
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Properties
            </Button>
            
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-nest-dark">{property.name}</h1>
                <div className="flex items-center mt-2">
                  <p className="text-gray-600">{property.location}</p>
                  <div className="flex items-center ml-4 text-amber-500">
                    <Star size={18} fill="currentColor" />
                    <span className="ml-1 font-medium">{property.rating}</span>
                    <span className="ml-1 text-gray-600">({property.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Image Carousel */}
          <div className="mb-10">
            <Carousel className="w-full">
              <CarouselContent>
                {property.images.map((image) => (
                  <CarouselItem key={image.id}>
                    <div className="overflow-hidden rounded-lg">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-auto md:h-[500px] object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2 text-nest-dark">About this property</h2>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Bed size={20} className="mr-2" />
                    <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Bath size={20} className="mr-2" />
                    <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Users size={20} className="mr-2" />
                    <span>Up to {property.maxGuests} guests</span>
                  </div>
                </div>
                <p className="text-gray-700 whitespace-pre-line">
                  {property.description}
                </p>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-nest-dark">Amenities & Facilities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.facilities.map((facility) => (
                    <div key={facility.id} className="flex items-center">
                      <div className="mr-3 text-nest-primary">
                        {renderFacilityIcon(facility.icon)}
                      </div>
                      <span className="text-gray-700">{facility.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-nest-dark">Hosted by</h2>
                <div className="flex items-center">
                  {property.owner.avatar && (
                    <img 
                      src={property.owner.avatar} 
                      alt={property.owner.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                  )}
                  <div>
                    <h3 className="font-medium text-lg">{property.owner.name}</h3>
                    <p className="text-gray-600">Property Host</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-20">
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-bold text-nest-dark">Pricing Options</h3>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <Button 
                      variant={selectedTab === 'day' ? 'default' : 'outline'}
                      className={selectedTab === 'day' ? 'bg-nest-primary hover:bg-nest-primary/90' : ''}
                      onClick={() => setSelectedTab('day')}
                    >
                      Daily
                    </Button>
                    <Button 
                      variant={selectedTab === 'week' ? 'default' : 'outline'}
                      className={selectedTab === 'week' ? 'bg-nest-primary hover:bg-nest-primary/90' : ''}
                      onClick={() => setSelectedTab('week')}
                    >
                      Weekly
                    </Button>
                    <Button 
                      variant={selectedTab === 'month' ? 'default' : 'outline'}
                      className={selectedTab === 'month' ? 'bg-nest-primary hover:bg-nest-primary/90' : ''}
                      onClick={() => setSelectedTab('month')}
                    >
                      Monthly
                    </Button>
                  </div>
                  
                  <div className="flex items-baseline mb-4">
                    <div className="text-3xl font-bold text-nest-primary flex items-center">
                      <span>
                        L.E.{selectedTab === 'day' 
                          ? property.pricePerDay
                          : selectedTab === 'week'
                          ? property.pricePerWeek
                          : property.pricePerMonth}
                      </span>
                    </div>
                    <div className="ml-2 text-gray-600">
                      / {selectedTab === 'day' ? 'night' : selectedTab}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 mb-6">
                    <div className="flex justify-between py-1">
                      <span>Base rate</span>
                      <span>{getPrice().replace('$', 'L.E.')}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Cleaning fee</span>
                      <span>L.E.50</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Service fee</span>
                      <span>L.E.30</span>
                    </div>
                    <div className="border-t mt-2 pt-2 flex justify-between font-medium text-nest-dark">
                      <span>Total</span>
                      <span>
                        L.E.{selectedTab === 'day' 
                          ? property.pricePerDay + 80
                          : selectedTab === 'week'
                          ? property.pricePerWeek + 80
                          : property.pricePerMonth + 80}
                      </span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-nest-primary hover:bg-nest-primary/90 mb-4"
                  onClick={() => setIsBookingOpen(true)}
                >
                  <Calendar className="mr-2" size={18} />
                  Book Now
                </Button>
                
                <div className="text-center text-sm text-gray-600">
                  <p>You won't be charged yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Booking Calendar Dialog */}
      <BookingCalendar 
        property={property}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
