
import { Property, PropertyCategory } from "@/types/property";

// Helper function to create dates for the sample booked dates
const createDate = (year: number, month: number, day: number) => {
  return new Date(year, month - 1, day);
};

export const properties: Property[] = [
  {
    id: 1,
    name: "Seaside Retreat",
    description: "A beautiful beachfront property with stunning ocean views. Perfect for family vacations or romantic getaways. This luxury villa offers direct beach access and is located just minutes from local restaurants and attractions. Enjoy breathtaking sunsets from your private patio.",
    owner: {
      id: 101,
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    images: [
      {
        id: 1001,
        url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
        alt: "Seaside Retreat Living Room"
      },
      {
        id: 1002,
        url: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
        alt: "Seaside Retreat Exterior"
      },
      {
        id: 1003,
        url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
        alt: "Seaside Retreat Bedroom"
      }
    ],
    pricePerDay: 150,
    pricePerWeek: 950,
    pricePerMonth: 3200,
    location: "Miami Beach, Florida",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    categories: ['families', 'friends'],
    facilities: [
      { id: 1, name: "TV", icon: "tv" },
      { id: 2, name: "WiFi", icon: "wifi" },
      { id: 3, name: "Pool", icon: "bath" },
      { id: 4, name: "Billiards Table", icon: "table" }
    ],
    rating: 4.8,
    reviewCount: 24,
    bookedDates: [
      // Sample booked dates
      { start: createDate(2025, 5, 25), end: createDate(2025, 5, 30) },
      { start: createDate(2025, 6, 10), end: createDate(2025, 6, 15) }
    ]
  },
  {
    id: 2,
    name: "Mountain Cabin",
    description: "Cozy cabin nestled in the mountains with breathtaking views. This rustic yet modern retreat is the perfect place to disconnect and enjoy nature. Featuring a wood-burning fireplace, fully-equipped kitchen, and panoramic mountain views from the wraparound deck.",
    owner: {
      id: 102,
      name: "Michael Robinson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    images: [
      {
        id: 2001,
        url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
        alt: "Mountain Cabin Exterior"
      },
      {
        id: 2002,
        url: "https://images.unsplash.com/photo-1721322800607-8c38375eef04",
        alt: "Mountain Cabin Living Room"
      },
      {
        id: 2003,
        url: "https://images.unsplash.com/photo-1517840901100-8179e982acb7",
        alt: "Mountain Cabin Bedroom"
      }
    ],
    pricePerDay: 120,
    pricePerWeek: 750,
    pricePerMonth: 2800,
    location: "Aspen, Colorado",
    bedrooms: 2,
    bathrooms: 1,
    maxGuests: 4,
    categories: ['honeymoon', 'friends'],
    facilities: [
      { id: 1, name: "TV", icon: "tv" },
      { id: 2, name: "WiFi", icon: "wifi" }
    ],
    rating: 4.6,
    reviewCount: 18,
    bookedDates: [
      { start: createDate(2025, 5, 20), end: createDate(2025, 5, 23) },
      { start: createDate(2025, 6, 5), end: createDate(2025, 6, 18) }
    ]
  },
  {
    id: 3,
    name: "Urban Loft",
    description: "Modern loft in the heart of downtown. This stylish urban retreat features exposed brick walls, high ceilings, and floor-to-ceiling windows. Located in the city's vibrant cultural district, you'll be steps away from top restaurants, museums, and entertainment venues.",
    owner: {
      id: 103,
      name: "Emma Chen",
      avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
    },
    images: [
      {
        id: 3001,
        url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
        alt: "Urban Loft Interior"
      },
      {
        id: 3002,
        url: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
        alt: "Urban Loft Kitchen"
      },
      {
        id: 3003,
        url: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
        alt: "Urban Loft Bedroom"
      }
    ],
    pricePerDay: 200,
    pricePerWeek: 1300,
    pricePerMonth: 5000,
    location: "New York, NY",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    categories: ['work-from-home', 'honeymoon'],
    facilities: [
      { id: 1, name: "TV", icon: "tv" },
      { id: 2, name: "WiFi", icon: "wifi" },
      { id: 4, name: "Billiards Table", icon: "table" }
    ],
    rating: 4.9,
    reviewCount: 32,
    bookedDates: [
      { start: createDate(2025, 5, 28), end: createDate(2025, 6, 2) }
    ]
  }
];
