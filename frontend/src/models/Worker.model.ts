// Modelo de Worker para TypeScript (solo tipos, no implementación)
export interface Worker {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  trades: string[];
  experience: number;
  hourlyRate: number;
  description: string;
  location: {
    address: string;
    city: string;
    state: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  rating: number;
  totalReviews: number;
  isVerified: boolean;
  certifications: Array<{
    name: string;
    institution: string;
    issueDate: string;
  }>;
  portfolio: string[];
}

export default Worker;

