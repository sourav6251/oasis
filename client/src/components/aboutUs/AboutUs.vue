<template>
  <section class="about-us">
    <div class="container">
      <!-- Header Section -->
      <div class="about-header">
        <h1 class="main-title fleur-de-leah-regular">About Us</h1>
        <h2 class="subtitle marck-script-regular">We Are Creative And Professional Photographer</h2>
        <div class="divider">
          <span class="divider-line"></span>
          <i class="fas fa-camera"></i>
          <span class="divider-line"></span>
        </div>
      </div>

      <!-- Main Content -->
      <div class="about-content">
        <div class="content-grid">
          <!-- Text Content -->
          <div class="text-content">
            <p class="lead-text akaya-kanadaka-regular">
              Welcome to <span class="highlight">Oasis</span>, the ultimate destination for all your beauty needs in Tamluk.
            </p>
            
            <div class="paragraphs">
              <p class="bonbon-regular">
                We are the <span class="accent-text">best beauty parlour in Tamluk</span>. At Oasis, we offer a wide range of services, including stunning makeovers, innovative hair designs, rejuvenating skin treatments, and much more.
              </p>
              
              <p class="cursive">
                Our highly skilled and experienced team of professionals is dedicated to providing you with the highest level of service and ensuring your complete satisfaction.
              </p>

              <p class="kranky-regular">
                What sets Oasis apart is our commitment to continuous learning and growth. Not only do we provide exceptional services, but we also offer training programs for aspiring beauty enthusiasts.
              </p>

              <p class="splash-regular">
                With our comprehensive training, we empower individuals to excel in the beauty industry and create their own success stories.
              </p>
            </div>
          </div>

          <!-- Features Grid -->
          <div class="features-section">
            <h3 class="features-title marck-script-regular">Why Choose Oasis?</h3>
            <div class="features-grid">
              <div class="feature-card" v-for="feature in features" :key="feature.id">
                <div class="feature-icon">
                  <i :class="feature.icon"></i>
                </div>
                <h4 class="feature-title akaya-kanadaka-regular">{{ feature.title }}</h4>
                <p class="feature-desc bonbon-regular">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="cta-section">
          <p class="cta-text marck-script-regular">
            Join us at Oasis and discover a world of beauty and transformation. Experience the difference that sets us apart as we strive to become the best beauty parlour in Tamluk.
          </p>
          <p class="final-text fleur-de-leah-regular">Your beauty journey begins here.</p>
          <div class="cta-buttons">
            <button class="hero-btn hover:bg-[#9dc9c7bd]!" @click="bookNow">
              <i class="fas fa-calendar-check"></i>
              Book Appointment
            </button>
            <button class="hero-btn primary hover:bg-[#e6c8a4a2]!" @click="scrollToServices">
              <i class="fas fa-spa"></i>
              View Services
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

export default defineComponent({
  name: 'AboutUs',
  data() {
    return {
      features: [
        {
          id: 1,
          title: "Quality Work",
          description: "Exceptional craftsmanship in every service we provide",
          icon: "fas fa-award"
        },
        {
          id: 2,
          title: "Premium Service",
          description: "Luxurious experience with personalized attention",
          icon: "fas fa-crown"
        },
        {
          id: 3,
          title: "Online Booking",
          description: "Easy and convenient appointment scheduling",
          icon: "fas fa-mobile-alt"
        },
        {
          id: 4,
          title: "Home Appointment",
          description: "Professional services at your doorstep",
          icon: "fas fa-home"
        }
      ] as Feature[]
    }
  },
  methods: {
    bookNow(): void {
      // Implement booking logic
      console.log('Book appointment clicked');
    },
    scrollToServices(): void {
      // Implement scroll to services
      console.log('Scroll to services clicked');
    }
  }
});
</script>

<style scoped>
.about-us {
  padding: 80px 20px;
  background: linear-gradient(135deg, #fdfcfb 0%, #f5f7fa 100%);
  position: relative;
  overflow: hidden;
}

.about-us::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23e6c8a4' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E");
  opacity: 0.3;
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
  margin-bottom: 60px;
}

.main-title {
  font-size: 4.5rem;
  color: var(--color-gold);
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 2.2rem;
  color: var(--color-dark);
  margin-bottom: 30px;
}

.divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
}

.divider-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
}

.divider i {
  color: var(--color-gold);
  font-size: 1.5rem;
}

/* Content Grid */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
  align-items: start;
}

.text-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.lead-text {
  font-size: 1.8rem;
  color: var(--color-dark);
  line-height: 1.4;
}

.highlight {
  color: var(--color-gold);
  font-weight: bold;
}

.accent-text {
  color: var(--color-accent);
  font-weight: bold;
}

.paragraphs {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.paragraphs p {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
}

/* Features Section */
.features-section {
  background: rgba(255, 255, 255, 0.9);
  padding: 40px 30px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.features-title {
  font-size: 2.5rem;
  text-align: center;
  color: var(--color-gold);
  margin-bottom: 40px;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 25px;
}

.feature-card {
  text-align: center;
  padding: 25px 20px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid rgba(230, 200, 164, 0.3);
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 15px;
  background: linear-gradient(135deg, var(--color-gold), var(--color-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.8rem;
}

.feature-title {
  font-size: 1.4rem;
  color: var(--color-dark);
  margin-bottom: 10px;
}

.feature-desc {
  font-size: 0.95rem;
  color: #666;
  line-height: 1.5;
}

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 50px 0;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.cta-text {
  font-size: 1.6rem;
  color: var(--color-dark);
  margin-bottom: 20px;
  line-height: 1.5;
}

.final-text {
  font-size: 2.2rem;
  color: var(--color-gold);
  margin-bottom: 40px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1rem;
}

/* Responsive Design */
@media (max-width: 768px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .main-title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.8rem;
  }
  
  .lead-text {
    font-size: 1.4rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-btn {
    min-width: 200px;
  }
}

@media (max-width: 480px) {
  .about-us {
    padding: 40px 15px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.5rem;
  }
  
  .features-section {
    padding: 30px 20px;
  }
}
</style>