import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './src/models/Service.js';
import ServicePackage from './src/models/ServicePackage.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const services = [
  // ── HAIR ───────────────────────────────────────────────
  { name: 'Luxury Haircut & Style',        price: '₹999',    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    description: 'A personalised cut and blowout tailored to your face shape and lifestyle.',
    features: ['Consultation included','Scalp massage','Blow-dry & finish','Style products'],
    category: { name: 'Hair' } },
  { name: 'Keratin Smoothing Treatment',   price: '₹3,499',  duration: '120 min',
    img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    description: 'Eliminate frizz and add long-lasting shine with professional keratin.',
    features: ['Lasts 3–5 months','Frizz-free finish','Deep conditioning','Heat protection'],
    category: { name: 'Hair' } },
  { name: 'Balayage Colouring',            price: '₹4,999',  duration: '150 min',
    img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
    description: 'Hand-painted highlights for a natural, sun-kissed look.',
    features: ['Custom colour blend','Toner included','Glossing finish','Aftercare advice'],
    category: { name: 'Hair' } },
  // ── SKIN ───────────────────────────────────────────────
  { name: 'Deep Cleansing Facial',         price: '₹1,499',  duration: '75 min',
    img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    description: 'Thorough cleanse, exfoliation and extraction for radiant skin.',
    features: ['Skin analysis','Steam & extraction','Hydrating mask','SPF moisturiser'],
    category: { name: 'Skin' } },
  { name: 'Anti-Ageing Glow Treatment',    price: '₹2,999',  duration: '90 min',
    img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
    description: 'Targets fine lines with vitamin-C serums, collagen masks & LED therapy.',
    features: ['LED light therapy','Collagen infusion','Eye treatment','Firming massage'],
    category: { name: 'Skin' } },
  // ── NAILS ──────────────────────────────────────────────
  { name: 'Gel Manicure',                  price: '₹699',    duration: '45 min',
    img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    description: 'Long-lasting gel polish with cuticle care and hand massage.',
    features: ['Shape & buff','Cuticle treatment','Gel colour of choice','Chip-free 3 weeks'],
    category: { name: 'Nails' } },
  { name: 'Luxury Spa Pedicure',           price: '₹999',    duration: '60 min',
    img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
    description: 'Foot soak, scrub, callus removal and gel polish for pampered feet.',
    features: ['Foot soak','Callus removal','Paraffin wax','Gel polish'],
    category: { name: 'Nails' } },
  // ── MAKEUP ─────────────────────────────────────────────
  { name: 'Bridal Makeup',                 price: '₹7,999',  duration: '120 min',
    img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    description: 'Flawless, long-wear bridal look using HD airbrush and luxury brands.',
    features: ['Trial session','HD airbrush','Lashes included','Touch-up kit'],
    category: { name: 'Makeup' } },
  { name: 'Party Glam Makeup',             price: '₹2,499',  duration: '60 min',
    img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
    description: 'Glamorous, camera-ready evening look tailored to your outfit.',
    features: ['Skin-prep included','Setting spray','Lashes optional','Lasts 10+ hours'],
    category: { name: 'Makeup' } },
  // ── WELLNESS ───────────────────────────────────────────
  { name: 'Aromatherapy Massage',         price: '₹1,799',  duration: '60 min',
    img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    description: 'Full-body relaxation massage with warm essential oils.',
    features: ['Oil consultation','Hot towel finish','Stress relief','Mood-lifting'],
    category: { name: 'Wellness' } },
  { name: 'Japanese Head Spa',            price: '₹1,299',  duration: '45 min',
    img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    description: 'Deep scalp cleanse, oil treatment and pressure-point massage.',
    features: ['Scalp analysis','Treatment oils','Pressure massage','Scalp detox'],
    category: { name: 'Wellness' } },
  { name: 'Body Polishing Ritual',        price: '₹2,199',  duration: '75 min',
    img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    description: 'Full-body sugar scrub followed by a nourishing wrap for glowing skin.',
    features: ['Exfoliation','Nourishing body wrap','Hydrating butter','Soft glow'],
    category: { name: 'Wellness' } },
];

const packages = [
  { name: 'Glow Starter',       price: '₹2,499',  originalPrice: '₹3,200',  popular: false,
    features: ['Deep Cleansing Facial','Gel Manicure','Eyebrow Shaping','Hair Wash & Blow-dry'] },
  { name: 'Bridal Bliss',        price: '₹12,999', originalPrice: '₹18,000', popular: true,
    features: ['Bridal HD Makeup (trial + event)','Keratin Smoothing Treatment','Luxury Spa Pedicure','Gel Manicure','Anti-Ageing Facial','Aromatherapy Massage'] },
  { name: 'Relaxation Retreat',  price: '₹4,199',  originalPrice: '₹5,500',  popular: false,
    features: ['Aromatherapy Massage (60 min)','Japanese Head Spa','Body Polishing Ritual','Anti-Ageing Glow Facial'] },
];

const seedData = async () => {
  try {
    await Service.deleteMany();
    await ServicePackage.deleteMany();

    await Service.insertMany(services);
    await ServicePackage.insertMany(packages);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
