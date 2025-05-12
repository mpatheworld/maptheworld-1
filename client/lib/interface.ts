export interface Section {
  _id: string;
  title: string;
  description: string;
  packages: Package[];
}

export interface Review {
  name: string;
  image: string;
  rating: number;
  review: string;
  date: string;
}

export interface Package {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  duration: string;
  highlights: string[];
  location: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: {
    day: string;
    title: string;
    description: string;
  }[];
  termsAndConditions: string;
  cancellationPolicy: string;
  bookingPolicy: string;
  refundPolicy: string;
  contactInfo: string;
  facilities: string[];
  similarPackages: Package[];
  reviews: Review[];
}