import type { Service as BackendService } from './Services';

export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: number;
}

/**
 * Convert backend Service to Booking Service format
 * Backend: { price: "₹800", duration: "60 min" }
 * Booking: { price: 800, duration: 60 }
 */
export function convertToBookingService(backendService: BackendService): Service {
  return {
    id: backendService.id,
    name: backendService.name,
    category: backendService.category.name,
    price: parsePrice(backendService.price),
    duration: parseDuration(backendService.duration),
  };
}

/**
 * Parse price string to number
 * Examples: "₹800" -> 800, "$45.99" -> 45.99, "800" -> 800
 */
export function parsePrice(priceString: string): number {
  const cleaned = priceString.replace(/[^0-9.]/g, '');
  return cleaned ? parseFloat(cleaned) : 0;
}

/**
 * Parse duration string to minutes
 * Examples: "60 min" -> 60, "1.5 hours" -> 90, "45" -> 45
 */
export function parseDuration(durationString: string): number {
  const match = durationString.match(/(\d+\.?\d*)/);
  if (!match) return 60; // Default to 60 minutes

  const value = parseFloat(match[1]);

  // Check if it's in hours
  if (durationString.toLowerCase().includes('hour')) {
    return Math.round(value * 60);
  }

  return Math.round(value);
}

export interface BookingInfo {
  address: string;
  apartment: string;
  phoneNumber: string;
  instructions: string;
}

export interface PaymentInfo {
  name: string;
  number: string;
  expiry: string;
  cvv: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface CalendarDate {
  day: number | string;
  date: string | null;
  available: boolean;
}

export interface Booking {
  id: string;
  serviceName: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  phoneNumber?: string;
  stylist: string;
  amount: number;
  status: 'Upcoming' | 'Completed' | 'Cancelled' | 'No-show';
  notes?: string;
}
