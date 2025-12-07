<template>
  <section class="home-testimonials">
    <div class="container">
      <div class="section-header text-center mx-auto mb-5" style="max-width: 600px;">
        <p class="section-subtitle mb-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">Client's Review</p>
        <h1 class="display-6 mb-4 font-playfair" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          What Our Clients Say
        </h1>
      </div>

      <div class="testimonial-grid">
        <div class="testimonial-item" v-for="(review, idx) in reviews" :key="idx" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="300 + (idx * 150)">
          <div class="review-content">
            <div class="d-flex align-items-center mb-4">
              <v-avatar color="#fdf5eb" size="50" class="me-3">
                <span class="text-h6 font-weight-bold" style="color: #eaa636">{{ review.name.charAt(0) }}</span>
              </v-avatar>
              <div>
                <h5 class="mb-0 font-playfair">{{ review.name }}</h5>
                <div class="stars">
                  <v-icon icon="mdi-star" color="#eaa636" size="14" v-for="i in 5" :key="i"></v-icon>
                </div>
              </div>
            </div>
            <p class="mb-0 text-muted">"{{ review.text }}"</p>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="800">
        <router-link to="/review" class="explore-btn">
          View All Reviews
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const reviews = [
  {
    name: "Diya De",
    text: "Exquisite transformations await at this beauty parlour! Expert treatments, skilled stylists, and a welcoming atmosphere combine for an unforgettable pampering experience. Highly recommend!"
  },
  {
    name: "Shreya Mondal",
    text: "Thrilled with my hair service! The parlour's expertise shone through, leaving me with stunning results. A top-notch experience I'll rave about!"
  },
  {
    name: "Sujata Maity",
    text: "Oasis Makeover worked magic on my bridal look! Impeccable makeup that lasted all day. I felt truly radiant. Grateful for their exceptional artistry!"
  }
];
</script>

<style scoped>
.home-testimonials {
  padding: 80px 0;
  background-color: #fdf5eb;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-subtitle {
  color: #eaa636;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
}

.font-playfair {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  color: #1e1916;
}

.display-6 {
  font-size: 2.5rem;
  line-height: 1.2;
}

.text-center { text-align: center; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }
.mt-5 { margin-top: 3rem; }
.mb-0 { margin-bottom: 0; }
.me-3 { margin-right: 1rem; }

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.testimonial-item {
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.05);
  transition: transform 0.3s ease;
  height: 100%;
}

.testimonial-item:hover {
  transform: translateY(-5px);
}

.d-flex { display: flex; }
.align-items-center { align-items: center; }

.text-muted {
  color: #6c757d;
  font-style: italic;
  line-height: 1.6;
}

.stars {
  margin-top: 0.2rem;
}

.explore-btn {
  display: inline-block;
  padding: 12px 40px;
  background-color: transparent;
  color: #eaa636;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  border: 2px solid #eaa636;
  transition: all 0.3s ease;
}

.explore-btn:hover {
  background-color: #eaa636;
  color: #fff;
}

@media (max-width: 992px) {
  .testimonial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
