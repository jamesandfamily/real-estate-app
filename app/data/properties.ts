export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: "house" | "apartment" | "condo" | "villa" | "penthouse";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  featured: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Modern Luxury Villa",
    price: 2850000,
    location: "Beverly Hills, CA",
    type: "villa",
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6500,
    description:
      "An architectural masterpiece nestled in the heart of Beverly Hills. This stunning contemporary villa features floor-to-ceiling windows, an infinity pool, and breathtaking city views. Every detail has been meticulously crafted to offer the ultimate in luxury living.",
    features: [
      "Smart home automation",
      "Chef's kitchen with premium appliances",
      "Home theater",
      "Wine cellar",
      "Private gym",
      "Spa and sauna",
    ],
    amenities: [
      "Infinity pool",
      "Outdoor kitchen",
      "Three-car garage",
      "Landscaped gardens",
      "Security system",
      "Elevator",
    ],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "Downtown Penthouse",
    price: 1950000,
    location: "Manhattan, NY",
    type: "penthouse",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 3200,
    description:
      "Experience urban sophistication in this stunning penthouse with panoramic skyline views. Located in the heart of Manhattan, this residence offers the perfect blend of modern luxury and city convenience.",
    features: [
      "Floor-to-ceiling windows",
      "Open-concept living",
      "Gourmet kitchen",
      "Master suite with walk-in closet",
      "Private terrace",
      "High-end finishes",
    ],
    amenities: [
      "Rooftop terrace",
      "Concierge service",
      "Fitness center",
      "Parking space",
      "24/7 security",
      "Storage unit",
    ],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: "3",
    title: "Coastal Contemporary",
    price: 3200000,
    location: "Malibu, CA",
    type: "house",
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4800,
    description:
      "Wake up to the sound of waves in this breathtaking beachfront property. This contemporary masterpiece offers direct beach access, stunning ocean views, and an open floor plan perfect for entertaining.",
    features: [
      "Direct beach access",
      "Ocean-view master suite",
      "Gourmet kitchen",
      "Home office",
      "Media room",
      "Smart home technology",
    ],
    amenities: ["Infinity pool", "Outdoor shower", "Fire pit", "Two-car garage", "Deck and patio", "Landscaped yard"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80",
    ],
    featured: true,
  },
  {
    id: "4",
    title: "Urban Loft Apartment",
    price: 875000,
    location: "Brooklyn, NY",
    type: "apartment",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1800,
    description:
      "Industrial chic meets modern comfort in this stunning loft conversion. High ceilings, exposed brick, and oversized windows create a unique living space in the heart of Brooklyn.",
    features: [
      "Exposed brick walls",
      "High ceilings",
      "Open floor plan",
      "Modern kitchen",
      "In-unit laundry",
      "Hardwood floors",
    ],
    amenities: ["Rooftop access", "Bike storage", "Package room", "Pet-friendly", "Near subway", "Restaurants nearby"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?w=1200&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "5",
    title: "Mountain Retreat",
    price: 1650000,
    location: "Aspen, CO",
    type: "house",
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    description:
      "Escape to this luxurious mountain retreat offering stunning views and year-round recreation. Perfect for those seeking tranquility and adventure in equal measure.",
    features: [
      "Mountain views",
      "Stone fireplace",
      "Vaulted ceilings",
      "Gourmet kitchen",
      "Heated floors",
      "Ski storage",
    ],
    amenities: ["Hot tub", "Fire pit", "Two-car garage", "Deck", "Near ski slopes", "Hiking trails"],
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=80",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=1200&q=80",
    ],
    featured: false,
  },
  {
    id: "6",
    title: "Luxury Condo",
    price: 1250000,
    location: "Miami, FL",
    type: "condo",
    bedrooms: 3,
    bathrooms: 3,
    sqft: 2400,
    description:
      "Experience Miami luxury living in this stunning waterfront condo. Enjoy resort-style amenities and breathtaking bay views from your private balcony.",
    features: [
      "Waterfront views",
      "Private balcony",
      "Modern kitchen",
      "Walk-in closets",
      "Marble bathrooms",
      "Smart home features",
    ],
    amenities: ["Pool and spa", "Fitness center", "Valet parking", "Concierge", "Marina access", "Beach club"],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200&q=80",
    ],
    featured: false,
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((property) => property.id === id);
};

export const getFeaturedProperties = (): Property[] => {
  return properties.filter((property) => property.featured);
};

export const filterProperties = (
  searchTerm: string,
  priceRange: [number, number],
  propertyType: string,
): Property[] => {
  return properties.filter((property) => {
    const matchesSearch =
      searchTerm === "" ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1];

    const matchesType = propertyType === "all" || property.type === propertyType;

    return matchesSearch && matchesPrice && matchesType;
  });
};
