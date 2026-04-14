export interface ServiceCategory {
  id: number;
  name: string;
}

export interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  img: string;
  description: string;
  features: string[];
  category: ServiceCategory;
}

export interface ServicePackage {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular: boolean;
}