
export interface PropertyFacility {
  id: number;
  name: string;
  icon: string; // name of the Lucide icon
}

export interface PropertyImage {
  id: number;
  url: string;
  alt: string;
}

export interface Property {
  id: number;
  name: string;
  description: string;
  owner: {
    id: number;
    name: string;
    avatar?: string;
  };
  images: PropertyImage[];
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  facilities: PropertyFacility[];
  rating: number;
  reviewCount: number;
}
