export interface  Service {
    id: number;
    name: string;
    category: string;
    price: number;
    duration: number;
  }
  
  export interface  BookingInfo {
    address: string;
    apartment: string;
    instructions: string;
  }
  
  export interface  PaymentInfo {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
  }
  
  export interface  PaymentMethod {
    id: string;
    name: string;
    icon: string;
  }
  
  export interface  CalendarDate {
    day: number | string;
    date: string | null;
    available: boolean;
  }
  
export  interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  stylist: string;
  amount: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}
