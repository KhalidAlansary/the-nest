
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SearchBar from '@/components/search/SearchBar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Bed, Bath, Users, DollarSign, Star, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { properties } from '@/data/properties';
import { PROPERTY_CATEGORIES } from '@/types/property';

const Properties = () => {
  const [searchParams] = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);
  
  // Filter properties based on search params
  useEffect(() => {
    const location = searchParams.get('location');
    const duration = searchParams.get('duration');
    const minPrice = parseInt(searchParams.get('minPrice') || '0');
    const maxPrice = parseInt(searchParams.get('maxPrice') || '5000');
    const categoriesParam = searchParams.get('categories');
    const categories = categoriesParam ? categoriesParam.split(',') : [];
    
    const filtered = properties.filter(property => {
      // Filter by location if specified
      if (location && location !== '' && property.location.toLowerCase().indexOf(location.toLowerCase()) === -1) {
        return false;
      }
      
      // Filter by price range
      if (property.pricePerDay < minPrice || property.pricePerDay > maxPrice) {
        return false;
      }
      
      // Filter by categories if specified
      if (categories.length > 0) {
        const hasMatchingCategory = categories.some(category => 
          property.categories.includes(category as any)
        );
        if (!hasMatchingCategory) return false;
      }
      
      return true;
    });
    
    setFilteredProperties(filtered);
  }, [searchParams]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow section-padding">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-nest-dark mb-4">Find Your Perfect Nest</h1>
            <p className="text-gray-600 max-w-3xl mx-auto mb-8">
              Browse our curated selection of premium properties designed for short-term and extended stays.
            </p>
            <SearchBar className="max-w-4xl mx-auto mb-8" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <Link 
                  to={`/properties/${property.id}`} 
                  key={property.id}
                  className="property-card focus:outline-none focus:ring-2 focus:ring-nest-primary focus:ring-offset-2 rounded-lg"
                >
                  <Card className="h-full flex flex-col">
                    <div className="overflow-hidden rounded-t-lg">
                      <AspectRatio ratio={16 / 9}>
                        <img
                          src={property.images[0].url}
                          alt={property.images[0].alt}
                          className="object-cover w-full h-full transition-all hover:scale-105 duration-300"
                        />
                      </AspectRatio>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl font-bold text-nest-dark">
                          {property.name}
                        </CardTitle>
                        <div className="flex items-center text-amber-500">
                          <Star size={16} fill="currentColor" />
                          <span className="ml-1 text-sm font-medium">{property.rating}</span>
                        </div>
                      </div>
                      <CardDescription className="text-gray-500">
                        {property.location}
                      </CardDescription>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {property.categories.map(category => {
                          const categoryInfo = PROPERTY_CATEGORIES.find(c => c.value === category);
                          return (
                            <Badge key={category} variant="outline" className="text-xs">
                              <Tag className="mr-1 h-3 w-3" />
                              {categoryInfo?.label || category}
                            </Badge>
                          );
                        })}
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pb-2 flex-grow">
                      <p className="text-gray-700 line-clamp-2 mb-4">
                        {property.description}
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 text-sm text-gray-600 mb-4">
                        <div className="flex items-center">
                          <Bed size={16} className="mr-1" />
                          <span>{property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}</span>
                        </div>
                        <div className="flex items-center">
                          <Bath size={16} className="mr-1" />
                          <span>{property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}</span>
                        </div>
                        <div className="flex items-center">
                          <Users size={16} className="mr-1" />
                          <span>Max {property.maxGuests}</span>
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="pt-2 border-t">
                      <div className="w-full flex justify-between items-center">
                        <div className="flex items-center text-nest-primary font-bold">
                          <DollarSign size={18} />
                          <span className="text-xl">{property.pricePerDay}</span>
                          <span className="text-sm text-gray-500 font-normal ml-1">/ night</span>
                        </div>
                        <Button size="sm" className="bg-nest-primary hover:bg-nest-primary/90">
                          View Details
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <p className="text-lg text-gray-600">No properties match your search criteria. Please try different filters.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
