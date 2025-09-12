<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1000"
        >Contact Us</h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="500"
          :duration="800"
        >Get in touch with us for any questions or appointments</p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <!-- Contact Information -->
          <div 
            class="contact-info"
            v-motion
            :initial="{ opacity: 0, x: -50 }"
            :enter="{ opacity: 1, x: 0 }"
            :delay="300"
          >
            <h2 class="section-title">Get In Touch</h2>
            <div 
              class="info-item"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
              :delay="400"
            >
              <v-icon icon="mdi-map-marker" color="var(--color-primary)" size="24"></v-icon>
              <div>
                <h3 v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1 }"
                    :delay="500">Visit Us</h3>
                <p v-motion
                   :initial="{ opacity: 0 }"
                   :enter="{ opacity: 1 }"
                   :delay="600">2nd Floor, Left Side of Rupasree Cinema Hall, Tamluk</p>
              </div>
            </div>
            <div 
              class="info-item"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
              :delay="600"
            >
              <v-icon icon="mdi-phone" color="var(--color-primary)" size="24"></v-icon>
              <div>
                <h3 v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1 }"
                    :delay="700">Call Us</h3>
                <p v-motion
                   :initial="{ opacity: 0 }"
                   :enter="{ opacity: 1 }"
                   :delay="800">9531500843 / 9932269688</p>
              </div>
            </div>
            <div 
              class="info-item"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
              :delay="800"
            >
              <v-icon icon="mdi-email" color="var(--color-primary)" size="24"></v-icon>
              <div>
                <h3 v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1 }"
                    :delay="900">Email Us</h3>
                <p v-motion
                   :initial="{ opacity: 0 }"
                   :enter="{ opacity: 1 }"
                   :delay="1000">oasismakeover@gmail.com</p>
              </div>
            </div>
            <div 
              class="info-item"
              v-motion
              :initial="{ opacity: 0, x: -50 }"
              :enter="{ opacity: 1, x: 0 }"
              :delay="1000"
            >
              <v-icon icon="mdi-clock" color="var(--color-primary)" size="24"></v-icon>
              <div>
                <h3 v-motion
                    :initial="{ opacity: 0 }"
                    :enter="{ opacity: 1 }"
                    :delay="1100">Opening Hours</h3>
                <p v-motion
                   :initial="{ opacity: 0 }"
                   :enter="{ opacity: 1 }"
                   :delay="1200">Open: Tue-Sun 9AM-7PM</p>
              </div>
            </div>
            <div 
              class="social-links"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :delay="1200"
            >
              <h3>Follow Us</h3>
              <div class="social-icons">
                <a href="#" class="social-icon">
                  <v-icon icon="mdi-facebook" color="var(--color-primary)"></v-icon>
                </a>
                <a href="#" class="social-icon">
                  <v-icon icon="mdi-instagram" color="var(--color-primary)"></v-icon>
                </a>
                <a href="#" class="social-icon">
                  <v-icon icon="mdi-twitter" color="var(--color-primary)"></v-icon>
                </a>
                <a href="#" class="social-icon">
                  <v-icon icon="mdi-pinterest" color="var(--color-primary)"></v-icon>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div 
            class="contact-form"
            v-motion
            :initial="{ opacity: 0, x: 50 }"
            :enter="{ opacity: 1, x: 0 }"
            :delay="500"
          >
            <v-card class="form-card">
              <v-card-title class="form-title">Send us a Message</v-card-title>
              <v-card-text>
                <v-form @submit.prevent="submitForm" class="form">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.name"
                        label="Your Name"
                        variant="outlined"
                        :rules="[v => !!v || 'Name is required']"
                        required
                        prepend-inner-icon="mdi-account"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="form.email"
                        label="Email Address"
                        variant="outlined"
                        type="email"
                        :rules="[v => !!v || 'Email is required', v => /.+@.+\..+/.test(v) || 'Email must be valid']"
                        required
                        prepend-inner-icon="mdi-email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="form.phone"
                        label="Phone Number"
                        variant="outlined"
                        prepend-inner-icon="mdi-phone"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-select
                        v-model="form.subject"
                        :items="subjects"
                        label="Subject"
                        variant="outlined"
                        prepend-inner-icon="mdi-help-circle"
                      ></v-select>
                    </v-col>
                    <v-col cols="12">
                      <v-textarea
                        v-model="form.message"
                        label="Your Message"
                        variant="outlined"
                        rows="4"
                        :rules="[v => !!v || 'Message is required']"
                        required
                        prepend-inner-icon="mdi-message"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" class="text-center">
                      <v-btn
                        type="submit"
                        size="large"
                        color="var(--color-primary)"
                        class="px-8"
                        rounded="pill"
                        v-motion
                        @click="animateButton"
                        :initial="{ scale: 1, rotate: 0 }"
                        :enter="buttonAnimation"
                      >
                        Send Message
                        <v-icon end icon="mdi-send"></v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </div>
        </div>

        <!-- Map Section -->
        <div 
          class="map-section"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="700"
        >
          <h2 class="section-title">Find Us</h2>
          <div class="map-container">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d366.42324932308657!2d88.68091799580972!3d22.606555644676863!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02070071efcef7%3A0x988499263ccb9b78!2sRupashree%20Cinema%20hall!5e0!3m2!1sen!2sin!4v1757653176008!5m2!1sen!2sin" 
            width="100%" 
            height="450"
             style="border:0;"
              :allowfullscreen="true"
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade">

            </iframe>
            <!-- <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3693.8930376090735!2d87.91695237375567!3d22.2978144793269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a026623b60598f7%3A0x8e2493763b6a47f4!2sRupasree%20Cinema%20Hall!5e0!3m2!1sen!2sin!4v1694510049099!5m2!1sen!2sin"
              width="100%"
              height="450"
              style="border:0;"
              :allowfullscreen="true"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> -->
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ContactPage',
  setup() {
    const form = ref({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });

    const subjects = [
      'General Inquiry',
      'Appointment Question',
      'Service Information',
      'Pricing Query',
      'Feedback',
      'Other'
    ];

    const buttonAnimation = ref({ scale: 1, rotate: 0 });
    
    const animateButton = () => {
      buttonAnimation.value = { scale: 1.1, rotate: -5 };
      setTimeout(() => {
        buttonAnimation.value = { scale: 1.1, rotate: 5 };
        setTimeout(() => {
          buttonAnimation.value = { scale: 1, rotate: 0 };
        }, 100);
      }, 100);
    };

    const submitForm = () => {
      console.log('Form submitted:', form.value);
      // Add your form submission logic here
      form.value = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      };
      animateButton();
    };

    return {
      form,
      subjects,
      submitForm,
      buttonAnimation,
      animateButton
    };
  }
});
</script>

<style scoped>
.contact-page {
  background-color: var(--color-neutral);
}

.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding: 80px 0;
  text-align: center;
  color: var(--color-light);
}

.hero h1 {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  margin-bottom: 20px;
}

.hero p {
  font-size: 18px;
  max-width: 700px;
  margin: 0 auto;
}

.contact-section {
  padding: 80px 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 40px;
  margin-bottom: 60px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: var(--color-dark);
  margin-bottom: 30px;
}

.contact-info {
  padding: 30px;
  background: var(--color-light);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 25px;
}

.info-item h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--color-dark);
}

.info-item p {
  color: #666;
  line-height: 1.6;
}

.social-links h3 {
  margin-bottom: 15px;
  font-size: 18px;
  color: var(--color-dark);
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(157, 201, 199, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.social-icon:hover {
  background: var(--color-primary);
  transform: translateY(-3px);
}

.social-icon:hover i {
  color: var(--color-light) !important;
}

.form-card {
  padding: 30px;
  border-radius: 15px !important;
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: var(--color-dark);
  text-align: center;
  margin-bottom: 20px;
}

.map-section {
  margin-top: 60px;
}

.map-container {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .hero h1 {
    font-size: 36px;
  }

  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .hero h1 {
    font-size: 28px;
  }

  .info-item {
    flex-direction: column;
    text-align: center;
  }

  .social-icons {
    justify-content: center;
  }
}
</style>