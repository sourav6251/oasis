<template>
  <section class="home-about">
    <div class="container">
      <div class="about-grid">
        <div class="images-col">
          <div class="row g-3 img-twice position-relative h-100">
            <div class="col-6" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000">
              <img class="img-fluid bg-light p-3 shadow-lg rounded" src="/logocov.png" alt="About Oasis Makeover">
            </div>
            <div class="col-6 align-self-end" v-motion :initial="{ opacity: 0, x: -50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000" :delay="200">
              <img class="img-fluid bg-light p-3 shadow-lg rounded" src="/5.jpg" alt="Our Studio">
            </div>
          </div>
        </div>
        <div class="content-col">
          <div class="h-100">
            <p class="section-subtitle mb-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">About Us</p>
            <h1 class="display-6 mb-4 font-playfair" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
              We Are Creative And Professional Makeup Studio & Academy
            </h1>
            <p class="mb-4 text-muted" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="400">
              Welcome to Oasis, the premium beauty parlour in Tamluk! Our passion lies in transforming your look through stunning makeovers, exquisite hair designs, and rejuvenating skin treatments. With a team of skilled professionals, we not only offer top-notch services but also provide training to aspiring beauticians.
            </p>
            <p class="mb-4 text-muted" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="500">
              Experience the epitome of beauty and let us make your visit to Oasis a truly unforgettable one. Discover the oasis of beauty today!
            </p>

            <div class="features-grid mb-4">
              <div class="feature-item" v-for="(feature, idx) in features" :key="idx" v-motion :initial="{ opacity: 0, y: 10 }" :enter="{ opacity: 1, y: 0 }" :duration="800" :delay="600 + (idx * 100)">
                <v-icon icon="mdi-check-circle" color="#eaa636" class="me-2"></v-icon>
                <span>{{ feature }}</span>
              </div>
            </div>

            <router-link to="/about" class="read-more-btn" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="800">
              Read More
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  "Quality Work",
  "Premium Service",
  "Online Booking",
  "Home Appointment"
];
</script>

<style scoped>
.home-about {
  padding: 80px 0;
  background-color: #fff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.images-col {
  position: relative;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
}

.col-6 {
  width: 50%;
  padding: 10px;
}

.align-self-end {
  align-self: flex-end;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  display: block;
}

.bg-light {
  background-color: #fdf5eb;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0,0,0,.175);
}

.rounded {
  border-radius: 0.25rem;
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

.text-muted {
  color: #6c757d;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.feature-item {
  display: flex;
  align-items: center;
  font-weight: 500;
  color: #1e1916;
}

.me-2 {
  margin-right: 0.5rem;
}

.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1.5rem; }

.read-more-btn {
  display: inline-block;
  padding: 12px 40px;
  background-color: #eaa636;
  color: #1e1916;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.read-more-btn:hover {
  background-color: #d6942a;
  color: #fff;
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .images-col {
    margin-bottom: 40px;
  }
}
</style>
