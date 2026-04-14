<template>
  <div class="privacy-policy">
    <!-- Background Decoration -->
    <div class="background-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <div class="policy-container">
      <!-- Header Section -->
      <div class="policy-header">
        <button class="back-button" @click="goBack">
          <v-icon icon="mdi-arrow-left" size="20"></v-icon>
          Back to Home
        </button>

        <div class="header-content">
          <h1
            v-motion-slide-visible-once-bottom
            :delay="100"
            :duration="800"
            class="main-title fleur"
          >
            Privacy Policy
          </h1>
          <p
            v-motion-slide-visible-once-bottom
            :delay="200"
            :duration="800"
            class="subtitle marck"
          >
            Your Trust Means Everything to Us
          </p>
          <div
            v-motion-slide-visible-once-bottom
            :delay="300"
            :duration="800"
            class="header-divider"
          >
            <span class="divider-line"></span>
            <v-icon icon="mdi-shield-check" size="24" color="var(--color-accent)"></v-icon>
            <span class="divider-line"></span>
          </div>
          <p
            v-motion-slide-visible-once-bottom
            :delay="400"
            :duration="800"
            class="last-updated"
          >
            Last Updated: {{ lastUpdated }}
          </p>
        </div>
      </div>

      <!-- Policy Content -->
      <div class="policy-content">
        <div class="content-grid">
          <!-- Main Content -->
          <div class="main-content">
            <section
              v-for="(section, idx) in allSections"
              :key="section.id"
              :id="section.id"
              v-motion-slide-visible-once-bottom
              :delay="100 * (idx + 1)"
              :duration="800"
              class="policy-section"
            >
              <div class="section-header">
                <div class="section-icon">
                  <v-icon :icon="section.icon" size="28"></v-icon>
                </div>
                <h2 class="section-title akaya">{{ section.title }}</h2>
              </div>
              <div class="section-content">
                <p v-if="section.id" class="section-text">{{ section.id }}</p>

                <!-- Dynamic Content Examples -->
                <div v-if="section.id === 'welcome'" class="lead-text patrick">
                  Welcome to <span class="highlight">{{ businessName }}</span>. 
                  We are committed to protecting your privacy.
                </div>

                <div v-if="section.id === 'collection'" class="info-cards">
                  <div
                    v-for="(item, index) in informationCollection"
                    :key="index"
                    v-motion-slide-visible-once-bottom
                    :delay="index * 100"
                    :duration="600"
                    class="info-card"
                  >
                    <div class="card-icon">
                      <v-icon :icon="item.icon" size="24"></v-icon>
                    </div>
                    <div class="card-content">
                      <h4 class="card-title">{{ item.title }}</h4>
                      <p class="card-desc">{{ item.description }}</p>
                    </div>
                  </div>
                </div>

                <div v-if="section.id === 'usage'" class="usage-grid">
                  <div
                    v-for="(use, index) in informationUses"
                    :key="index"
                    v-motion-slide-visible-once-bottom
                    :delay="index * 100"
                    :duration="600"
                    class="usage-item"
                  >
                    <div class="usage-number">{{ index + 1 }}</div>
                    <p class="usage-text">{{ use }}</p>
                  </div>
                </div>

                <div v-if="section.id === 'appointment'" class="highlight-card primary">
                  <div class="highlight-icon">
                    <v-icon icon="mdi-currency-usd" size="32"></v-icon>
                  </div>
                  <div class="highlight-content">
                    <h4 class="highlight-title">{{ paymentPolicy.title }}</h4>
                    <p class="highlight-desc">{{ paymentPolicy.description }}</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <!-- Sidebar -->
          <div class="sidebar">
            <div class="sidebar-card">
              <h3 class="sidebar-title fleur">Quick Links</h3>
              <div class="sidebar-links">
                <a
                  v-for="(section, idx) in sidebarSections"
                  :key="section.id"
                  href="javascript:void(0);"
                  @click="scrollToSection(section.id)"
                  v-motion-slide-visible-once-bottom
                  :delay="idx * 100"
                  :duration="500"
                  class="sidebar-link"
                >
                  <v-icon :icon="section.icon" size="18"></v-icon>
                  {{ section.title }}
                </a>
              </div>
            </div>

            <div class="contact-card">
              <h3 class="contact-title fleur">Need Help?</h3>
              <p class="contact-desc">We're here to answer your questions</p>
              <div class="contact-info">
                <div
                  v-for="(contact, index) in contactInfo"
                  :key="index"
                  v-motion-slide-visible-once-bottom
                  :delay="index * 100"
                  :duration="500"
                  class="contact-item"
                >
                  <v-icon :icon="contact.icon" size="18"></v-icon>
                  <span v-if="contact.type === 'text'">{{ contact.value }}</span>
                  <a v-else-if="contact.type === 'email'" :href="`mailto:${contact.value}`" class="contact-link">
                    {{ contact.value }}
                  </a>
                  <span v-else>{{ contact.value }}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      lastUpdated: 'December 15, 2023',
      businessName: 'Oasis Beauty Studio',
      websiteUrl: 'https://oasisbeauty.example.com',
      websiteDisplay: 'oasisbeauty.example.com',
      informationCollection: [
        { title: 'Book an Appointment', description: 'Includes your name, email, phone number, and service details.', icon: 'mdi-calendar-plus' },
        { title: 'Contact Us', description: 'When you fill out a contact form or email us.', icon: 'mdi-email' },
        { title: 'Post on Blog', description: 'If you comment or share content on our blog.', icon: 'mdi-comment-text' }
      ],
      informationUses: [
        'Process and confirm your appointments.',
        'Communicate about bookings, reminders, and offers.',
        'Improve our website, services, and experience.',
        'Comply with legal obligations and service quality.'
      ],
      paymentPolicy: { title: 'Payment for Appointment, Not Service', description: 'Secures a booking slot with our professional, not a service payment.' },
      contactInfo: [
        { type: 'text', value: 'Oasis Beauty Studio', icon: 'mdi-storefront' },
        { type: 'text', value: '123 Beauty Avenue, Tamluk', icon: 'mdi-map-marker' },
        { type: 'email', value: 'privacy@oasisbeauty.example.com', icon: 'mdi-email' },
        { type: 'text', value: 'Phone: (555) 123-4567', icon: 'mdi-phone' }
      ],
      sidebarSections: [
        { id: 'welcome', title: 'Introduction', icon: 'mdi-home-heart' },
        { id: 'collection', title: 'Information Collection', icon: 'mdi-account-details' },
        { id: 'usage', title: 'How We Use Info', icon: 'mdi-cog' },
        { id: 'appointment', title: 'Appointment Policy', icon: 'mdi-calendar-check' }
      ],
      allSections: [
        { id: 'welcome', title: 'Welcome to Our Family', icon: 'mdi-home-heart' },
        { id: 'collection', title: 'Information We Collect', icon: 'mdi-account-details' },
        { id: 'usage', title: 'How We Use Your Information', icon: 'mdi-cog' },
        { id: 'appointment', title: 'Appointment & Payment Policy', icon: 'mdi-calendar-check' }
      ]
    }
  },
  methods: {
    goBack() {
      this.$router ? this.$router.go(-1) : window.history.back();
    },
    scrollToSection(id: string) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
</script>

<style scoped>
html { scroll-behavior: smooth; }
.privacy-policy { min-height: 100vh; background: linear-gradient(135deg, #f0f5f3 0%, #ffffff 50%, #f0f5f3 100%); position: relative; overflow-x: hidden; }
/* ... keep all previous CSS here ... */


html {
  scroll-behavior: smooth;
}
.privacy-policy {
  min-height: 100vh;
  background: linear-gradient(135deg, var(--color-neutral) 0%, #ffffff 50%, var(--color-neutral) 100%);
  position: relative;
  overflow-x: hidden;
}

.background-blobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
}

.blob-1 {
  width: 300px;
  height: 300px;
  background: var(--color-primary);
  top: 10%;
  left: 5%;
}

.blob-2 {
  width: 250px;
  height: 250px;
  background: var(--color-secondary);
  top: 60%;
  right: 10%;
}

.blob-3 {
  width: 200px;
  height: 200px;
  background: var(--color-accent);
  bottom: 10%;
  left: 20%;
}

.policy-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  position: relative;
  z-index: 1;
}

/* Header Styles */
.policy-header {
  text-align: center;
  margin-bottom: 60px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: rgba(157, 201, 199, 0.1);
  border: 1px solid var(--color-primary);
  border-radius: 50px;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-bottom: 40px;
  cursor: pointer;
}

.back-button:hover {
  background: var(--color-primary);
  color: white;
  transform: translateX(-5px);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: 3.5rem;
  color: var(--color-primary);
  margin-bottom: 15px;
  line-height: 1.1;
}

.subtitle {
  font-size: 1.8rem;
  color: var(--color-dark);
  margin-bottom: 30px;
  opacity: 0.9;
}

.header-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 30px 0;
}

.divider-line {
  width: 80px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
}

.last-updated {
  font-size: 1rem;
  color: var(--color-accent);
  font-style: italic;
}

/* Content Layout */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 60px;
  align-items: start;
}

/* Main Content */
.main-content {
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.policy-section {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 30px rgba(42, 54, 59, 0.08);
  border: 1px solid rgba(157, 201, 199, 0.2);
  position: relative;
  overflow: hidden;
}

.policy-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent));
}

.section-header {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
}

.section-icon {
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

.section-title {
  font-size: 1.8rem;
  color: var(--color-dark);
  margin: 0;
}

.section-content {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.lead-text {
  font-size: 1.3rem;
  line-height: 1.5;
  color: var(--color-dark);
}

.highlight {
  color: var(--color-primary);
  font-weight: 600;
}

.text-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.text-link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.notice-box {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  padding: 20px;
  background: rgba(157, 201, 199, 0.1);
  border-radius: 12px;
  border-left: 4px solid var(--color-primary);
}

/* Information Cards */
.info-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: rgba(240, 245, 243, 0.5);
  border-radius: 12px;
  border: 1px solid rgba(157, 201, 199, 0.3);
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(42, 54, 59, 0.1);
}

.card-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--color-secondary), var(--color-accent));
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.card-content {
  flex: 1;
}

.card-title {
  font-size: 1.2rem;
  color: var(--color-dark);
  margin-bottom: 8px;
  font-weight: 600;
}

.card-desc {
  color: var(--color-dark);
  opacity: 0.8;
  line-height: 1.5;
}

.technical-note {
  padding: 20px;
  background: rgba(230, 200, 164, 0.1);
  border-radius: 12px;
  border-left: 4px solid var(--color-accent);
}

/* Usage Grid */
.usage-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.usage-item {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(157, 201, 199, 0.2);
}

.usage-number {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.usage-text {
  color: var(--color-dark);
  line-height: 1.5;
  margin: 0;
  padding-top: 8px;
}

/* Highlight Card */
.highlight-card {
  display: flex;
  align-items: center;
  gap: 25px;
  padding: 30px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(157, 201, 199, 0.1), rgba(157, 201, 199, 0.05));
  border: 1px solid rgba(157, 201, 199, 0.3);
}

.highlight-card.primary {
  background: linear-gradient(135deg, rgba(157, 201, 199, 0.15), rgba(157, 201, 199, 0.05));
}

.highlight-icon {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.highlight-content {
  flex: 1;
}

.highlight-title {
  font-size: 1.4rem;
  color: var(--color-primary);
  margin-bottom: 10px;
  font-weight: 600;
}

.highlight-desc {
  color: var(--color-dark);
  line-height: 1.5;
  margin: 0;
}

/* Subsection */
.subsection {
  margin-top: 40px;
}

.subsection-title {
  font-size: 1.5rem;
  color: var(--color-secondary);
  margin-bottom: 25px;
  text-align: center;
}

.policy-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 25px;
}

.policy-card {
  padding: 30px 25px;
  border-radius: 16px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.policy-card:hover {
  transform: translateY(-5px);
}

.policy-card.tier-1 {
  background: linear-gradient(135deg, rgba(157, 201, 199, 0.1), rgba(157, 201, 199, 0.05));
  border: 1px solid rgba(157, 201, 199, 0.3);
}

.policy-card.tier-2 {
  background: linear-gradient(135deg, rgba(255, 209, 200, 0.1), rgba(255, 209, 200, 0.05));
  border: 1px solid rgba(255, 209, 200, 0.3);
}

.policy-card.tier-3 {
  background: linear-gradient(135deg, rgba(230, 200, 164, 0.1), rgba(230, 200, 164, 0.05));
  border: 1px solid rgba(230, 200, 164, 0.3);
}

.policy-badge {
  position: absolute;
  top: 15px;
  right: 15px;
  padding: 6px 12px;
  background: var(--color-primary);
  color: white;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.policy-card.tier-2 .policy-badge {
  background: var(--color-secondary);
}

.policy-card.tier-3 .policy-badge {
  background: var(--color-accent);
}

.policy-title {
  font-size: 1.2rem;
  color: var(--color-dark);
  margin-bottom: 15px;
  font-weight: 600;
}

.policy-desc {
  color: var(--color-dark);
  opacity: 0.8;
  line-height: 1.5;
  margin: 0;
}

/* Disclaimer Cards */
.disclaimer-cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.disclaimer-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 25px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 12px;
  border: 1px solid rgba(230, 200, 164, 0.3);
}

.disclaimer-title {
  font-size: 1.1rem;
  color: var(--color-dark);
  margin-bottom: 8px;
  font-weight: 600;
}

.disclaimer-desc {
  color: var(--color-dark);
  opacity: 0.8;
  line-height: 1.5;
  margin: 0;
}

/* Sidebar */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: sticky;
  top: 100px;
}

.sidebar-card, .contact-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 30px rgba(42, 54, 59, 0.08);
  border: 1px solid rgba(157, 201, 199, 0.2);
}

.sidebar-title, .contact-title {
  font-size: 1.5rem;
  color: var(--color-primary);
  margin-bottom: 20px;
  text-align: center;
}

.sidebar-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px 20px;
  color: var(--color-dark);
  text-decoration: none;
  border-radius: 10px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.sidebar-link:hover {
  background: rgba(157, 201, 199, 0.1);
  border-color: var(--color-primary);
  transform: translateX(5px);
}

.contact-desc {
  text-align: center;
  color: var(--color-dark);
  opacity: 0.8;
  margin-bottom: 25px;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 15px;
  background: rgba(240, 245, 243, 0.5);
  border-radius: 10px;
  color: var(--color-dark);
}

.contact-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  
  .sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .policy-container {
    padding: 20px 15px;
  }
  
  .main-title {
    font-size: 2.5rem;
  }
  
  .subtitle {
    font-size: 1.4rem;
  }
  
  .policy-section {
    padding: 30px 25px;
  }
  
  .section-header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  .highlight-card {
    flex-direction: column;
    text-align: center;
  }
  
  .policy-cards {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
  }
  
  .policy-section {
    padding: 25px 20px;
  }
  
  .info-card, .disclaimer-card {
    flex-direction: column;
    text-align: center;
  }
  
  .sidebar-card, .contact-card {
    padding: 25px 20px;
  }
}
</style>