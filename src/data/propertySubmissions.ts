import { PropertySubmission } from "@/types/propertySubmission";

// Sample property submissions data
export const propertySubmissions: PropertySubmission[] = [
  {
    id: 101,
    name: "Luxury Beach Condo",
    description:
      "Stunning beachfront condo with panoramic ocean views, perfect for a relaxing getaway.",
    owner: {
      id: 2,
      name: "Jane Smith",
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    },
    images: [
      {
        id: 301,
        url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        alt: "Luxury condo exterior",
      },
      {
        id: 302,
        url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        alt: "Condo living room",
      },
    ],
    pricePerDay: 200,
    pricePerWeek: 1200,
    pricePerMonth: 4500,
    location: "Miami Beach, Florida",
    bedrooms: 2,
    bathrooms: 2,
    maxGuests: 4,
    facilities: [
      { id: 1, name: "WiFi", icon: "wifi" },
      { id: 2, name: "Pool", icon: "pool" },
      { id: 3, name: "Gym", icon: "dumbbell" },
    ],
    submittedAt: new Date("2023-05-15"),
    status: "pending",
  },
  {
    id: 102,
    name: "Mountain Retreat Cabin",
    description:
      "Cozy cabin nestled in the mountains, perfect for nature lovers and hikers.",
    owner: {
      id: 3,
      name: "Mark Johnson",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    },
    images: [
      {
        id: 401,
        url: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        alt: "Cabin exterior",
      },
      {
        id: 402,
        url: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
        alt: "Cabin interior",
      },
    ],
    pricePerDay: 150,
    pricePerWeek: 900,
    pricePerMonth: 3200,
    location: "Aspen, Colorado",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    facilities: [
      { id: 1, name: "WiFi", icon: "wifi" },
      { id: 4, name: "Fireplace", icon: "flame" },
      { id: 5, name: "Hiking Trails", icon: "map" },
    ],
    submittedAt: new Date("2023-05-20"),
    status: "pending",
  },
  {
    id: 103,
    name: "Downtown Loft Apartment",
    description:
      "Modern loft in the heart of the city, walking distance to restaurants and attractions.",
    owner: {
      id: 4,
      name: "Lisa Brown",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    },
    images: [
      {
        id: 501,
        url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        alt: "Loft living area",
      },
      {
        id: 502,
        url: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
        alt: "Loft kitchen",
      },
    ],
    pricePerDay: 175,
    pricePerWeek: 1050,
    pricePerMonth: 3800,
    location: "Chicago, Illinois",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 2,
    facilities: [
      { id: 1, name: "WiFi", icon: "wifi" },
      { id: 6, name: "Smart TV", icon: "tv" },
      { id: 7, name: "Washer/Dryer", icon: "loader" },
    ],
    submittedAt: new Date("2023-05-25"),
    status: "approved",
  },
];
