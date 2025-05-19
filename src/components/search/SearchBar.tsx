
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
  showPriceInputs?: boolean;
}

const SearchBar = ({ className = "", showPriceInputs = false }: SearchBarProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Initialize state from URL or with defaults
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');
  const [priceRange, setPriceRange] = useState([
    parseInt(searchParams.get('minPrice') || '0'), 
    parseInt(searchParams.get('maxPrice') || '5000')
  ]);

  const [minPrice, setMinPrice] = useState(priceRange[0].toString());
  const [maxPrice, setMaxPrice] = useState(priceRange[1].toString());
  
  // Update slider when inputs change
  useEffect(() => {
    const min = parseInt(minPrice) || 0;
    const max = parseInt(maxPrice) || 5000;
    
    if (min < max) {
      setPriceRange([min, max]);
    }
  }, [minPrice, maxPrice]);

  // Update inputs when slider changes
  useEffect(() => {
    setMinPrice(priceRange[0].toString());
    setMaxPrice(priceRange[1].toString());
  }, [priceRange]);
  
  const handleSearch = () => {
    navigate({
      pathname: "/properties",
      search: `?location=${location}&duration=${duration}&minPrice=${priceRange[0]}&maxPrice=${priceRange[1]}`
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };
  
  return (
    <div className={`bg-white/90 p-4 md:p-6 rounded-lg shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <select 
            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary text-gray-700 placeholder-gray-500" 
            aria-label="Select location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Where do you want to stay?</option>
            <option value="new-cairo">New Cairo</option>
            <option value="sheikh-zayed">Sheikh Zayed</option>
            <option value="cairo">Cairo</option>
            <option value="alexandria">Alexandria</option>
            <option value="gouna">Gouna</option>
            <option value="sahel">Sahel</option>
            <option value="ain-el-sokhna">Ain El Sokhna</option>
          </select>
        </div>
        <div className="flex-1">
          <select 
            className="w-full px-4 py-2.5 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-nest-primary text-gray-700 placeholder-gray-500" 
            aria-label="Select rental duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="">Rental Duration</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        {showPriceInputs && (
          <div className="flex-1">
            <div className="px-3 py-2 border border-gray-300 rounded bg-white">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Input
                    type="number"
                    min="0"
                    max="4900"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="w-24 text-sm p-1 h-8"
                    placeholder="Min"
                  />
                  <span className="mx-2">-</span>
                  <Input
                    type="number"
                    min="100"
                    max="5000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="w-24 text-sm p-1 h-8"
                    placeholder="Max"
                  />
                </div>
                <span className="text-xs text-gray-500">L.E.</span>
              </div>
              <Slider
                value={priceRange}
                min={0}
                max={5000}
                step={100}
                onValueChange={setPriceRange}
                className="py-2"
              />
            </div>
          </div>
        )}
        <Button 
          className="bg-nest-primary hover:bg-nest-primary/90"
          onClick={handleSearch}
        >
          <Search size={20} className="mr-2" /> Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
