<template>
  <div class="services-page">

    <!-- ── HERO BANNER ─────────────────────────────── -->
    <section class="services-hero">
      <div class="hero-bg">
        <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1600&q=80" alt="services hero" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content container">
        <span
          class="eyebrow"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800"
        >Our Services</span>
        <h1
          v-motion :initial="{ opacity: 0, y: 40 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="150"
        >
          Indulge in <span class="gold">Premium Beauty</span>
        </h1>
        <p
          v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="900" :delay="300"
        >
          From bespoke bridal makeovers to wellness rituals — every treatment crafted for your unique radiance.
        </p>
        <div
          class="hero-btns"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="450"
        >
          <button class="btn-gold" @click="scrollToServices">Explore Services</button>
          <button class="btn-outline" @click="bookNow">Book Appointment</button>
        </div>
      </div>
    </section>

    <!-- ── CATEGORY TABS ───────────────────────────── -->
    <section class="tabs-section" ref="servicesSectionRef">
      <div class="container">
        <div
          class="tabs-wrap"
          v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="700"
        >
          <button
            v-for="(category, index) in categories"
            :key="category"
            class="tab-btn"
            :class="{ active: activeCategory === category }"
            @click="setActiveCategory(category, index)"
            :ref="(el) => setTabButtonRef(el, index)"
          >
            {{ category }}
          </button>
          <div class="tab-slider" :style="tabSliderStyle"></div>
        </div>
      </div>
    </section>

    <!-- ── SERVICES GRID ───────────────────────────── -->
    <section
      class="grid-section"
      style="background: linear-gradient(160deg,#fff8ee 0%,#fdf3e3 30%,#fffcf5 70%,#fff6e8 100%);"
    >
      <div class="container">

        <!-- Loading -->
        <div v-if="loading" class="loading-state">
          <div class="spinner"></div>
          <p>Loading services…</p>
        </div>

        <!-- Cards -->
        <div v-else-if="currentServices.length > 0" class="services-grid">
          <div
            v-for="(service, index) in currentServices"
            :key="service.id"
            class="svc-card"
            :class="{ 'svc-card--offset': index % 2 !== 0 }"
            v-motion :initial="{ opacity: 0, y: 70 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100 + index * 120" :duration="900"
          >
            <!-- Image -->
            <div class="svc-img">
              <img :src="service.img" :alt="service.name" loading="lazy" />
              <!-- Dark gradient -->
              <div class="svc-img__gradient"></div>
              <!-- Hover gold slide -->
              <div class="svc-img__hover-overlay"></div>
              <!-- Icon badge -->
              <div class="svc-icon-badge">
                <v-icon :icon="getCategoryIcon(service.category.name)" color="white" size="18"></v-icon>
              </div>
              <!-- Badge -->
              <span class="svc-badge">{{ service.category.name }}</span>
            </div>

            <!-- Content -->
            <div class="svc-content">
              <h3>{{ service.name }}</h3>
              <div class="svc-meta">
                <span><v-icon icon="mdi-clock-outline" size="15"></v-icon> {{ service.duration }}</span>
                <span class="svc-price"><v-icon icon="mdi-tag-outline" size="15"></v-icon> {{ service.price }}</span>
              </div>
              <p>{{ service.description }}</p>
              <ul class="svc-features">
                <li v-for="f in service.features" :key="f">
                  <v-icon icon="mdi-check-circle" size="15" color="#eaa636"></v-icon> {{ f }}
                </li>
              </ul>
              <button class="svc-btn" @click="bookService(service)">Book Now</button>
            </div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="empty-state">
          <v-icon icon="mdi-magnify" size="52" color="#eaa636"></v-icon>
          <p>No services found for <strong>{{ activeCategory }}</strong>.</p>
          <button class="btn-gold" @click="setActiveCategory('All', 0)">View All Services</button>
        </div>
      </div>
    </section>

    <!-- ── PACKAGES ────────────────────────────────── -->
    <section class="packages-section">
      <!-- decorative background -->
      <div class="packages-bg-deco" aria-hidden="true"></div>

      <div class="container">
        <!-- Header -->
        <div class="section-header" v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900">
          <span class="eyebrow">Special Packages</span>
          <h2>Save Big with Our <span class="gold">Bundled Rituals</span></h2>
          <div class="header-divider">
            <span></span><span class="dot"></span><span></span>
          </div>
        </div>

        <!-- Package cards -->
        <div class="packages-grid">
          <div
            v-for="(pkg, index) in packages"
            :key="pkg.id"
            class="pkg-card"
            :class="{ 'pkg-card--popular': pkg.popular }"
            v-motion :initial="{ opacity: 0, y: 60 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="200 + index * 150" :duration="900"
          >
            <!-- Hover glow -->
            <div class="pkg-card__glow" aria-hidden="true"></div>
            <!-- Top accent -->
            <div class="pkg-card__top-line" aria-hidden="true"></div>
            <!-- Decorative number -->
            <span class="pkg-card__num" aria-hidden="true">{{ String(index + 1).padStart(2,'0') }}</span>

            <div v-if="pkg.popular" class="pkg-popular-tag">⭐ Most Popular</div>

            <!-- Icon -->
            <div class="pkg-icon">
              <v-icon icon="mdi-diamond-stone" color="white" size="24"></v-icon>
            </div>

            <h3>{{ pkg.name }}</h3>

            <div class="pkg-price">
              <span class="pkg-price__current">{{ pkg.price }}</span>
              <span v-if="pkg.originalPrice" class="pkg-price__original">{{ pkg.originalPrice }}</span>
            </div>

            <ul class="pkg-features">
              <li v-for="f in pkg.features" :key="f">
                <v-icon icon="mdi-check-circle-outline" size="15" color="#eaa636"></v-icon> {{ f }}
              </li>
            </ul>

            <button class="pkg-btn" @click="bookPackage(pkg)">Book Package</button>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA BANNER ─────────────────────────────── -->
    <section class="cta-section">
      <div class="cta-bg">
        <img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1600&q=80" alt="cta" />
        <div class="cta-overlay"></div>
      </div>
      <div class="container cta-content">
        <span
          class="eyebrow eyebrow--light"
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="700"
        >Ready for a Transformation?</span>
        <h2
          v-motion :initial="{ opacity: 0, y: 40 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="900" :delay="150"
        >
          Book Your <span class="gold">Experience</span> Today
        </h2>
        <p
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800" :delay="300"
        >
          Our expert team is ready to bring out your inner radiance. Premium treatments, certified stylists, serene ambience.
        </p>
        <div
          class="cta-btns"
          v-motion :initial="{ opacity: 0, y: 20 }" :visibleOnce="{ opacity: 1, y: 0 }" :duration="800" :delay="450"
        >
          <button class="btn-gold" @click="bookNow">Book Appointment</button>
          <a href="https://wa.me/9932269688" class="btn-whatsapp" target="_blank" rel="noopener">
            <v-icon icon="mdi-whatsapp" size="20" color="white"></v-icon> WhatsApp Us
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import apiStore from '@/api/apiStore';
import type { Service, ServicePackage } from '@/types/Services';
import { ref, computed, onMounted, nextTick } from 'vue';
import type { Ref } from 'vue';

const CATEGORY_ICONS: Record<string, string> = {
  Hair:     'mdi-content-cut',
  Skin:     'mdi-face-woman-shimmer',
  Nails:    'mdi-hand-back-left',
  Makeup:   'mdi-brush',
  Wellness: 'mdi-spa',
  All:      'mdi-star-four-points',
};

export default {
  setup() {
    const activeCategory: Ref<string> = ref('All');
    const loading: Ref<boolean>       = ref(true);
    const categories: Ref<string[]>   = ref(['All']);
    const services: Ref<Service[]>    = ref([]);
    const packages: Ref<ServicePackage[]> = ref([]);
    const servicesSectionRef = ref<HTMLElement | null>(null);

    // Tab slider
    const tabButtons       = ref<(HTMLElement | null)[]>([]);
    const tabSliderPosition = ref<number>(0);
    const tabSliderWidth    = ref<number>(0);
    const tabSliderHeight   = ref<number>(0);
    const tabSliderTop      = ref<number>(0);

    const currentServices = computed(() => {
      if (activeCategory.value === 'All') return services.value;
      return services.value.filter(s => s.category.name === activeCategory.value);
    });

    const tabSliderStyle = computed(() => ({
      transform:  `translateX(${tabSliderPosition.value}px)`,
      width:      `${tabSliderWidth.value}px`,
      height:     `${tabSliderHeight.value}px`,
      top:        `${tabSliderTop.value}px`,
      transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    }));

    const getCategoryIcon = (name: string) => CATEGORY_ICONS[name] ?? 'mdi-spa';

    /* ── DATA LOADERS ──────────────────────────────── */
    const loadCategories = async () => {
      try {
        const fetched = await apiStore.getAllServiceCategories();
        categories.value = ['All', ...fetched.map((c: any) => c.name)];
      } catch {
        categories.value = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Wellness'];
      }
    };

    const loadServices = async () => {
      try {
        loading.value = true;
        services.value = await apiStore.getAllServices();
      } catch {
        services.value = [
          // ── HAIR ───────────────────────────────────────────────
          { id: 1, name: 'Luxury Haircut & Style',        price: '₹999',    duration: '60 min',
            img: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80',
            description: 'A personalised cut and blowout tailored to your face shape and lifestyle.',
            features: ['Consultation included','Scalp massage','Blow-dry & finish','Style products'],
            category: { id: 1, name: 'Hair' } },
          { id: 2, name: 'Keratin Smoothing Treatment',   price: '₹3,499',  duration: '120 min',
            img: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80',
            description: 'Eliminate frizz and add long-lasting shine with professional keratin.',
            features: ['Lasts 3–5 months','Frizz-free finish','Deep conditioning','Heat protection'],
            category: { id: 1, name: 'Hair' } },
          { id: 3, name: 'Balayage Colouring',            price: '₹4,999',  duration: '150 min',
            img: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80',
            description: 'Hand-painted highlights for a natural, sun-kissed look.',
            features: ['Custom colour blend','Toner included','Glossing finish','Aftercare advice'],
            category: { id: 1, name: 'Hair' } },
          // ── SKIN ───────────────────────────────────────────────
          { id: 4, name: 'Deep Cleansing Facial',         price: '₹1,499',  duration: '75 min',
            img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80',
            description: 'Thorough cleanse, exfoliation and extraction for radiant skin.',
            features: ['Skin analysis','Steam & extraction','Hydrating mask','SPF moisturiser'],
            category: { id: 2, name: 'Skin' } },
          { id: 5, name: 'Anti-Ageing Glow Treatment',    price: '₹2,999',  duration: '90 min',
            img: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80',
            description: 'Targets fine lines with vitamin-C serums, collagen masks & LED therapy.',
            features: ['LED light therapy','Collagen infusion','Eye treatment','Firming massage'],
            category: { id: 2, name: 'Skin' } },
          // ── NAILS ──────────────────────────────────────────────
          { id: 6, name: 'Gel Manicure',                  price: '₹699',    duration: '45 min',
            img: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80',
            description: 'Long-lasting gel polish with cuticle care and hand massage.',
            features: ['Shape & buff','Cuticle treatment','Gel colour of choice','Chip-free 3 weeks'],
            category: { id: 3, name: 'Nails' } },
          { id: 7, name: 'Luxury Spa Pedicure',           price: '₹999',    duration: '60 min',
            img: 'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=600&q=80',
            description: 'Foot soak, scrub, callus removal and gel polish for pampered feet.',
            features: ['Foot soak','Callus removal','Paraffin wax','Gel polish'],
            category: { id: 3, name: 'Nails' } },
          // ── MAKEUP ─────────────────────────────────────────────
          { id: 8, name: 'Bridal Makeup',                 price: '₹7,999',  duration: '120 min',
            img: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80',
            description: 'Flawless, long-wear bridal look using HD airbrush and luxury brands.',
            features: ['Trial session','HD airbrush','Lashes included','Touch-up kit'],
            category: { id: 4, name: 'Makeup' } },
          { id: 9, name: 'Party Glam Makeup',             price: '₹2,499',  duration: '60 min',
            img: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80',
            description: 'Glamorous, camera-ready evening look tailored to your outfit.',
            features: ['Skin-prep included','Setting spray','Lashes optional','Lasts 10+ hours'],
            category: { id: 4, name: 'Makeup' } },
          // ── WELLNESS ───────────────────────────────────────────
          { id: 10, name: 'Aromatherapy Massage',         price: '₹1,799',  duration: '60 min',
            img: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80',
            description: 'Full-body relaxation massage with warm essential oils.',
            features: ['Oil consultation','Hot towel finish','Stress relief','Mood-lifting'],
            category: { id: 5, name: 'Wellness' } },
          { id: 11, name: 'Japanese Head Spa',            price: '₹1,299',  duration: '45 min',
            img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=600&q=80',
            description: 'Deep scalp cleanse, oil treatment and pressure-point massage.',
            features: ['Scalp analysis','Treatment oils','Pressure massage','Scalp detox'],
            category: { id: 5, name: 'Wellness' } },
          { id: 12, name: 'Body Polishing Ritual',        price: '₹2,199',  duration: '75 min',
            img: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&q=80',
            description: 'Full-body sugar scrub followed by a nourishing wrap for glowing skin.',
            features: ['Exfoliation','Nourishing body wrap','Hydrating butter','Soft glow'],
            category: { id: 5, name: 'Wellness' } },
        ];
      } finally {
        loading.value = false;
      }
    };

    const loadPackages = async () => {
      try {
        packages.value = await apiStore.getAllServicePackages();
      } catch {
        packages.value = [
          { id: 1, name: 'Glow Starter',       price: '₹2,499',  originalPrice: '₹3,200',  popular: false,
            features: ['Deep Cleansing Facial','Gel Manicure','Eyebrow Shaping','Hair Wash & Blow-dry'] },
          { id: 2, name: 'Bridal Bliss',        price: '₹12,999', originalPrice: '₹18,000', popular: true,
            features: ['Bridal HD Makeup (trial + event)','Keratin Smoothing Treatment','Luxury Spa Pedicure','Gel Manicure','Anti-Ageing Facial','Aromatherapy Massage'] },
          { id: 3, name: 'Relaxation Retreat',  price: '₹4,199',  originalPrice: '₹5,500',  popular: false,
            features: ['Aromatherapy Massage (60 min)','Japanese Head Spa','Body Polishing Ritual','Anti-Ageing Glow Facial'] },
        ];
      }
    };

    /* ── TAB SLIDER ────────────────────────────────── */
    const setTabButtonRef = (el: any, index: number) => {
      if (el instanceof HTMLElement)                  tabButtons.value[index] = el;
      else if (el && '$el' in el)                     tabButtons.value[index] = el.$el as HTMLElement;
      else                                            tabButtons.value[index] = null;
    };

    const updateTabSliderPosition = async (index: number) => {
      await nextTick();
      const btn = tabButtons.value[index];
      if (btn) {
        const bRect = btn.getBoundingClientRect();
        const cRect = btn.parentElement!.getBoundingClientRect();
        tabSliderPosition.value = bRect.left - cRect.left;
        tabSliderWidth.value    = bRect.width;
        tabSliderHeight.value   = bRect.height;
        tabSliderTop.value      = bRect.top  - cRect.top;
      }
    };

    const setActiveCategory = async (cat: string, idx: number) => {
      activeCategory.value = cat;
      await updateTabSliderPosition(idx);
    };

    /* ── ACTIONS ───────────────────────────────────── */
    const bookNow     = () => alert('Redirecting to booking…');
    const bookService = (s: Service)       => alert(`Booking: ${s.name}`);
    const bookPackage = (p: ServicePackage) => alert(`Booking package: ${p.name}`);
    const scrollToServices = () => {
      servicesSectionRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    onMounted(async () => {
      await loadCategories();
      await loadServices();
      await loadPackages();
      setTimeout(() => updateTabSliderPosition(0), 150);
    });

    return {
      activeCategory, categories, services, currentServices,
      packages, loading, tabSliderStyle, servicesSectionRef,
      getCategoryIcon, setTabButtonRef, setActiveCategory,
      bookNow, bookService, bookPackage, scrollToServices,
    };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* ── TOKENS ─────────────────────────────────────────── */
:root {
  --gold:       #eaa636;
  --gold-dark:  #c5831e;
  --dark:       #1e1916;
  --cream:      #fffdf7;
  --text:       #545454;
  --radius:     16px;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

.services-page {
  font-family: 'Open Sans', sans-serif;
  color: var(--text, #545454);
  background: var(--cream, #fffdf7);
}

.container {
  max-width: 1140px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Shared typography */
.eyebrow {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: #eaa636;
  margin-bottom: 1rem;
}
.eyebrow--light { color: rgba(234,166,54,0.9); }

.gold { color: #eaa636; }

h1, h2 {
  font-family: 'Playfair Display', serif;
  color: #1e1916;
  line-height: 1.15;
}

/* Divider */
.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1.25rem;
}
.header-divider span:not(.dot) {
  width: 64px; height: 1px; background: rgba(234,166,54,0.4);
}
.header-divider .dot {
  width: 8px; height: 8px; border-radius: 50%; background: #eaa636;
}

/* Buttons */
.btn-gold {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #eaa636;
  color: #1e1916;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.35s ease;
  box-shadow: 0 5px 18px rgba(234,166,54,0.35);
  position: relative;
  overflow: hidden;
  z-index: 1;
}
.btn-gold::before {
  content: '';
  position: absolute; inset: 0;
  background: #1e1916;
  width: 0;
  transition: width 0.35s ease;
  z-index: -1;
  border-radius: 50px;
}
.btn-gold:hover { color: #fff; transform: translateY(-3px); box-shadow: 0 8px 28px rgba(234,166,54,0.5); }
.btn-gold:hover::before { width: 100%; }

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: 2px solid rgba(255,255,255,0.5);
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.35s ease;
}
.btn-outline:hover { border-color: #eaa636; color: #eaa636; transform: translateY(-3px); }

.btn-whatsapp {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #198754;
  color: #fff;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  padding: 0.85rem 2rem;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.35s ease;
}
.btn-whatsapp:hover { background: #157347; transform: translateY(-3px); }

/* ── HERO ────────────────────────────────────────────── */
.services-hero {
  position: relative;
  min-height: 88vh;
  display: flex;
  align-items: flex-end;
  padding-bottom: 5rem;
  overflow: hidden;
}

.hero-bg {
  position: absolute; inset: 0; z-index: 0;
}
.hero-bg img {
  width: 100%; height: 100%; object-fit: cover; object-position: center;
}
.hero-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.92) 0%,
    rgba(30,25,22,0.70) 50%,
    rgba(30,25,22,0.45) 100%
  );
}

.hero-content {
  position: relative; z-index: 2;
  text-align: left;
}
.hero-content h1 {
  font-size: clamp(2.4rem, 5.5vw, 4rem);
  color: #fff;
  margin-bottom: 1.2rem;
}
.hero-content p {
  color: rgba(255,255,255,0.78);
  font-size: 1.1rem;
  max-width: 580px;
  line-height: 1.75;
  margin-bottom: 2rem;
}
.hero-btns {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

/* ── TABS ────────────────────────────────────────────── */
.tabs-section {
  background: #fff;
  padding: 2rem 0;
  position: sticky;
  top: 0;
  z-index: 40;
  box-shadow: 0 4px 24px rgba(30,25,22,0.07);
}
.tabs-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #fdf5eb;
  border-radius: 50px;
  padding: 0.6rem;
  width: fit-content;
  margin: 0 auto;
  position: relative;
  flex-wrap: wrap;
}
.tab-btn {
  background: transparent;
  border: none;
  padding: 0.65rem 1.4rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #545454;
  cursor: pointer;
  white-space: nowrap;
  position: relative;
  z-index: 2;
  transition: color 0.3s;
}
.tab-btn.active { color: #1e1916; font-weight: 700; }
.tab-btn:hover:not(.active) { color: #eaa636; }

.tab-slider {
  position: absolute;
  left: 0;
  background: #eaa636;
  border-radius: 50px;
  z-index: 1;
  box-shadow: 0 4px 16px rgba(234,166,54,0.35);
  transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
}

/* ── SERVICES GRID ───────────────────────────────────── */
.grid-section { padding: 5rem 0 4rem; }

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.75rem;
}

/* Alternating offset like HomeView */
@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .svc-card--offset { margin-top: 2.5rem; }
}
@media (min-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.svc-card {
  background: #fff;
  border-radius: var(--radius, 16px);
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(30,25,22,0.08);
  border: 1px solid rgba(234,166,54,0.12);
  display: flex;
  flex-direction: column;
  transition: all 0.4s ease;
}
.svc-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 50px rgba(30,25,22,0.14);
  border-color: rgba(234,166,54,0.35);
}

.svc-img {
  position: relative;
  height: 240px;
  overflow: hidden;
  flex-shrink: 0;
}
.svc-img img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.6s ease;
}
.svc-card:hover .svc-img img { transform: scale(1.08); }

.svc-img__gradient {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(30,25,22,0.72) 0%, rgba(30,25,22,0.15) 55%, transparent 100%);
}
.svc-img__hover-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(234,166,54,0.82) 0%, rgba(197,131,30,0.55) 25%, transparent 45%);
  transform: translateY(100%);
  transition: transform 0.5s ease-out;
}
.svc-card:hover .svc-img__hover-overlay { transform: translateY(0); }

.svc-icon-badge {
  position: absolute;
  top: 1rem; right: 1rem;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.3);
  display: flex; align-items: center; justify-content: center;
  z-index: 2;
  transition: transform 0.4s ease;
}
.svc-card:hover .svc-icon-badge { transform: scale(1.15) rotate(6deg); }

.svc-badge {
  position: absolute;
  bottom: 1rem; left: 1rem;
  background: rgba(255,255,255,0.18);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255,255,255,0.3);
  color: #fff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  padding: 0.3rem 0.85rem;
  border-radius: 50px;
  z-index: 2;
}

.svc-content {
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.svc-content h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  color: #1e1916;
  margin-bottom: 0.6rem;
  transition: color 0.3s;
}
.svc-card:hover .svc-content h3 { color: #eaa636; }

.svc-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.9rem;
  flex-wrap: wrap;
}
.svc-meta span {
  display: flex; align-items: center; gap: 5px;
  font-size: 0.82rem; font-weight: 600; color: #eaa636;
}
.svc-price { margin-left: auto; }

.svc-content p {
  font-size: 0.9rem;
  color: #545454;
  line-height: 1.7;
  margin-bottom: 1rem;
  flex-grow: 1;
  opacity: 0.88;
}

.svc-features {
  list-style: none;
  margin-bottom: 1.25rem;
}
.svc-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.83rem;
  padding: 0.3rem 0;
  color: #545454;
}

.svc-btn {
  margin-top: auto;
  background: #1e1916;
  color: #fff;
  border: 2px solid #1e1916;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
}
.svc-btn:hover { background: #eaa636; border-color: #eaa636; color: #1e1916; transform: translateY(-2px); }

/* Loading / Empty */
.loading-state, .empty-state {
  text-align: center;
  padding: 5rem 2rem;
}
.loading-state p, .empty-state p { margin: 1rem 0 1.5rem; font-size: 1.05rem; }
.spinner {
  width: 44px; height: 44px;
  border: 4px solid #fdf5eb;
  border-left-color: #eaa636;
  border-radius: 50%;
  animation: spin 0.9s linear infinite;
  margin: 0 auto 1.25rem;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── PACKAGES ────────────────────────────────────────── */
.packages-section {
  position: relative;
  padding: 6rem 0;
  background: linear-gradient(135deg, #fffdf7 0%, #fdf5eb 40%, #fff9f0 70%, #ffffff 100%);
  overflow: hidden;
}
.packages-bg-deco {
  position: absolute; inset: 0; pointer-events: none;
  background:
    radial-gradient(ellipse at 0% 0%, rgba(234,166,54,0.12) 0%, transparent 55%),
    radial-gradient(ellipse at 100% 100%, rgba(234,166,54,0.08) 0%, transparent 50%);
}

.section-header {
  text-align: center;
  margin-bottom: 3.5rem;
}
.section-header h2 {
  font-size: clamp(1.9rem, 4vw, 2.8rem);
  margin-top: 0.5rem;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  align-items: start;
}
@media (min-width: 900px) {
  .packages-grid { grid-template-columns: repeat(3, 1fr); }
  .packages-grid .pkg-card--popular { margin-top: -1.5rem; }
}

.pkg-card {
  position: relative;
  background: linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(253,250,245,0.9) 100%);
  border: 1px solid rgba(234,166,54,0.15);
  border-radius: var(--radius, 16px);
  padding: 2.25rem;
  overflow: hidden;
  cursor: default;
  transition: all 0.5s ease;
  backdrop-filter: blur(8px);
}
.pkg-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 60px rgba(234,166,54,0.18);
  border-color: rgba(234,166,54,0.4);
}
.pkg-card--popular {
  border-color: rgba(234,166,54,0.4);
  box-shadow: 0 20px 60px rgba(234,166,54,0.15);
  background: linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(254,249,235,0.95) 100%);
}

.pkg-card__glow {
  position: absolute; inset: 0;
  background: linear-gradient(135deg, rgba(234,166,54,0.06) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s;
}
.pkg-card:hover .pkg-card__glow { opacity: 1; }

.pkg-card__top-line {
  position: absolute; top: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, transparent, #eaa636, transparent);
  opacity: 0;
  transition: opacity 0.5s;
}
.pkg-card:hover .pkg-card__top-line,
.pkg-card--popular .pkg-card__top-line { opacity: 1; }

.pkg-card__num {
  position: absolute;
  top: -1rem; right: -0.5rem;
  font-size: 7rem;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: rgba(234,166,54,0.08);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  transition: transform 0.6s ease;
}
.pkg-card--popular .pkg-card__num { color: rgba(234,166,54,0.12); }
.pkg-card:hover .pkg-card__num { transform: scale(1.1); }

.pkg-popular-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #1e1916;
  background: #eaa636;
  padding: 0.35rem 1rem;
  border-radius: 50px;
  display: inline-block;
  margin-bottom: 1rem;
}

.pkg-icon {
  width: 52px; height: 52px;
  border-radius: 12px;
  background: linear-gradient(135deg, #eaa636, #c5831e);
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 1.25rem;
  box-shadow: 0 8px 24px rgba(234,166,54,0.4);
  transition: transform 0.5s ease;
}
.pkg-card:hover .pkg-icon { transform: rotate(6deg) scale(1.06); }

.pkg-card h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.45rem;
  color: #eaa636;
  margin-bottom: 0.75rem;
  position: relative; z-index: 1;
}

.pkg-price {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  position: relative; z-index: 1;
}
.pkg-price__current {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #1e1916;
}
.pkg-price__original {
  font-size: 1rem;
  color: #9e9e9e;
  text-decoration: line-through;
}

.pkg-features {
  list-style: none;
  margin-bottom: 2rem;
  position: relative; z-index: 1;
}
.pkg-features li {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.87rem;
  padding: 0.38rem 0;
  border-bottom: 1px solid rgba(234,166,54,0.08);
  color: #545454;
}
.pkg-features li:last-child { border-bottom: none; }

.pkg-btn {
  width: 100%;
  padding: 0.9rem;
  border-radius: 50px;
  border: 2px solid #eaa636;
  background: transparent;
  color: #1e1916;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.35s ease;
  position: relative; z-index: 1;
}
.pkg-btn:hover { background: #eaa636; color: #1e1916; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(234,166,54,0.35); }
.pkg-card--popular .pkg-btn { background: #eaa636; color: #1e1916; }
.pkg-card--popular .pkg-btn:hover { background: #1e1916; color: #fff; border-color: #1e1916; }

/* ── CTA BANNER ──────────────────────────────────────── */
.cta-section {
  position: relative;
  min-height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
}
.cta-bg {
  position: absolute; inset: 0; z-index: 0;
}
.cta-bg img {
  width: 100%; height: 100%; object-fit: cover; object-position: center top;
}
.cta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(
    135deg,
    rgba(30,25,22,0.92) 0%,
    rgba(30,25,22,0.78) 50%,
    rgba(30,25,22,0.6) 100%
  );
}
.cta-content {
  position: relative; z-index: 2;
  text-align: center;
  padding-top: 5rem;
  padding-bottom: 5rem;
}
.cta-content h2 {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: #fff;
  margin-bottom: 1.2rem;
  margin-top: 0.5rem;
}
.cta-content p {
  color: rgba(255,255,255,0.75);
  font-size: 1.05rem;
  max-width: 560px;
  margin: 0 auto 2.25rem;
  line-height: 1.8;
}
.cta-btns {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* ── RESPONSIVENESS ──────────────────────────────────── */
@media (max-width: 640px) {
  .hero-content h1 { font-size: 2.2rem; }
  .hero-content  { text-align: center; }
  .hero-btns    { justify-content: center; }
  .tabs-wrap    { flex-wrap: wrap; justify-content: center; }
  .services-grid { grid-template-columns: 1fr; }
  .svc-card--offset { margin-top: 0; }
}
</style>