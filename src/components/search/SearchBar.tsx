
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PROPERTY_CATEGORIES, PropertyCategory } from "@/types/property";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SearchBarProps {
  className?: string;
}

const SearchBar = ({ className = "" }: SearchBarProps) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // Initialize state from URL or with defaults
  const [location, setLocation] = useState(searchParams.get('location') || '');
  const [duration, setDuration] = useState(searchParams.get('duration') || '');
  
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '0');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '5000');
  
  // Initialize categories from URL
  const initialCategories = searchParams.get('categories')?.split(',') || [];
  const [selectedCategories, setSelectedCategories] = useState<PropertyCategory[]>(
    initialCategories.filter((cat): cat is PropertyCategory => 
      PROPERTY_CATEGORIES.some(c => c.value === cat)
    )
  );
  
  const handleSearch = () => {
    navigate({
      pathname: "/properties",
      search: `?location=${location}&duration=${duration}&minPrice=${minPrice}&maxPrice=${maxPrice}${selectedCategories.length > 0 ? `&categories=${selectedCategories.join(',')}` : ''}`
    });
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };
  
  const toggleCategory = (category: PropertyCategory) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
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
        <div className="flex-1">
          <div className="px-3 py-2 border border-gray-300 rounded bg-white">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <Input
                  type="number"
                  min="0"
                  max="4900"
                  value={minPrice}
                  onChange={handleMinPriceChange}
                  className="w-24 text-sm p-1 h-8 text-gray-800"
                  placeholder="Min"
                />
                <span className="mx-2 text-gray-800">-</span>
                <Input
                  type="number"
                  min="100"
                  max="5000"
                  value={maxPrice}
                  onChange={handleMaxPriceChange}
                  className="w-24 text-sm p-1 h-8 text-gray-800"
                  placeholder="Max"
                />
              </div>
              <span className="text-xs text-gray-800 font-medium">L.E.</span>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex-1 text-gray-700 hover:text-gray-900 border-gray-300 hover:bg-gray-100">
                <Tag className="mr-2 h-4 w-4" />
                <span>Categories</span>
                {selectedCategories.length > 0 && (
                  <span className="ml-1 rounded-full bg-slate-900 px-1.5 text-xs text-white">
                    {selectedCategories.length}
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56 p-3" align="start">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-gray-900">Property Type</h4>
                <p className="text-sm text-gray-700">
                  Select property categories
                </p>
                <div className="space-y-2 pt-2">
                  {PROPERTY_CATEGORIES.map(category => (
                    <div key={category.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`category-${category.value}`}
                        checked={selectedCategories.includes(category.value)}
                        onCheckedChange={() => toggleCategory(category.value)}
                      />
                      <label 
                        htmlFor={`category-${category.value}`}
                        className="text-sm font-medium leading-none text-gray-800 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button 
            className="bg-nest-primary hover:bg-nest-primary/90"
            onClick={handleSearch}
          >
            <Search size={20} className="mr-2" /> Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
