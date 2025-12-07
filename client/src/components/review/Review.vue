<template>
  <div>
    <!-- ================= HERO SECTION ================= -->
    <section class="hero">
      <div class="container">
        <h1
          v-motion-slide-visible-once-bottom
          :delay="100"
          :duration="800"
          class="fleur"
        >
          Client Reviews
        </h1>

        <p
          v-motion-slide-visible-once-bottom
          :delay="200"
          :duration="800"
          class="subtitle marck"
        >
          Discover the stories behind our beautiful transformations
        </p>

        <div
          class="hero-stats"
          v-motion-slide-visible-once-bottom
          :delay="300"
        >
          <div class="stat-badge">
            <v-icon icon="mdi-star" color="var(--color-accent)" size="24" />
            <span>4.9/5 Average Rating</span>
          </div>

          <div class="stat-badge">
            <v-icon icon="mdi-account-group" color="var(--color-primary)" size="24" />
            <span>500+ Happy Clients</span>
          </div>
        </div>
      </div>

      <!-- Decorative Circles -->
      <div class="hero-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </section>

    <!-- ================= REVIEWS SECTION ================= -->
    <section class="reviews-section">
      <div class="container">
        <h2
          class="section-title"
          v-motion-slide-visible-once-bottom
          :delay="100"
        >
          What Our Clients Say
        </h2>

        <!-- Reviews Grid -->
        <div class="reviews-container">
          <div
            v-for="(review, index) in reviewData"
            :key="index"
            class="review-card"
            v-motion-slide-visible-once-bottom
            :delay="index * 100"
          >
            <div class="review-header">
              <img
                :src="review.image"
                alt="Client"
                class="client-image"
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
                readonly
                color="amber"
                half-increments
                density="compact"
              />
            </div>

            <p class="review-content">{{ review.text }}</p>
            <span class="service-tag">{{ review.service }}</span>

            <div class="review-meta">
              <span>{{ review.date }}</span>
            </div>
          </div>
        </div>

        <!-- Add Review Form -->
        <v-card
          class="add-review mx-auto"
          max-width="800"
          elevation="3"
          v-motion-pop-visible-once
          :delay="200"
        >
          <v-card-title class="text-center pt-6">
            <h3 class="text-h4 font-weight-bold">
              Share Your Experience
            </h3>
          </v-card-title>

          <v-card-text>
            <v-form @submit.prevent="submitReview" class="px-4 py-6">
              <v-row>
                <!-- Rating -->
                <v-col cols="12">
                  <label class="text-subtitle-1 mb-2 d-block">Your Rating</label>
                  <v-rating
                    v-model="form.rating"
                    color="amber"
                    half-increments
                    hover
                    size="large"
                  />
                </v-col>

                <!-- Service Select -->
                <v-col cols="12">
                  <v-select
                    v-model="form.service"
                    :items="services"
                    label="Service Received"
                    variant="outlined"
                    required
                    :rules="[v => !!v || 'Service is required']"
                    prepend-inner-icon="mdi-spa"
                  />
                </v-col>

                <!-- Review Text -->
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
                  />
                </v-col>

                <!-- Submit Button -->
                <v-col cols="12" class="text-center">
                  <v-btn
                    type="submit"
                    size="large"
                    color="var(--color-primary)"
                    class="px-8"
                    rounded="pill"
                    v-motion-pop-visible-once
                    :delay="400"
                  >
                    Submit Review
                    <v-icon end icon="mdi-send" />
                  </v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </div>
    </section>

    <!-- ================= STATS SECTION ================= -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-container">
          <div
            class="stat-item"
            v-motion-pop-visible-once
            :delay="100"
          >
            <h2>4.9</h2>
            <p>Average Rating</p>
          </div>

          <div
            class="stat-item"
            v-motion-pop-visible-once
            :delay="200"
          >
            <h2>500+</h2>
            <p>Happy Clients</p>
          </div>

          <div
            class="stat-item"
            v-motion-pop-visible-once
            :delay="300"
          >
            <h2>98%</h2>
            <p>Would Recommend</p>
          </div>

          <div
            class="stat-item"
            v-motion-pop-visible-once
            :delay="400"
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
import { defineComponent, ref } from 'vue'
import { reviews, type Review } from '@/sampleData/BlogData'

export default defineComponent({
  name: 'ClientReviews',

  setup() {
    const reviewData = ref<Review[]>([...reviews])
    const form = ref({
      name: '',
      email: '',
      rating: 0,
      service: '',
      review: '',
    })

    const services = [
      'Hair Services',
      'Makeup',
      'Skincare',
      'Nail Services',
      'Spa Treatments',
    ]

    const submitReview = () => {
      console.log('Form submitted:', form.value)
      form.value = { name: '', email: '', rating: 0, service: '', review: '' }
    }

    return {
      reviewData,
      form,
      services,
      submitReview,
    }
  },
})
</script>


<style scoped>
/* ================= VARIABLES ================= */
:root {
  --color-primary: #9dc9c7;
  --color-secondary: #ffd1c8;
  --color-accent: #e6c8a4;
  --color-neutral: #f0f5f3;
  --color-dark: #2a363b;
  --color-light: #ffffff;
  --transition: all 0.3s ease;
}

/* ================= GLOBAL STYLES ================= */
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

/* ================= HERO SECTION ================= */
.hero {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%);
  padding: 100px 0 80px;
  text-align: center;
  color: black;
  position: relative;
  overflow: hidden;
}

.hero h1 {
  font-size: 4rem;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(42, 54, 59, 0.3);
}

.subtitle {
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto 40px;
  opacity: 0.95;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-decoration {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
}

.circle-1 {
  width: 120px;
  height: 120px;
  top: 10%;
  left: 10%;
}

.circle-2 {
  width: 80px;
  height: 80px;
  top: 60%;
  right: 15%;
}

.circle-3 {
  width: 60px;
  height: 60px;
  bottom: 20%;
  left: 20%;
}

/* ================= REVIEWS SECTION ================= */
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

.section-title::after {
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

/* ================= ADD REVIEW FORM ================= */
.add-review {
  margin-top: 50px;
  background: var(--color-light);
}

.text-h4 {
  font-family: 'Playfair Display', serif;
  color: var(--color-dark);
}

/* ================= STATS SECTION ================= */
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

/* ================= RESPONSIVE ================= */
@media (max-width: 768px) {
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
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>
