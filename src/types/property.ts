
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

export interface BookedDate {
  start: Date;
  end: Date;
}

export interface PropertyDocument {
  name: string;
  file: File;
  type: 'lease' | 'id';
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
  bookedDates?: BookedDate[]; // Dates that are already booked
  documents?: PropertyDocument[]; // Documents for verification
}

export interface PropertySubmission {
  name: string;
  description: string;
  owner: {
    id: number;
    name: string;
  };
  images: File[];
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  facilities: Omit<PropertyFacility, "id">[];
  documents: PropertyDocument[];
}
