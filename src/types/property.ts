
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

export type PropertyCategory = 'families' | 'friends' | 'honeymoon' | 'work-from-home';

export const PROPERTY_CATEGORIES: { value: PropertyCategory; label: string; icon: string }[] = [
  { value: 'families', label: 'Families', icon: 'users' },
  { value: 'friends', label: 'Friends', icon: 'users' },
  { value: 'honeymoon', label: 'Honeymoon', icon: 'heart' },
  { value: 'work-from-home', label: 'Work From Home', icon: 'briefcase' }
];

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
  categories: PropertyCategory[];
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
  categories: PropertyCategory[];
  documents: PropertyDocument[];
}

// Furnish Your Home types
export interface FurnishRequest {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  squareMeters: number;
  budget: number;
  notes: string;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed' | 'cancelled';
  submittedAt: Date;
}

export interface FurnishRequestSubmission {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyType: string;
  squareMeters: number;
  budget: number;
  notes: string;
}
