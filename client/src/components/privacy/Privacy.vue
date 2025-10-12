<template>
  <div class="privacy-policy">
    <div class="policy-card fade-in">
      <a href="#" class="back-button" @click.prevent="goBack">
        <i class="fas fa-arrow-left"></i>
        Back to Home
      </a>
      
      <h1 class="card-title">Privacy Policy</h1>
      <p class="last-updated">Last Updated: {{ lastUpdated }}</p>
      
      <div class="policy-content">
        <p>
          Welcome to <strong>{{ businessName }}</strong> ("we," "our," or "us"). 
          We are committed to protecting your privacy and ensuring the security of your personal information. 
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you 
          visit our website 
          <a :href="websiteUrl" target="_blank" class="link">
            {{ websiteDisplay }}
          </a> 
          and use our services, including booking appointments and interacting with our blog.
        </p>
        
        <p>
          Please read this privacy policy carefully. By using our website and services, you consent to the practices described below.
        </p>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-info-circle"></i>
            1. Information We Collect
          </h2>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul>
            <li v-for="(item, index) in informationCollection" :key="index">
              <strong>{{ item.title }}:</strong> {{ item.description }}
            </li>
          </ul>
          <p>
            We also automatically collect technical data such as IP address, browser type, and visited pages through cookies and similar technologies.
          </p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-cogs"></i>
            2. How We Use Your Information
          </h2>
          <ul>
            <li v-for="(use, index) in informationUses" :key="index">{{ use }}</li>
          </ul>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-calendar-check"></i>
            3. Appointment and Payment Policy
          </h2>
          <div class="highlight-box">
            <p>
              <strong>{{ paymentPolicy.title }}:</strong> {{ paymentPolicy.description }}
            </p>
          </div>
          
          <h3 class="section-heading" style="font-size: 1.1rem; margin-top: 1rem; border-left-color: var(--color-accent);">
            Cancellation and Refund Policy
          </h3>
          <ul>
            <li v-for="(policy, index) in cancellationPolicies" :key="index">
              <strong>{{ policy.title }}:</strong> {{ policy.description }}
            </li>
          </ul>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-file-alt"></i>
            4. User-Generated Content and Blog Disclaimer
          </h2>
          <p><strong>{{ blogDisclaimer.title }}:</strong> {{ blogDisclaimer.description }}</p>
          <p><strong>{{ blogDisclaimer.title2 }}:</strong> {{ blogDisclaimer.description2 }}</p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-share-alt"></i>
            5. Sharing Your Information
          </h2>
          <p>
            {{ sharingInfo }}
          </p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-shield-alt"></i>
            6. Data Security
          </h2>
          <p>
            {{ dataSecurity }}
          </p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-user-check"></i>
            7. Your Rights
          </h2>
          <p>
            {{ yourRights }}
          </p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-sync-alt"></i>
            8. Changes to This Privacy Policy
          </h2>
          <p>
            {{ policyChanges }}
          </p>
        </section>
        
        <section>
          <h2 class="section-heading">
            <i class="fas fa-envelope"></i>
            9. Contact Us
          </h2>
          <p>If you have any questions, please contact us at:</p>
          <ul style="list-style-type: none; padding-left: 0;">
            <li v-for="(contact, index) in contactInfo" :key="index">
              <span v-if="contact.type === 'text'">{{ contact.value }}</span>
              <a v-else-if="contact.type === 'email'" :href="`mailto:${contact.value}`" class="link">{{ contact.value }}</a>
              <span v-else>{{ contact.value }}</span>
            </li>
          </ul>
        </section>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PrivacyPolicy',
  data() {
    return {
      lastUpdated: 'October 15, 2023',
      businessName: 'Glamour Studio',
      websiteUrl: 'https://glamourstudio.example.com',
      websiteDisplay: 'glamourstudio.example.com',
      informationCollection: [
        {
          title: 'Book an Appointment',
          description: 'Includes your name, email address, phone number, and preferred service details.'
        },
        {
          title: 'Contact Us',
          description: 'When you fill out a contact form or communicate with us via email.'
        },
        {
          title: 'Post on our Blog',
          description: 'If you choose to comment or share content on our blog section.'
        }
      ],
      informationUses: [
        'Process and confirm your appointments.',
        'Communicate with you about bookings, reminders, and inquiries.',
        'Improve our website, services, and customer experience.',
        'Comply with legal obligations.'
      ],
      paymentPolicy: {
        title: 'Payment for Appointment, Not Service',
        description: 'Your payment secures a booking slot with our beauty professional — a reservation fee for time and availability, not a specific service payment.'
      },
      cancellationPolicies: [
        {
          title: 'Full Refund',
          description: 'Cancel within one hour of booking.'
        },
        {
          title: 'Partial Refund',
          description: 'Cancel more than one hour after booking but before the appointment time — 50% refund.'
        },
        {
          title: 'No Refund',
          description: 'No refund if canceled after the appointment time or for no-shows.'
        }
      ],
      blogDisclaimer: {
        title: 'Disclaimer of Endorsement',
        description: 'We do not necessarily endorse or verify the accuracy of user-submitted content on our blog.',
        title2: 'Use at Your Own Risk',
        description2: 'Blog content is for general information only and not a substitute for professional advice.'
      },
      sharingInfo: 'We never sell or rent your personal data. We may share non-identifiable, aggregated data with business partners or trusted third-party service providers who help operate our site, provided they maintain confidentiality.',
      dataSecurity: 'We use security measures to protect your data. However, no online transmission is 100% secure, and we cannot guarantee absolute protection.',
      yourRights: 'Depending on your location, you may have the right to access, correct, or delete your personal data. Contact us using the details below to exercise these rights.',
      policyChanges: 'We may update this Privacy Policy occasionally. Changes will be reflected by the updated "Last Updated" date above.',
      contactInfo: [
        { type: 'text', value: 'Glamour Studio' },
        { type: 'text', value: '123 Beauty Avenue, Suite 101' },
        { type: 'text', value: 'New York, NY 10001' },
        { type: 'email', value: 'info@glamourstudio.example.com' },
        { type: 'text', value: 'Phone: (555) 123-4567' }
      ]
    }
  },
  methods: {
    goBack() {
      // You can customize this method based on your routing setup
      this.$router ? this.$router.go(-1) : window.history.back();
    }
  }
}
</script>

<style scoped>
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-light: #ffffff;
  --shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  --radius: 16px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.privacy-policy {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 3rem 1.5rem;
  font-family: 'Poppins', sans-serif;
  background-color: var(--color-neutral);
  color: var(--color-dark);
  line-height: 1.6;
}

.policy-card {
  max-width: 900px;
  width: 100%;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  padding: 2.5rem;
  background-color: var(--color-light);
  position: relative;
  overflow: hidden;
}

.policy-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 6px;
  background: linear-gradient(90deg, var(--color-primary), var(--color-secondary), var(--color-accent));
}

.card-title {
  text-align: center;
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 0.5rem;
  position: relative;
}

.card-title::after {
  content: '';
  display: block;
  width: 80px;
  height: 3px;
  background-color: var(--color-accent);
  margin: 0.5rem auto 0;
}

.last-updated {
  text-align: center;
  font-style: italic;
  color: var(--color-accent);
  margin-bottom: 2rem;
  font-size: 0.95rem;
}

.policy-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-heading {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 1.5rem 0 0.75rem;
  padding-left: 0.75rem;
  border-left: 4px solid var(--color-secondary);
  color: var(--color-primary);
  display: flex;
  align-items: center;
}

.section-heading i {
  margin-right: 0.5rem;
  font-size: 1.2rem;
}

.policy-content p {
  margin-bottom: 0.5rem;
}

.policy-content ul {
  list-style-type: none;
  padding-left: 1.25rem;
}

.policy-content li {
  position: relative;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
}

.policy-content li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--color-accent);
  font-weight: bold;
}

.link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
  font-weight: 500;
}

.link:hover {
  color: var(--color-accent);
  text-decoration: underline;
}

.highlight-box {
  background-color: rgba(157, 201, 199, 0.1);
  border-left: 4px solid var(--color-primary);
  padding: 1rem 1.25rem;
  border-radius: 0 8px 8px 0;
  margin: 1rem 0;
}

.fade-in {
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(15px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.back-button:hover {
  color: var(--color-accent);
  transform: translateX(-5px);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .privacy-policy {
    padding: 1.5rem 1rem;
  }
  
  .policy-card {
    padding: 1.5rem;
  }
  
  .card-title {
    font-size: 1.75rem;
  }
  
  .section-heading {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .policy-card {
    padding: 1.25rem;
  }
  
  .card-title {
    font-size: 1.5rem;
  }
  
  .section-heading {
    font-size: 1.1rem;
  }
}
</style>