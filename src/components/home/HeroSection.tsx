
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="hero-section flex items-center justify-center text-white">
      <div className="container mx-auto px-4 text-center max-w-5xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-fade-in">
          Find Your Perfect <span className="text-nest-primary">Nest</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-slide-up">
          Discover the perfect rental property for your daily, weekly, or monthly stay. Your comfort is our priority.
        </p>
        
        {/* Search Form */}
        <div className="bg-white/90 p-4 md:p-6 rounded-lg shadow-lg max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary text-gray-700 placeholder-gray-500" aria-label="Select location">
                <option value="">Where do you want to stay?</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="miami">Miami</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary text-gray-700 placeholder-gray-500" aria-label="Select rental duration">
                <option value="">Rental Duration</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary text-gray-700 placeholder-gray-500" aria-label="Select price range">
                <option value="">Budget (L.E.)</option>
                <option value="budget">L.E.0 - L.E.1,000</option>
                <option value="mid">L.E.1,000 - L.E.3,000</option>
                <option value="luxury">L.E.3,000+</option>
              </select>
            </div>
            <Button className="bg-nest-primary hover:bg-nest-primary/90" asChild>
              <Link to="/properties">
                <Search size={20} className="mr-2" /> Search
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
