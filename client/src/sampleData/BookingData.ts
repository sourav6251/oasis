import type { Booking, Service } from "@/types/Booking";

export const BookingData:Service[]=[
    { id: '1', name: 'Haircut & Styling', category: 'Hair', price: 45, duration: 60 },
    { id: '2', name: 'Hair Coloring', category: 'Hair', price: 85, duration: 120 },
    { id: '3', name: 'Facial Treatment', category: 'Skincare', price: 75, duration: 60 },
    { id: '4', name: 'Manicure', category: 'Nails', price: 35, duration: 45 },
    { id: '5', name: 'Pedicure', category: 'Nails', price: 45, duration: 60 },
    { id: '6', name: 'Full Makeup', category: 'Makeup', price: 65, duration: 90 },
    { id: '7', name: 'Massage Therapy', category: 'Spa', price: 80, duration: 60 },
    { id: '8', name: 'Waxing', category: 'Skincare', price: 40, duration: 30 }
  ]

  export const BookingHistory:Booking[] = [
    {
      id: '1',
      serviceName: 'Haircut & Styling',
      date: '2023-10-15',
      time: '10:00 AM',
      location: 'Downtown Salon',
      address: '123 Main Street, New York, NY',
      stylist: 'Emma Wilson',
      amount: 45,
      status: 'Completed',
      notes: 'Requested layers and thinning'
    },
    {
      id: '2',
      serviceName: 'Hair Coloring',
      date: '2023-10-28',
      time: '2:30 PM',
      location: 'Home Service',
      address: '456 Park Ave, Apartment 3B, New York, NY',
      stylist: 'James Miller',
      amount: 100,
      status: 'Upcoming'
    },
    {
      id: '3',
      serviceName: 'Facial Treatment',
      date: '2023-09-20',
      time: '11:15 AM',
      location: 'Beauty Spa',
      address: '789 Beauty Lane, New York, NY',
      stylist: 'Sophia Chen',
      amount: 75,
      status: 'Completed'
    },
    {
      id: '4',
      serviceName: 'Manicure & Pedicure',
      date: '2023-09-05',
      time: '4:00 PM',
      location: 'Nail Studio',
      address: '321 Nail Street, New York, NY',
      stylist: 'Olivia Martinez',
      amount: 65,
      status: 'Cancelled',
      notes: 'Rescheduled due to illness'
    },
    {
      id: '5',
      serviceName: 'Massage Therapy',
      date: '2023-11-10',
      time: '3:00 PM',
      location: 'Wellness Center',
      address: '555 Relaxation Road, New York, NY',
      stylist: 'Michael Johnson',
      amount: 90,
      status: 'Upcoming'
    }
  ];