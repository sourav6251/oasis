<template>
  <div>
    <!-- Services Hero -->
    <section class="services-hero">
      <div class="container">
        <h1 v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" class="fleur-de-leah-regular">
          Our Premium Services
        </h1>
        <p v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200" class="cursive">
          Indulge in our wide range of beauty treatments designed to enhance your natural beauty and boost your confidence.
        </p>
        <div class="hero-buttons" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="400">
          <button class=" hero-btn hover:bg-[#9dc9c7bd]!" @click="scrollToServices">View Services</button>
          <button class=" hero-btn hover:bg-[#e6c8a4a2]!" @click="bookNow">Book Appointment</button>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container">
      <!-- Category Tabs with Sliding Indicator -->
      <div class="category-tabs-container">
        <div class="category-tabs">
          <button
            v-for="(category, index) in categories"
            :key="category"
            class="tab-btn"
            :class="{ active: activeCategory === category }"
            @click="setActiveCategory(category, index)"
            v-motion :initial="{ opacity: 0, x: -20 }" :enter="{ opacity: 1, x: 0 }" :delay="index * 100"
            :ref="el => setTabButtonRef(el, index)"
          >
            {{ category }}
          </button>
          <!-- Sliding Indicator -->
          <div 
            class="tab-slider" 
            :style="tabSliderStyle"
          ></div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading services...</p>
      </div>

      <!-- Services Grid -->
      <div v-else-if="currentServices.length > 0" class="services-grid">
        <div
          v-for="(service, index) in currentServices"
          :key="service.id"
          class="service-card"
          v-motion-slide-visible-once-bottom
          :delay="index * 20"
        >
          <div class="service-img">
            <img :src="service.img" :alt="service.name" loading="lazy" />
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
        <i class="fas fa-search"></i>
        <p>No services found for {{ activeCategory }}.</p>
        <button class="hero-btn" @click="setActiveCategory('All', 0)">View All Services</button>
      </div>
    </div>

    <!-- Packages Section -->
    <section class="packages-section">
      <div class="container packages-container">
        <div class="section-title">
          <h2 v-motion-slide-visible-once-bottom :delay="100" class="splash-regular">
            Special Packages
          </h2>
          <p v-motion-slide-visible-once-bottom :delay="200">
            Save more with our bundled services designed to give you the ultimate beauty experience.
          </p>
        </div>

        <div class="packages-grid">
          <div
            v-for="(packageItem, index) in packages"
            :key="packageItem.id"
            class="package-card"
            :class="{ popular: packageItem.popular }"
            v-motion-pop-visible-once
            :delay="300 + index * 100"
          >
            <div v-if="packageItem.popular" class="popular-tag">MOST POPULAR</div>
            <h3>{{ packageItem.name }}</h3>
            <div class="package-price">
              {{ packageItem.price }}
              <span v-if="packageItem.originalPrice" class="original-price">{{ packageItem.originalPrice }}</span>
            </div>
            <ul class="package-features">
              <li v-for="feature in packageItem.features" :key="feature">
                <i class="fas fa-check"></i> {{ feature }}
              </li>
            </ul>
            <button class="package-btn" @click="bookPackage(packageItem)">Book Package</button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <h2 v-motion-slide-visible-once-bottom :delay="100" class="marck-script-regular">
          Ready for a Transformation?
        </h2>
        <p v-motion-slide-visible-once-bottom :delay="200">
          Book your appointment today and experience the Glamour Salon difference. Our expert team is ready to help you look and feel your best.
        </p>
        <button 
          class="cta-btn hover:backdrop-blur-2xl" 
          @click="bookNow"
          v-motion-slide-visible-once-bottom
          :delay="300"
        >
          Book Your Appointment
        </button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { ServiceData, ServicePackageData } from '@/sampleData/ServiceData';
import type { Service, ServicePackage } from '@/types/Services';
import { ref, computed, onMounted, nextTick } from 'vue';
import type { Ref } from 'vue';

export default {
  setup() {
    const activeCategory: Ref<string> = ref('All');
    const loading: Ref<boolean> = ref(true);
    const categories: Ref<string[]> = ref(['All', 'Hair', 'Skincare', 'Nails', 'Makeup', 'Spa']);
    const tabButtons = ref<(HTMLElement | null)[]>([]);
    const tabSliderPosition = ref<number>(0);
    const tabSliderWidth = ref<number>(0);
    const tabSliderHeight = ref<number>(0);
    const tabSliderTop = ref<number>(0);

    // Initialize services as an empty array first
    const services: Ref<Service[]> = ref([]);
    const packages: Ref<ServicePackage[]> = ref([]);

    // Computed property to get current category services
    const currentServices = computed(() => {
      if (activeCategory.value === 'All') {
        return services.value;
      }
      return services.value.filter(service => service.category === activeCategory.value);
    });

    // Computed property for tab slider style
    const tabSliderStyle = computed(() => {
      return {
        transform: `translateX(${tabSliderPosition.value}px)`,
        width: `${tabSliderWidth.value}px`,
        height: `${tabSliderHeight.value}px`,
        top: `${tabSliderTop.value}px`,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      };
    });

    // Load services data
    const loadServices = () => {
      // Simulate API call with setTimeout
      setTimeout(() => {
        services.value = ServiceData;
        loading.value = false;
      }, 100);
    };

    // Load packages data
    const loadPackages = () => {
      packages.value = ServicePackageData;
    };

    // Set tab button ref with proper typing
    const setTabButtonRef = (el: any, index: number) => {
      if (el instanceof HTMLElement) {
        tabButtons.value[index] = el;
      } else if (el && typeof el === 'object' && '$el' in el) {
        tabButtons.value[index] = el.$el as HTMLElement;
      } else {
        tabButtons.value[index] = null;
      }
    };

    // Update tab slider position
    const updateTabSliderPosition = async (index: number): Promise<void> => {
      await nextTick();
      
      const button = tabButtons.value[index];
      if (button) {
        const container = button.parentElement;
        
        if (container) {
          const buttonRect = button.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          
          tabSliderPosition.value = buttonRect.left - containerRect.left;
          tabSliderWidth.value = buttonRect.width;
          tabSliderHeight.value = buttonRect.height;
          tabSliderTop.value = buttonRect.top - containerRect.top;
        }
      }
    };

    const setActiveCategory = async (category: string, index: number): Promise<void> => {
      activeCategory.value = category;
      await updateTabSliderPosition(index);
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
      
      // Initialize slider position
      setTimeout(() => {
        updateTabSliderPosition(0);
      }, 100);
    });

    return {
      activeCategory,
      categories,
      services,
      currentServices,
      packages,
      loading,
      tabSliderStyle,
      setTabButtonRef,
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
/* Enhanced CSS with your color palette and mobile responsiveness */

:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-text: #2A363B;
  --color-light: #FFFFFF;
  --color-gold: #D4AF37;
  --color-silver: #C0C0C0;
  --color-border: #E0E0E0;
  --shadow: 0 4px 6px rgba(42, 54, 59, 0.1);
  --shadow-hover: 0 8px 15px rgba(42, 54, 59, 0.15);
  --radius: 8px;
  --transition: all 0.3s ease;
}

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

.loading-state {
  text-align: center;
  padding: 60px 20px;
  background: var(--color-light);
  border-radius: var(--radius);
  margin: 20px 0;
  color: var(--color-dark);
  box-shadow: var(--shadow);
}

.spinner {
  border: 4px solid var(--color-neutral);
  border-left-color: var(--color-primary);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.no-services {
  text-align: center;
  padding: 60px 20px;
  background: var(--color-light);
  border-radius: var(--radius);
  margin: 20px 0;
  color: var(--color-dark);
  box-shadow: var(--shadow);
}

.no-services i {
  font-size: 3rem;
  color: var(--color-primary);
  margin-bottom: 20px;
  display: block;
}

.no-services p {
  margin-bottom: 20px;
  font-size: 1.1rem;
}

.services-hero {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  color: var(--color-dark);
  text-align: center;
  padding: 80px 0;
  margin-bottom: 80px;
  border-radius: var(--radius);
  position: relative;
  overflow: hidden;
}
.services-hero:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover;
  opacity: 0.1;
  z-index: 0;
}

.services-hero h1 {
  font-size: clamp(2.2rem, 5vw, 3.5rem);
  margin-bottom: 20px;
  color: var(--color-gold);
  line-height: 1.2;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.services-hero p {
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  max-width: 700px;
  margin: 0 auto 30px;
  opacity: 0.95;
  padding: 0 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  color: var(--color-silver);
}

.hero-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  background: transparent;
  border: 2px solid var(--color-gold);
  color: var(--color-gold);
  padding: 12px 25px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: 
    all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.5s ease;
  flex: 0 1 auto;
  min-width: 160px;
  backdrop-filter: blur(10px);
  position: relative;
  transform-style: preserve-3d;
  perspective: 500px;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 12px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  animation: float 6s ease-in-out infinite;
}

.hero-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0) 50%,
    rgba(0, 0, 0, 0.1) 100%);
  border-radius: 28px;
  opacity: 0.6;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.hero-btn:hover {
  background: var(--color-gold);
  color: var(--color-dark);
  transform: 
    translateY(-6px) 
    rotateX(12deg) 
    scale(1.05);
  box-shadow: 
    0 12px 25px rgba(0, 0, 0, 0.2),
    0 16px 32px rgba(0, 0, 0, 0.15),
    inset 0 3px 0 rgba(255, 255, 255, 0.4);
  transition: 
    all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
    transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
    box-shadow 0.4s ease;
}

.hero-btn:hover::before {
  opacity: 0.9;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.3) 0%, 
    rgba(255, 255, 255, 0.1) 50%,
    rgba(0, 0, 0, 0.05) 100%);
}

.hero-btn:active {
  transform: 
    translateY(-2px) 
    rotateX(6deg) 
    scale(0.98);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.15),
    0 6px 12px rgba(0, 0, 0, 0.1),
    inset 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.hero-btn.primary {
  background: var(--color-gold);
  border-color: var(--color-gold);
  color: var(--color-dark);
  box-shadow: 
    0 4px 12px rgba(184, 134, 11, 0.3),
    0 6px 16px rgba(184, 134, 11, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.4);
  animation: float-gold 6s ease-in-out infinite;
}

.hero-btn.primary:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-dark);
  transform: 
    translateY(-6px) 
    rotateX(10deg) 
    scale(1.06);
  box-shadow: 
    0 15px 30px rgba(184, 134, 11, 0.5),
    0 20px 40px rgba(184, 134, 11, 0.4),
    inset 0 3px 0 rgba(255, 255, 255, 0.6);
}

.hero-btn.primary:active {
  transform: 
    translateY(-2px) 
    rotateX(5deg) 
    scale(0.98);
  box-shadow: 
    0 5px 10px rgba(184, 134, 11, 0.4),
    0 8px 16px rgba(184, 134, 11, 0.3),
    inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

/* Floating animation for subtle idle movement */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotateX(0deg);
  }
  50% {
    transform: translateY(-2px) rotateX(2deg);
  }
}

@keyframes float-gold {
  0%, 100% {
    transform: translateY(0px) rotateX(0deg);
    box-shadow: 
      0 4px 12px rgba(184, 134, 11, 0.3),
      0 6px 16px rgba(184, 134, 11, 0.2),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: translateY(-2px) rotateX(2deg);
    box-shadow: 
      0 6px 15px rgba(184, 134, 11, 0.4),
      0 8px 20px rgba(184, 134, 11, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.5);
  }
}

/* Focus states for accessibility */
.hero-btn:focus {
  outline: none;
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 6px 12px rgba(0, 0, 0, 0.08) !important;
}

.hero-btn.primary:focus {
  box-shadow: 
    0 4px 12px rgba(184, 134, 11, 0.3),
    0 6px 16px rgba(184, 134, 11, 0.2) !important;
}

/* Category Tabs with Sliding Indicator */
.category-tabs-container {
  margin-bottom: 40px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.category-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background: var(--color-light);
  border-radius: 50px;
  box-shadow: var(--shadow);
  width: fit-content;
  margin: 0 auto;
  flex-wrap: nowrap;
  position: relative;
}

.tab-btn {
  background: transparent;
  border: 2px solid transparent;
  padding: 12px 20px;
  border-radius: 30px;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  color: var(--color-dark);
  white-space: nowrap;
  flex-shrink: 0;
  text-align: center;
  position: relative;
  z-index: 2;
}

.tab-btn.active {
  color: var(--color-dark);
  font-weight: 600;
}

.tab-btn:hover:not(.active) {
  color: var(--color-primary);
}

/* Tab Sliding Indicator */
.tab-slider {
  position: absolute;
  top: 10px;
  left: 0;
  height: calc(100% - 20px);
  background: var(--color-primary);
  border-radius: 30px;
  z-index: 1;
  box-shadow: 0 2px 8px rgba(157, 201, 199, 0.3);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 25px;
  margin-bottom: 80px;
}

.service-card {
  background: var(--color-light);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: var(--transition);
  position: relative;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-neutral);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-hover);
}

.service-img {
  height: 220px;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
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
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: var(--shadow);
}

.service-content {
  padding: 25px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
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
  flex-wrap: wrap;
  gap: 10px;
}

.service-content p {
  color: var(--color-text);
  margin-bottom: 20px;
  font-size: 0.95rem;
  flex-grow: 1;
  opacity: 0.9;
}

.service-features {
  list-style: none;
  margin-bottom: 20px;
}

.service-features li {
  padding: 6px 0;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
}

.service-features li i {
  color: var(--color-primary);
  margin-right: 10px;
  flex-shrink: 0;
}

.service-btn {
  background: var(--color-secondary);
  color: var(--color-dark);
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
  margin-top: auto;
  border: 2px solid transparent;
}

.service-btn:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
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
  font-size: clamp(1.8rem, 4vw, 2.5rem);
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
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  padding: 0 15px;
  opacity: 0.9;
}

.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.package-card {
  background: var(--color-light);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  text-align: center;
  padding: 40px 25px;
  position: relative;
  transition: var(--transition);
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
}

.package-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-hover);
}

.package-card.popular {
  border-color: var(--color-accent);
  transform: scale(1.02);
  box-shadow: 0 10px 25px rgba(230, 200, 164, 0.3);
}

.popular-tag {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--color-accent);
  color: var(--color-dark);
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: var(--shadow);
}

.package-card h3 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: var(--color-dark);
}

.package-price {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.original-price {
  font-size: 1rem;
  color: var(--color-text);
  text-decoration: line-through;
  margin-left: 10px;
  display: inline-block;
  opacity: 0.7;
}

.package-features {
  list-style: none;
  margin-bottom: 30px;
  flex-grow: 1;
}

.package-features li {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-neutral);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.package-features li:last-child {
  border-bottom: none;
}

.package-features li i {
  color: var(--color-primary);
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
  margin-top: auto;
  border: 2px solid transparent;
}

.package-btn:hover {
  background: var(--color-accent);
  border-color: var(--color-accent);
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
  position: relative;
  overflow: hidden;
}

.cta-section:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80') center/cover;
  opacity: 0.1;
  z-index: 0;
}

.cta-section .container {
  position: relative;
  z-index: 1;
}

.cta-section h2 {
  color: var(--color-dark);
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
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
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  padding: 0 15px;
}

.cta-btn {
  background: #daccb1;
  color: var(--color-dark);
  border: none;
  padding: 12px 30px;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  min-width: 200px;
}

.cta-btn:hover {
  background: #daccb1ab;
  color: var(--color-light);
  transform: translateY(-3px);
}

/* Enhanced Responsive Design */
@media (max-width: 1200px) {
  .container {
    width: 95%;
  }
}

@media (max-width: 992px) {
  .services-grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }
  
  .package-card.popular {
    transform: scale(1);
  }
  
  .package-card.popular:hover {
    transform: translateY(-5px);
  }
  
  .packages-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
}

/* Mobile Layout for Tabs - Multi-row layout with sliding animation */
@media (max-width: 768px) {
  .services-hero {
    padding: 80px 0 60px;
  }
  
  .services-hero h1 {
    font-size: 2.2rem;
  }
  
  .services-hero p {
    font-size: 1rem;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .hero-btn {
    width: 200px;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  /* Multi-row tab layout for mobile with sliding animation */
  .category-tabs {
    flex-wrap: wrap;
    justify-content: center;
    gap: 8px;
    padding: 12px;
    border-radius: var(--radius);
    width: 100%;
    max-width: 500px;
  }
  
  .tab-btn {
    flex: 0 0 calc(33.333% - 8px);
    padding: 10px 15px;
    font-size: 0.9rem;
    position: relative;
    z-index: 2;
  }
  
  /* Make the last two items take 50% each in second row */
  .tab-btn:nth-child(4),
  .tab-btn:nth-child(5),
  .tab-btn:nth-child(6) {
    flex: 0 0 calc(50% - 8px);
  }
  
  /* Update slider for mobile - now it will move in 2D */
  .tab-slider {
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    /* We'll dynamically set position, width, height, and top via JavaScript */
  }
  
  .package-card {
    padding: 30px 20px;
  }
  
  .package-price {
    font-size: 2rem;
  }
}

@media (max-width: 576px) {
  .services-hero {
    padding: 60px 0 40px;
  }
  
  .services-hero h1 {
    font-size: 1.8rem;
  }
  
  .service-content {
    padding: 20px;
  }
  
  .service-content h3 {
    font-size: 1.2rem;
  }
  
  .service-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
  
  .packages-section,
  .cta-section {
    padding: 60px 0;
  }
  
  .package-card {
    padding: 25px 15px;
  }
  
  .package-price {
    font-size: 1.8rem;
  }
  
  .cta-btn {
    width: 100%;
    max-width: 250px;
  }
  
  /* Adjust tabs for very small screens */
  .category-tabs {
    gap: 6px;
    padding: 10px;
  }
  
  .tab-btn {
    padding: 8px 12px;
    font-size: 0.85rem;
    flex: 0 0 calc(33.333% - 6px);
  }
  
  .tab-btn:nth-child(4),
  .tab-btn:nth-child(5),
  .tab-btn:nth-child(6) {
    flex: 0 0 calc(50% - 6px);
  }
}

@media (max-width: 480px) {
  .services-hero {
    padding: 50px 0 30px;
  }
  
  .services-hero h1 {
    font-size: 1.6rem;
  }
  
  .service-img {
    height: 180px;
  }
  
  .package-card {
    padding: 20px 15px;
  }
  
  .package-price {
    font-size: 1.6rem;
  }
  
  /* Further adjust tabs for extra small screens */
  .category-tabs {
    gap: 5px;
    padding: 8px;
  }
  
  .tab-btn {
    padding: 8px 10px;
    font-size: 0.8rem;
    flex: 0 0 calc(33.333% - 5px);
  }
  
  .tab-btn:nth-child(4),
  .tab-btn:nth-child(5),
  .tab-btn:nth-child(6) {
    flex: 0 0 calc(50% - 5px);
  }
}

/* Touch device improvements */
@media (hover: none) {
  .service-card:hover {
    transform: none;
  }
  
  .service-card:active {
    transform: scale(0.98);
  }
  
  .tab-btn:active,
  .hero-btn:active,
  .service-btn:active,
  .package-btn:active,
  .cta-btn:active {
    transform: scale(0.95);
  }
}

/* Reduced motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  .tab-slider {
    transition: none !important;
  }
}
</style>