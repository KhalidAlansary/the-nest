
import React from 'react';
import SearchBar from '@/components/search/SearchBar';

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
        
        <SearchBar className="max-w-4xl mx-auto animate-slide-up" />
      </div>
    </div>
  );
};

export default HeroSection;
