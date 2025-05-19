
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary">
                <option value="">Location</option>
                <option value="new-york">New York</option>
                <option value="los-angeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="miami">Miami</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary">
                <option value="">Duration</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex-1">
              <select className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary">
                <option value="">Price Range</option>
                <option value="budget">$0 - $1,000</option>
                <option value="mid">$1,000 - $3,000</option>
                <option value="luxury">$3,000+</option>
              </select>
            </div>
            <Button className="bg-nest-primary hover:bg-nest-primary/90">
              <Search size={20} className="mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
