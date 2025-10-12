import type { Service, ServicePackage } from "@/types/Services";

export const ServiceData:Service[]=[
    {
      id: 1,
      name: 'Haircut & Styling',
      price: '₹800',
      duration: '45 min',
      img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Expert haircut tailored to your face shape and personal style, including consultation and styling.',
      features: ['Professional consultation', 'Precision cutting', 'Blow-dry styling', 'Product advice'],
      category: 'Hair'
    },
    {
      id: 2,
      name: 'Hair Spa',
      price: '₹1200',
      duration: '60 min',
      img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Revitalizing hair treatment that includes deep conditioning, scalp massage, and nourishment.',
      features: ['Deep conditioning', 'Scalp massage', 'Hair nourishment', 'Relaxing experience'],
      category: 'Hair'
    },
    {
      id: 3,
      name: 'Hair Coloring',
      price: '₹1500+',
      duration: '90 min',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Professional hair coloring services including highlights, balayage, and full color.',
      features: ['Color consultation', 'Premium products', 'Precision application', 'Aftercare advice'],
      category: 'Hair'
    },
    {
      id: 4,
      name: 'Facial Glow',
      price: '₹1500',
      duration: '75 min',
      img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Deep cleansing, exfoliation, extraction, and hydration for radiant, glowing skin.',
      features: ['Deep cleansing', 'Exfoliation', 'Extraction', 'Hydration mask'],
      category: 'Skincare'
    },
    {
      id: 5,
      name: 'Acne Treatment',
      price: '₹1800',
      duration: '90 min',
      img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Specialized treatment to reduce acne, inflammation, and prevent future breakouts.',
      features: ['Acne analysis', 'Medicated treatment', 'Soothing mask', 'Aftercare plan'],
      category: 'Skincare'
    },
    {
      id: 6,
      name: 'Manicure & Pedicure',
      price: '₹1000',
      duration: '50 min',
      img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Complete nail care including shaping, cuticle treatment, massage, and polish.',
      features: ['Nail shaping', 'Cuticle care', 'Hand/foot massage', 'Polish application'],
      category: 'Nails'
    },
    {
      id: 7,
      name: 'Gel Nails',
      price: '₹1200',
      duration: '60 min',
      img: 'https://images.unsplash.com/photo-1607779044265-60d8017d3c48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Long-lasting gel manicure with a glossy finish that lasts for weeks.',
      features: ['Nail prep', 'Gel application', 'UV curing', 'Long-lasting finish'],
      category: 'Nails'
    },
    {
      id: 8,
      name: 'Bridal Makeup',
      price: '₹8000',
      duration: '3 hrs',
      img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Flawless, long-lasting makeup application for your special day with trial session.',
      features: ['Trial session', 'Long-lasting formula', 'Professional products', 'Touch-up kit'],
      category: 'Makeup'
    },
    {
      id: 9,
      name: 'Evening Makeup',
      price: '₹2500',
      duration: '60 min',
      img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Glamorous makeup perfect for special events, parties, or a night out.',
      features: ['Skin preparation', 'Customized look', 'Photo-ready finish', 'Setting spray'],
      category: 'Makeup'
    },
    {
      id: 10,
      name: 'Full Body Massage',
      price: '₹2500',
      duration: '90 min',
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Therapeutic full-body massage to relieve tension, reduce stress, and promote relaxation.',
      features: ['Full body massage', 'Aromatherapy oils', 'Stress relief', 'Muscle relaxation'],
      category: 'Spa'
    },
    {
      id: 11,
      name: 'Aromatherapy Session',
      price: '₹1800',
      duration: '60 min',
      img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      description: 'Relaxing massage using essential oils to enhance physical and emotional well-being.',
      features: ['Essential oil selection', 'Therapeutic massage', 'Mood enhancement', 'Deep relaxation'],
      category: 'Spa'
    }
];

export const ServicePackageData:ServicePackage[]= [
    {
      id: 1,
      name: 'Bridal Glow Package',
      price: '₹12,000',
      originalPrice: '₹15,000',
      features: [
        'Bridal Makeup',
        'Hair Styling',
        'Facial Glow',
        'Manicure & Pedicure',
        'Pre-wedding Consultation'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Relax & Refresh',
      price: '₹4,500',
      originalPrice: '₹5,800',
      features: [
        'Full Body Massage',
        'Signature Facial',
        'Manicure & Pedicure',
        'Aromatherapy',
        'Complimentary Drink'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Complete Beauty',
      price: '₹6,200',
      originalPrice: '₹7,500',
      features: [
        'Haircut & Styling',
        'Facial Treatment',
        'Manicure & Pedicure',
        'Eyebrow Shaping',
        'Makeup Application'
      ],
      popular: false
    }
  ];