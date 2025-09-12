<template>
  <div>


    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1
          v-motion
          :initial="{ opacity: 0, y: -50 }"
          :enter="{ opacity: 1, y: 0 }"
          :duration="1000"
        >Client Reviews</h1>
        <p
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="500"
          :duration="800"
        >See what our clients are saying about their experiences at our salon</p>
      </div>
    </section>

    <!-- Reviews Section -->
    <section class="reviews-section">
      <div class="container">
        <h2 class="section-title">What Our Clients Say</h2>
        <div class="reviews-container">
          <div 
            v-for="(review, index) in reviewData" 
            :key="index" 
            class="review-card"
            v-motion
            :initial="{ opacity: 0, y: 100 }"
            :enter="{ opacity: 1, y: 0 }"
            :delay="index * 200"
            :duration="800"
          >
            <div class="review-header">
              <img 
                :src="review.image" 
                alt="Client" 
                class="client-image"
                v-motion
                :initial="{ scale: 0 }"
                :enter="{ scale: 1 }"
                :delay="(index * 200) + 400"
              />
              <div class="client-info">
                <h3>{{ review.name }}</h3>
                <p>{{ review.service }}</p>
              </div>
            </div>
            <div class="rating">
              <v-rating
                v-model="review.rating"
                :length="5"
                :readonly="true"
                color="amber"
                half-increments
                density="compact"
              ></v-rating>
            </div>
            <p class="review-content">{{ review.text }}</p>
            <span class="service-tag">{{ review.service }}</span>
            <div class="review-meta">
              <span>{{ review.date }}</span>
              <!-- <span>
                <i :class="review.liked ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'" @click="toggleLike(index)"></i>
                {{ review.likes }}
              </span> -->
            </div>
          </div>
        </div>

        <!-- Add Review Form -->
        <v-card 
          class="add-review mx-auto" 
          max-width="800" 
          elevation="3"
          v-motion
          :initial="{ opacity: 0, y: 100, scale: 0.9 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :duration="1000"
        >
          <v-card-title class="text-center pt-6">
            <h3 
              class="text-h4 font-weight-bold"
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0 }"
              :delay="500"
            >Share Your Experience</h3>
          </v-card-title>
          
          <v-card-text>
            <v-form @submit.prevent="submitReview" class="px-4 py-6">
              <v-row>
                <!-- <v-col cols="12" md="6">
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
                </v-col> -->

                <v-col cols="12">
                  <label class="text-subtitle-1 mb-2 d-block">Your Rating</label>
                  <v-rating
                    v-model="form.rating"
                    color="amber"
                    half-increments
                    hover
                    size="large"
                  ></v-rating>
                </v-col>

                <v-col cols="12">
                  <v-select
                    v-model="form.service"
                    :items="services"
                    label="Service Received"
                    variant="outlined"
                    required
                    :rules="[v => !!v || 'Service is required']"
                    prepend-inner-icon="mdi-spa"
                  ></v-select>
                </v-col>

                <v-col cols="12">
                  <v-textarea
                    v-model="form.review"
                    label="Your Review"
                    variant="outlined"
                    rows="4"
                    counter="500"
                    :rules="[v => !!v || 'Review is required']"
                    required
                    prepend-inner-icon="mdi-comment"
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
                    Submit Review
                    <v-icon end icon="mdi-send"></v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
     
    </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-container">
          <div 
            class="stat-item"
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="200"
          >
            <h2>4.9</h2>
            <p>Average Rating</p>
          </div>
          <div 
            class="stat-item"
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="400"
          >
            <h2>500+</h2>
            <p>Happy Clients</p>
          </div>
          <div 
            class="stat-item"
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="600"
          >
            <h2>98%</h2>
            <p>Would Recommend</p>
          </div>
          <div 
            class="stat-item"
            v-motion
            :initial="{ opacity: 0, scale: 0.5 }"
            :enter="{ opacity: 1, scale: 1 }"
            :delay="800"
          >
            <h2>250+</h2>
            <p>5-Star Reviews</p>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script lang="ts">
import { reviews, type Review } from '@/sampleData/BlogData';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ClientReviews',
  components: {},
  setup() {
    const reviewData = ref<Review[]>([...reviews]);
    
    const form = ref({
      name: '',
      email: '',
      rating: 0,
      service: '',
      review: ''
    });

    const services = [
      'Hair Services',
      'Makeup',
      'Skincare',
      'Nail Services',
      'Spa Treatments'
    ];

    const buttonAnimation = ref({ scale: 1, rotate: 0 });
    
    const animateButton = () => {
      // Shake and scale animation
      buttonAnimation.value = { scale: 1.1, rotate: -5 };
      setTimeout(() => {
        buttonAnimation.value = { scale: 1.1, rotate: 5 };
        setTimeout(() => {
          buttonAnimation.value = { scale: 1, rotate: 0 };
        }, 100);
      }, 100);
    };

    const submitReview = () => {
      // Add your submission logic here
      console.log('Form submitted:', form.value);
      // Reset form after submission
      form.value = {
        name: '',
        email: '',
        rating: 0,
        service: '',
        review: ''
      };
      // Trigger button animation on submit
      animateButton();
    };

    return {
      reviewData,
      form,
      services,
      submitReview,
      buttonAnimation,
      animateButton
    };
  }
});
</script>


<style scoped>
:root {
  --color-primary: #9DC9C7;
  --color-secondary: #FFD1C8;
  --color-accent: #E6C8A4;
  --color-neutral: #F0F5F3;
  --color-dark: #2A363B;
  --color-light: #FFFFFF;
  --transition: all 0.3s ease;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: var(--color-dark);
  background-color: var(--color-neutral);
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
header {
  background-color: var(--color-light);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
}

.logo {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--color-primary);
}

.logo span {
  color: var(--color-accent);
}

nav ul {
  display: flex;
  list-style: none;
  gap: 30px;
}

nav a {
  text-decoration: none;
  color: var(--color-dark);
  font-weight: 500;
  transition: var(--transition);
}

nav a:hover {
  color: var(--color-primary);
}

/* Hero Section */
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

/* Reviews Section */
.reviews-section {
  padding: 80px 0;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  text-align: center;
  margin-bottom: 50px;
  color: var(--color-dark);
  position: relative;
}

.section-title:after {
  content: '';
  display: block;
  width: 60px;
  height: 3px;
  background: var(--color-primary);
  margin: 15px auto;
}

.reviews-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 50px;
}

.review-card {
  background: var(--color-light);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.08);
  transition: var(--transition);
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
}

.review-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.client-image {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 15px;
  border: 3px solid var(--color-primary);
}

.client-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
}

.client-info p {
  color: #777;
  font-size: 14px;
}

.rating {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.review-content {
  line-height: 1.8;
  color: #555;
}

.review-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  color: #999;
  font-size: 14px;
}

.service-tag {
  background: var(--color-secondary);
  color: var(--color-dark);
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  display: inline-block;
  margin-top: 15px;
}

/* Review Form */
.add-review {
  margin-top: 50px;
  background: var(--color-light);
}

.text-h4 {
  font-family: 'Playfair Display', serif;
  color: var(--color-dark);
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding: 60px 0;
  color: var(--color-light);
  text-align: center;
  margin-top: 80px;
}

.stats-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
}

.stat-item h2 {
  font-size: 42px;
  margin-bottom: 10px;
}

.stat-item p {
  font-size: 18px;
}

/* Footer */
footer {
  background: var(--color-dark);
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
  font-family: 'Playfair Display', serif;
  font-size: 22px;
  margin-bottom: 20px;
  color: var(--color-primary);
}

.footer-column p,
.footer-column a {
  color: #ccc;
  margin-bottom: 10px;
  display: block;
  text-decoration: none;
  transition: var(--transition);
}

.footer-column a:hover {
  color: var(--color-primary);
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-links a {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition);
}

.social-links a:hover {
  background: var(--color-primary);
  transform: translateY(-3px);
}

.copyright {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: #999;
}

/* Responsive Design */
@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    text-align: center;
  }

  nav ul {
    margin-top: 20px;
    justify-content: center;
  }

  .hero h1 {
    font-size: 36px;
  }

  .reviews-container {
    grid-template-columns: 1fr;
  }

  .stats-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 480px) {
  nav ul {
    flex-direction: column;
    gap: 10px;
  }

  .hero {
    padding: 60px 0;
  }

  .hero h1 {
    font-size: 28px;
  }

  .section-title {
    font-size: 28px;
  }

  .review-header {
    flex-direction: column;
    text-align: center;
  }

  .client-image {
    margin-right: 0;
    margin-bottom: 15px;
  }

  .stats-container {
    grid-template-columns: 1fr;
  }
}
</style>