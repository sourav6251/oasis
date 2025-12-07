<template>
  <section class="about-us">
    <div class="container">
      <!-- Header Section -->
      <div class="about-header">
        <h1 class="main-title fleur" v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
          About Us
        </h1>
        <h2 class="subtitle marck" v-motion :initial="{ opacity: 0, y: -30 }" :enter="{ opacity: 1, y: 0 }" :duration="1200">
          Your Sanctuary of Beauty & Wellness
        </h2>
        <div class="divider" v-motion :initial="{ opacity: 0, scaleX: 0 }" :enter="{ opacity: 1, scaleX: 1 }" :duration="1200">
          <span class="divider-line"></span>
          <v-icon icon="mdi-flower" size="28"></v-icon>
          <span class="divider-line"></span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="about-content">
        <div class="content-grid">
          <!-- Text Content -->
          <div class="text-content">
            <p class="lead-text akaya" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
              Welcome to <span class="highlight">Oasis</span>, where beauty meets tranquility in the heart of Tamluk.
            </p>

            <div class="paragraphs">
              <p class="patrick text-black" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="0">
                We are proud to be the premier beauty destination in Tamluk. At Oasis, we blend artistry with wellness to offer you an unparalleled experience in beauty care.
              </p>
              <p class="patrick text-black" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
                Our team of certified professionals brings years of expertise in cutting-edge beauty techniques, ensuring you receive nothing but the finest care.
              </p>
              <p class="patrick text-black" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="400">
                Beyond exceptional services, we're committed to nurturing talent through our comprehensive training programs, empowering the next generation of beauty experts.
              </p>
              <p class="patrick text-black" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="600">
                Every visit to Oasis is a journey of transformation, where we help you discover your most radiant self in a serene and welcoming environment.
              </p>
            </div>
          </div>
          <!-- Stats Section -->
          <div class="stats-section">
            <div class="stat-card" v-for="(stat, idx) in stats" :key="stat.id" 
           
            >
              
              <div class="stat-icon">
                <v-icon :icon="stat.icon" size="32"></v-icon>
              </div>
              <div class="stat-content">
                <div class="stat-number">{{ stat.number }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Features Section -->
        <div class="features-section">
          <h3 class="features-title marck" v-motion :initial="{ opacity: 0, y: -30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
            Why Choose Oasis?
          </h3>
          <div class="features-grid">
            <div class="feature-card" v-for="(feature, idx) in features" :key="feature.id" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="idx * 150">
              <div class="feature-icon">
                <v-icon :icon="feature.icon" size="28"></v-icon>
              </div>
              <h4 class="feature-title akaya">{{ feature.title }}</h4>
              <p class="feature-desc patrick">{{ feature.description }}</p>
            </div>
          </div>
        </div>

        <!-- Mission & Values -->
        <div class="mission-section">
          <div class="mission-content">
            <div class="mission-text" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000">
              <h3 class="mission-title fleur">Our Promise</h3>
              <p class="mission-desc patrick">
                At Oasis, we believe true beauty comes from harmony between inner wellness and outer radiance.
                Our holistic approach combines premium treatments with personalized care, ensuring every client
                leaves feeling refreshed, confident, and beautifully transformed.
              </p>
            </div>
            <div class="mission-visual" v-motion :initial="{ opacity: 0, scale: 0.8 }" :enter="{ opacity: 1, scale: 1 }" :duration="1000" :delay="200">
              <div class="color-blob primary"></div>
              <div class="color-blob secondary"></div>
              <div class="color-blob accent"></div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000">
          <p class="cta-text marck">
            Ready to experience the Oasis difference? Join our family of beautiful, confident clients and discover why
            we're Tamluk's most trusted beauty sanctuary.
          </p>
          <p class="final-text fleur">Your journey to radiance begins here.</p>
          <div class="cta-buttons">
            <button class="cta-btn primary" @click="bookNow">
              <v-icon icon="mdi-calendar-check" size="20"></v-icon>
              Book Your Session
            </button>
            <button class="cta-btn secondary" @click="scrollToServices">
              <v-icon icon="mdi-spa" size="20"></v-icon>
              Explore Services
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface Stat {
  id: number;
  number: string;
  label: string;
  icon: string;
}

export default defineComponent({
  name: 'AboutUs',
  data() {
    return {
      features: [
        { id: 1, title: "Expert Professionals", description: "Certified specialists with years of experience in beauty and wellness", icon: "mdi-account-tie" },
        { id: 2, title: "Premium Products", description: "We use only the finest, cruelty-free products for your care", icon: "mdi-spa" },
        { id: 3, title: "Modern Techniques", description: "Latest beauty technologies and innovative treatment methods", icon: "mdi-flash" },
        { id: 4, title: "Personalized Care", description: "Tailored treatments designed specifically for your unique needs", icon: "mdi-heart" },
        { id: 5, title: "Hygienic Environment", description: "Spotless, sanitized spaces ensuring your safety and comfort", icon: "mdi-shield-check" },
        { id: 6, title: "Flexible Booking", description: "Easy online scheduling with flexible appointment options", icon: "mdi-calendar-clock" }
      ] as Feature[],
      stats: [
        { id: 1, number: "500+", label: "Happy Clients", icon: "mdi-account-group" },
        { id: 2, number: "50+", label: "Services", icon: "mdi-medical-bag" },
        { id: 3, number: "5+", label: "Years Experience", icon: "mdi-trophy" },
        { id: 4, number: "100%", label: "Satisfaction", icon: "mdi-star" }
      ] as Stat[]
    }
  },
  methods: {
    bookNow(): void { console.log('Book appointment clicked'); },
    scrollToServices(): void { console.log('Scroll to services clicked'); }
  }
});
</script>

<style scoped>
.about-us {
  /* Define CSS variables here instead of :root */
  --color-primary: #9dc9c7;
  --color-secondary: #ffd1c8;
  --color-accent: #e6c8a4;
  --color-dark: #2a363b;
  --color-neutral: #f8f9fa;
  
  padding: 80px 20px;
  background: linear-gradient(135deg, var(--color-neutral) 0%, #ffffff 50%, var(--color-neutral) 100%);
  position: relative;
  overflow: visible;
}

.about-us::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 20% 80%, rgba(157, 201, 199, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 209, 200, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(230, 200, 164, 0.05) 0%, transparent 50%);
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Header Styles */
.about-header {
  text-align: center;
  margin-bottom: 80px;
}

.main-title {
  font-size: 4rem;
  color: var(--color-primary);
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(42, 54, 59, 0.1);
  line-height: 1.1;
}

.subtitle {
  font-size: 2rem;
  color: var(--color-dark);
  margin-bottom: 30px;
  opacity: 0.9;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 40px 0;
}

.divider-line {
  width: 100px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

/* Content Grid */

.content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: start;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.lead-text {
  font-size: 1.8rem;
  color: var(--color-dark);
  line-height: 1.4;
  font-weight: 500;
}

.highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.accent-text {
  color: var(--color-secondary);
  font-weight: 600;
}

.paragraphs {
  display: flex;
  flex-direction: column;
  gap: 25px;
  min-height: 100px;
}

.paragraphs p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--color-dark);
  opacity: 0.8;
}

.text-black {
  color: #000000 !important;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
  min-height: 100px;
  visibility: visible; /* Ensure visibility */
  opacity: 1; /* Fallback for animation issues */
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(42, 54, 59, 0.08);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(157, 201, 199, 0.2);
  transition: all 0.3s ease;
  min-height: 80px; /* Ensure card has height */
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(42, 54, 59, 0.12);
}

.stat-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-content {
  flex: 1;
}

.stat-number {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-dark);
  opacity: 0.8;
  font-weight: 500;
}

/* Features Section */
.features-section {
  margin-bottom: 80px;
}

.features-title {
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-primary);
  margin-bottom: 50px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  padding: 40px 30px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 8px 30px rgba(42, 54, 59, 0.1);
  transition: all 0.3s ease;
  border: 1px solid rgba(157, 201, 199, 0.3);
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-accent));
}

.feature-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 40px rgba(42, 54, 59, 0.15);
}

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.feature-title {
  font-size: 1.4rem;
  color: var(--color-dark);
  margin-bottom: 15px;
  font-weight: 600;
}

.feature-desc {
  font-size: 1rem;
  color: var(--color-dark);
  opacity: 0.8;
  line-height: 1.6;
}

/* Mission Section */
.mission-section {
  margin-bottom: 80px;
}

.mission-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px;
  align-items: center;
  background: linear-gradient(135deg, rgba(157, 201, 199, 0.1), rgba(230, 200, 164, 0.1));
  padding: 60px;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
}

.mission-text {
  position: relative;
  z-index: 2;
}

.mission-title {
  font-size: 2.8rem;
  color: var(--color-primary);
  margin-bottom: 25px;
  line-height: 1.2;
}

.mission-desc {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--color-dark);
  opacity: 0.9;
}

.mission-visual {
  position: relative;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-blob {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  filter: blur(40px);
}

.color-blob.primary {
  width: 120px;
  height: 120px;
  background: var(--color-primary);
  top: 20px;
  left: 20px;
}

.color-blob.secondary {
  width: 100px;
  height: 100px;
  background: var(--color-secondary);
  bottom: 30px;
  right: 40px;
}

.color-blob.accent {
  width: 80px;
  height: 80px;
  background: var(--color-accent);
  top: 60px;
  right: 20px;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 80px 60px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 24px;
  color: white;
  position: relative;
  overflow: hidden;
}

.cta-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
}

.cta-text {
  font-size: 1.6rem;
  margin-bottom: 20px;
  line-height: 1.5;
  position: relative;
  z-index: 2;
}

.final-text {
  font-size: 2.2rem;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
  opacity: 0.95;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  position: relative;
  z-index: 2;
}

.cta-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.cta-btn.primary {
  background: white;
  color: var(--color-primary);
}

.cta-btn.primary:hover {
  background: var(--color-neutral);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
}

.cta-btn.secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.cta-btn.secondary:hover {
  background: white;
  color: var(--color-primary);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .mission-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .features-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }

  .stats-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .about-us {
    padding: 60px 15px;
  }

  .main-title {
    font-size: 3rem;
  }

  .subtitle {
    font-size: 1.6rem;
  }

  .lead-text {
    font-size: 1.4rem;
  }

  .cta-section {
    padding: 60px 30px;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }

  .cta-btn {
    min-width: 200px;
  }

  .mission-content {
    padding: 40px 30px;
  }

  .stats-section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2.5rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .stats-section {
    grid-template-columns: 1fr;
  }

  .cta-section {
    padding: 40px 20px;
  }

  .mission-content {
    padding: 30px 20px;
  }
}
</style>
