export interface ServiceCategory {
  _id?: string;
  name: string;
  description?: string;
  icon?: string;
}


export interface Service {
  _id: string;
  name: string;
  price: string;
  duration: string;
  img: string;
  description: string;
  features: string[];
  category: ServiceCategory;
}

export interface ServicePackage {
  _id: string;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular: boolean;
}