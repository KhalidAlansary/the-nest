import React from 'react';
import { Button } from '@/components/ui/button';
import { MapPin, Bed, Bath, Calendar, Star } from 'lucide-react';

// Sample property data
const properties = [
  {
    id: 1,
    title: 'Luxury Downtown Apartment',
    location: 'New York City, NY',
    price: '$250',
    duration: 'per day',
    bedrooms: 2,
    bathrooms: 2,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    title: 'Beachfront Villa with Pool',
    location: 'Miami Beach, FL',
    price: '$1,800',
    duration: 'per week',
    bedrooms: 4,
    bathrooms: 3,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 3,
    title: 'Modern Urban Loft',
    location: 'Chicago, IL',
    price: '$3,200',
    duration: 'per month',
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDV8fGxvZnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60'
  }
];

const FeaturedProperties = () => {
  return (
    <section className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our hand-picked selection of premium properties available for rent on a daily, weekly, or monthly basis.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <div key={property.id} className="property-card bg-white rounded-lg overflow-hidden shadow-md">
              {/* Property Image */}
              <div className="h-56 overflow-hidden">
                <img 
                  src={property.image} 
                  alt={property.title} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              {/* Property Details */}
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <MapPin size={16} className="text-nest-primary mr-1" />
                  <span className="text-gray-600 text-sm">{property.location}</span>
                  <div className="ml-auto flex items-center">
                    <Star size={16} className="text-yellow-500" fill="currentColor" />
                    <span className="text-gray-700 font-medium">{property.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{property.title}</h3>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center">
                    <Bed size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-700">{property.bedrooms} Bed</span>
                  </div>
                  <div className="flex items-center">
                    <Bath size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-700">{property.bathrooms} Bath</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-1" />
                    <span className="text-gray-700">{property.duration.replace('per ', '')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-nest-accent">{property.price}</span>
                    <span className="text-gray-600 text-sm"> {property.duration}</span>
                  </div>
                  <Button variant="outline" className="border-nest-primary text-nest-primary hover:bg-nest-primary hover:text-white">
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-nest-primary hover:bg-nest-primary/90">
            Browse All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
