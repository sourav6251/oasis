<template>
  <div>
    <!-- Services Hero -->
    <section class="services-hero">
      <div class="container">
        <h1 v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
          Our Premium Services
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          Indulge in our wide range of beauty treatments designed to enhance your natural beauty and boost your confidence.
        </p>
        <div v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="400">
          <button class="hero-btn" @click="scrollToServices">View Services</button>
          <button class="hero-btn primary" @click="bookNow">Book Appointment</button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- Category Tabs -->
      <div class="category-tabs">
        <button
          v-for="(category, index) in categories"
          :key="category"
          class="tab-btn"
          :class="{ active: activeCategory === category }"
          @click="setActiveCategory(category)"
          v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" :delay="index * 100"
        >
          {{ category }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <p>Loading services...</p>
      </div>

      <!-- Services Grid -->
      <div v-else-if="currentServices.length > 0" class="services-grid">
        <div
          v-for="(service, index) in currentServices"
          :key="service.id"
          class="service-card"
          v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :delay="index * 100"
        >
          <div class="service-img">
            <img :src="service.img" :alt="service.name" />
            <div class="service-badge">{{ service.category }}</div>
          </div>
          <div class="service-content">
            <h3>{{ service.name }}</h3>
            <div class="service-meta">
              <span><i class="far fa-clock"></i> {{ service.duration }}</span>
              <span><i class="fas fa-tag"></i> {{ service.price }}</span>
            </div>
            <p>{{ service.description }}</p>
            <ul class="service-features">
              <li v-for="feature in service.features" :key="feature">
                <i class="fas fa-check"></i> {{ feature }}
              </li>
            </ul>
            <button class="service-btn" @click="bookService(service)">Book Now</button>
          </div>
        </div>
      </div>

      <!-- No Services Found -->
      <div v-else class="no-services">
        <p>No services found for {{ activeCategory }}.</p>
      </div>
    </div>

    <!-- Rest of your template remains the same -->
    <!-- Packages Section -->
    <section class="packages-section">
      <div class="container packages-container">
        <div class="section-title">
          <h2 v-motion :initial="{ opacity: 0, y: -30 }" :enter="{ opacity: 1, y: 0 }" :duration="800">
            Special Packages
          </h2>
          <p v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="200">
            Save more with our bundled services designed to give you the ultimate beauty experience.
          </p>
        </div>

        <div class="packages-grid">
          <div
            v-for="(packageItem, index) in packages"
            :key="packageItem.id"
            class="package-card"
            :class="{ popular: packageItem.popular }"
            v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }" :delay="index * 150"
          >
            <div v-if="packageItem.popular" class="popular-tag">MOST POPULAR</div>
            <h3>{{ packageItem.name }}</h3>
            <div class="package-price">
              {{ packageItem.price }}
              <span v-if="packageItem.originalPrice">{{ packageItem.originalPrice }}</span>
            </div>
            <ul class="package-features">
              <li v-for="feature in packageItem.features" :key="feature">{{ feature }}</li>
            </ul>
            <button class="package-btn" @click="bookPackage(packageItem)">Book Package</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 v-motion :initial="{ opacity: 0, y: -30 }" :enter="{ opacity: 1, y: 0 }" :duration="800">
          Ready for a Transformation?
        </h2>
        <p v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="200">
          Book your appointment today and experience the Glamour Salon difference. Our expert team is ready to help you look and feel your best.
        </p>
        <button 
          class="cta-btn" 
          @click="bookNow"
          v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="400"
        >
          Book Your Appointment
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer>
      <div class="container footer-content">
        <div class="footer-column">
          <h3>Glamour Salon</h3>
          <p>
            Your premier destination for beauty and wellness. We're dedicated to enhancing your natural beauty and providing an exceptional experience.
          </p>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-pinterest"></i></a>
          </div>
        </div>
        <div class="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About Us</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="pricing.html">Pricing</a></li>
            <li><a href="gallery.html">Gallery</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Services</h3>
          <ul>
            <li v-for="category in categories" :key="category">
              <a href="#">{{ category }}</a>
            </li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Contact Info</h3>
          <p><i class="fas fa-map-marker-alt"></i> 123 Beauty Street, City, State 12345</p>
          <p><i class="fas fa-phone"></i> (123) 456-7890</p>
          <p><i class="fas fa-envelope"></i> info@glamoursalon.com</p>
          <p><i class="fas fa-clock"></i> Mon-Sat: 9:00 AM - 8:00 PM</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Glamour Salon. All Rights Reserved. | Designed with <i class="fas fa-heart"></i></p>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { Ref } from 'vue';

// Define TypeScript interfaces
interface Service {
  id: number;
  name: string;
  price: string;
  duration: string;
  img: string;
  description: string;
  features: string[];
  category: string;
}

interface ServicePackage {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  features: string[];
  popular: boolean;
}

export default {
  setup() {
    const activeCategory: Ref<string> = ref('Hair');
    const loading: Ref<boolean> = ref(true);
    const categories: Ref<string[]> = ref(['Hair', 'Skincare', 'Nails', 'Makeup', 'Spa']);

    // Initialize services as an empty array first
    const services: Ref<Service[]> = ref([]);

    const packages: Ref<ServicePackage[]> = ref([]);

    // Computed property to get current category services
    const currentServices = computed(() => {
      return services.value.filter(service => service.category === activeCategory.value);
    });

    // Load services data
    const loadServices = () => {
      // Simulate API call with setTimeout
      setTimeout(() => {
        services.value = [
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
        loading.value = false;
      }, 100);
    };

    // Load packages data
    const loadPackages = () => {
      packages.value = [
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
    };

    const setActiveCategory = (category: string): void => {
      activeCategory.value = category;
    };

    const bookNow = (): void => {
      alert('Redirecting to booking page...');
    };

    const bookService = (service: Service): void => {
      alert(`Booking: ${service.name}`);
    };

    const bookPackage = (packageItem: ServicePackage): void => {
      alert(`Booking package: ${packageItem.name}`);
    };

    const scrollToServices = (): void => {
      const servicesGrid = document.querySelector('.services-grid') as HTMLElement;
      if (servicesGrid) {
        window.scrollTo({
          top: servicesGrid.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    };

    // Load data when component mounts
    onMounted(() => {
      loadServices();
      loadPackages();
    });

    return {
      activeCategory,
      categories,
      services,
      currentServices,
      packages,
      loading,
      setActiveCategory,
      bookNow,
      bookService,
      bookPackage,
      scrollToServices
    };
  }
};
</script>



<style scoped>
.loading-state {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
  color: #666;
}

.no-services {
  text-align: center;
  padding: 40px;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 20px 0;
  color: #666;
}

/* Rest of your CSS remains exactly the same */
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-text: #2A363B;
  --color-light: #FFFFFF;
  --color-border: #E0E0E0;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 8px 15px rgba(0, 0, 0, 0.15);
  --radius: 8px;
  --transition: all 0.3s ease;
}

/* ... rest of your existing CSS ... */
/* Basic Reset & Font Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--color-text);
  background-color: var(--color-neutral);
  line-height: 1.6;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

/* Services Hero */
.services-hero {
  background: linear-gradient(rgba(42, 54, 59, 0.8), rgba(42, 54, 59, 0.8)),
    url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80');
  background-size: cover;
  background-position: center;
  color: var(--color-light);
  text-align: center;
  padding: 120px 0;
  margin-bottom: 60px;
}

.services-hero h1 {
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: var(--color-light);
}

.services-hero p {
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto 30px;
  opacity: 0.9;
}

.hero-btn {
  background: transparent;
  border: 2px solid var(--color-light);
  color: var(--color-light);
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  margin: 0 10px;
}

.hero-btn.primary {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-dark);
}

.hero-btn:hover {
  background: var(--color-light);
  color: var(--color-dark);
}

.hero-btn.primary:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: var(--color-dark);
}

/* Category Tabs */
.category-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 10px;
}

.tab-btn {
  background: var(--color-light);
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--shadow);
  color: var(--color-dark);
}

.tab-btn.active {
  background: var(--color-primary);
  color: var(--color-dark);
}

.tab-btn:hover:not(.active) {
  background: var(--color-secondary);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 80px;
}

.service-card {
  background: var(--color-light);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-hover);
}

.service-img {
  height: 220px;
  overflow: hidden;
  position: relative;
}

.service-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition);
}

.service-card:hover .service-img img {
  transform: scale(1.05);
}

.service-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  background: var(--color-accent);
  color: var(--color-dark);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.service-content {
  padding: 25px;
}

.service-content h3 {
  font-size: 1.4rem;
  margin-bottom: 10px;
  color: var(--color-dark);
}

.service-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: var(--color-primary);
  font-weight: 600;
}

.service-content p {
  color: var(--color-text);
  margin-bottom: 20px;
  font-size: 0.95rem;
}

.service-features {
  list-style: none;
  margin-bottom: 20px;
}

.service-features li {
  padding: 5px 0;
  display: flex;
  align-items: center;
}

.service-features li i {
  color: var(--color-primary);
  margin-right: 10px;
}

.service-btn {
  background: var(--color-secondary);
  color: var(--color-dark);
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
}

.service-btn:hover {
  background: var(--color-primary);
  color: var(--color-dark);
}

/* Packages Section */
.packages-section {
  background: var(--color-light);
  padding: 80px 0;
  margin-bottom: 80px;
  position: relative;
}

.packages-section:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1559599101-f09722fb4948?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover fixed;
  opacity: 0.03;
  z-index: 0;
}

.packages-container {
  position: relative;
  z-index: 1;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
}

.section-title h2 {
  margin-bottom: 15px;
  color: var(--color-dark);
  position: relative;
  display: inline-block;
}

.section-title h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--color-primary);
}

.section-title p {
  max-width: 600px;
  margin: 0 auto;
  color: var(--color-text);
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.package-card {
  background: var(--color-light);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  text-align: center;
  padding: 40px 30px;
  position: relative;
  transition: var(--transition);
  border: 2px solid transparent;
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.package-card.popular {
  border-color: var(--color-accent);
  transform: scale(1.05);
}

.popular-tag {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-dark);
  padding: 8px 25px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.package-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--color-dark);
}

.package-price {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.package-price span {
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: line-through;
  margin-left: 10px;
}

.package-features {
  list-style: none;
  margin-bottom: 30px;
}

.package-features li {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.package-features li:last-child {
  border-bottom: none;
}

.package-btn {
  background: var(--color-primary);
  color: var(--color-dark);
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
}

.package-btn:hover {
  background: var(--color-accent);
  transform: translateY(-3px);
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-dark);
  text-align: center;
  padding: 80px 0;
  margin-bottom: 80px;
  border-radius: var(--radius);
}

.cta-section h2 {
  color: var(--color-dark);
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
}

.cta-section h2:after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background: var(--color-dark);
}

.cta-section p {
  max-width: 600px;
  margin: 0 auto 30px;
  color: var(--color-dark);
  opacity: 0.9;
}

.cta-btn {
  background: var(--color-dark);
  color: var(--color-light);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
}

.cta-btn:hover {
  background: var(--color-secondary);
  color: var(--color-dark);
  transform: translateY(-3px);
}

/* Footer */
footer {
  background-color: var(--color-dark);
  color: var(--color-light);
  padding: 60px 0 30px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
}

.footer-column h3 {
  font-size: 1.3rem;
  margin-bottom: 20px;
  position: relative;
  padding-bottom: 10px;
  color: var(--color-light);
}

.footer-column h3:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background: var(--color-primary);
}

.footer-column p {
  margin-bottom: 15px;
  color: var(--color-neutral);
}

.footer-column ul {
  list-style: none;
}

.footer-column ul li {
  margin-bottom: 10px;
}

.footer-column ul li a {
  color: var(--color-neutral);
  text-decoration: none;
  transition: var(--transition);
}

.footer-column ul li a:hover {
  color: var(--color-primary);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(157, 201, 199, 0.1);
  border-radius: 50%;
  color: var(--color-light);
  text-decoration: none;
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--color-primary);
  color: var(--color-dark);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(157, 201, 199, 0.1);
  color: var(--color-neutral);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  
  .package-card.popular {
    transform: scale(1);
  }
  
  .package-card.popular:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 768px) {
  .services-hero h1 {
    font-size: 2.5rem;
  }
  
  .services-hero p {
    font-size: 1rem;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .category-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab-btn {
    width: 200px;
    margin-bottom: 10px;
  }
  
  .hero-btn {
    display: block;
    width: 200px;
    margin: 10px auto;
  }
}

@media (max-width: 480px) {
  .services-hero {
    padding: 80px 0;
  }
  
  .services-hero h1 {
    font-size: 2rem;
  }
  
  .package-card {
    padding: 30px 20px;
  }
  
  .package-price {
    font-size: 2rem;
  }
}
</style>