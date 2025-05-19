
import { PropertyFacility, PropertyImage, BookedDate, PropertyDocument } from './property';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface PropertySubmission {
  id: number;
  name: string;
  description: string;
  owner: {
    id: number;
    name: string;
    avatar?: string;
  };
  images: File[] | PropertyImage[];
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  facilities: PropertyFacility[];
  documents?: PropertyDocument[];
  submittedAt: Date;
  status: ApprovalStatus;
  reviewNotes?: string;
}
