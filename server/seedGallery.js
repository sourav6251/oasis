import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Gallery from './src/models/Gallery.js';
import GalleryCategory from './src/models/GalleryCategory.js';
import connectDB from './src/config/db.js';

dotenv.config();
connectDB();

const categories = [
  { name: 'Bridal',    icon: 'mdi-heart'          },
  { name: 'Makeup',    icon: 'mdi-brush'          },
  { name: 'Hair',      icon: 'mdi-content-cut'    },
  { name: 'Nails',     icon: 'mdi-hand-back-left' },
  { name: 'Wellness',  icon: 'mdi-spa'            },
];

const galleryWorks = [
  // ── BRIDAL ─────────────────────────────────────
  { title: 'Royal Bridal Glow',      category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=600&q=80',
    description: 'An ethereal bridal look — dewy skin, champagne eyes and a classic red lip.',
    duration: '3 hrs',    stylist: 'Priya Sharma' },
  { title: 'Golden Hour Bride',       category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80',
    description: 'Warm golden tones, soft smoky eye and flawlessly highlighted cheekbones.',
    duration: '2.5 hrs',  stylist: 'Ananya Roy' },
  { title: 'Celestial Bridal',        category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80',
    description: 'Soft peach tones, pearl highlights and intricate eye art.',
    duration: '3.5 hrs',  stylist: 'Sonal Gupta' },
  { title: 'Classic Bengali Bride',   category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80',
    description: 'Traditional red & gold, bold eye and contoured nose for the ideal Bengali bride.',
    duration: '4 hrs',    stylist: 'Priya Sharma' },
  // ── MAKEUP ─────────────────────────────────────
  { title: 'Party Glam Smoky',        category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
    description: 'Deep charcoal smoky eye with metallic foil lid — bold and camera-ready.',
    duration: '60 min',   stylist: 'Ananya Roy' },
  { title: 'Natural Dewy Glow',       category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
    description: 'Glass-skin finish with peachy blush and a barely-there lip.',
    duration: '45 min',   stylist: 'Sonal Gupta' },
  { title: 'Festive Ethnic Glam',     category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1526510747491-58f928ec870f?w=600&q=80',
    description: 'Vibrant kohl-rimmed eyes and terracotta lips for Indian festive beauty.',
    duration: '75 min',   stylist: 'Priya Sharma' },
  { title: 'Editorial Cut Crease',    category: 'Makeup',
    image: 'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80',
    description: 'Sharp cut-crease in cobalt blue with graphic liner — a bold editorial look.',
    duration: '90 min',   stylist: 'Ananya Roy' },
  // ── HAIR ───────────────────────────────────────
  { title: 'Silk Balayage Waves',     category: 'Hair',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
    description: 'Honey-caramel balayage with voluminous beach waves.',
    duration: '3 hrs',    stylist: 'Rinku Das' },
  { title: 'Sleek Keratin Blow',      category: 'Hair',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
    description: 'Post-keratin blowout: pin-straight, mirror-shine and frizz-free.',
    duration: '2 hrs',    stylist: 'Rinku Das' },
  { title: 'Bridal Updo',             category: 'Hair',
    image: 'https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=600&q=80',
    description: 'Intricately pinned updo with fresh flowers and embellished pins.',
    duration: '90 min',   stylist: 'Sonal Gupta' },
  { title: 'Chic Bob Cut',            category: 'Hair',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
    description: 'Precision asymmetric bob that frames the face perfectly.',
    duration: '60 min',   stylist: 'Rinku Das' },
  // ── NAILS ──────────────────────────────────────
  { title: 'French Ombre Nails',      category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    description: 'Soft pink-to-white ombre gel nails with shimmer top coat.',
    duration: '60 min',   stylist: 'Meera Bose' },
  { title: 'Floral Nail Art',         category: 'Nails',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
    description: 'Hand-painted micro florals on a nude base — intricate bespoke artistry.',
    duration: '90 min',   stylist: 'Meera Bose' },
  { title: 'Glitter Gel Mani',        category: 'Nails',
    image: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
    description: 'Chunky gold glitter encapsulated in a long-wearing gel.',
    duration: '45 min',   stylist: 'Meera Bose' },
  // ── WELLNESS ───────────────────────────────────
  { title: 'Aromatherapy Session',    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    description: 'Full-body massage with carefully blended essential oils for total relaxation.',
    duration: '60 min',   stylist: 'Tanya Mehta' },
  { title: 'Japanese Head Spa',       category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
    description: 'Scalp exfoliation, oil treatment and pressure-point massage.',
    duration: '45 min',   stylist: 'Tanya Mehta' },
  { title: 'Glow Facial',             category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
    description: 'Brightening facial with vitamin-C serum, enzyme mask & LED therapy.',
    duration: '75 min',   stylist: 'Sonal Gupta' },
  { title: 'Body Polish Ritual',      category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
    description: 'Sugar-coffee full-body scrub followed by warm wrap and hydrating butter.',
    duration: '90 min',   stylist: 'Tanya Mehta' },
  { title: 'Deep Tissue Massage',     category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
    description: 'Targeted deep-tissue work to release chronic tension in the back & shoulders.',
    duration: '45 min',   stylist: 'Tanya Mehta' },
];

const seedData = async () => {
  try {
    await Gallery.deleteMany();
    await GalleryCategory.deleteMany();

    await GalleryCategory.insertMany(categories);
    await Gallery.insertMany(galleryWorks);

    console.log('Gallery Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
