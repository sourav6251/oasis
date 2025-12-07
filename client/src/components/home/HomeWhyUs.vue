<template>
  <section class="home-why-us">
    <div class="container">
      <div class="section-header text-center mx-auto mb-5" style="max-width: 600px;">
        <p class="section-subtitle mb-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">Why Choose Us!</p>
        <h1 class="display-6 mb-4 font-playfair" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          The Best Parlour You Have Ever Seen
        </h1>
      </div>

      <div class="features-row">
        <div class="feature-col pt-lg-5" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="300">
          <div class="fact-item text-center h-100 p-5">
            <div class="icon-wrapper mb-3">
              <v-icon icon="mdi-star-circle" color="#eaa636" size="48"></v-icon>
            </div>
            <h3 class="mb-3 text-warning">Best Service</h3>
            <span class="text-muted">Experience the ultimate in beauty services at Oasis. We are committed to providing our clients with the very best service and exceptional results.</span>
          </div>
        </div>

        <div class="feature-col" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="500">
          <div class="fact-item text-center h-100 p-5">
            <div class="icon-wrapper mb-3">
              <v-icon icon="mdi-diamond-stone" color="#eaa636" size="48"></v-icon>
            </div>
            <h3 class="mb-3 text-warning">Premium Work</h3>
            <span class="text-muted">Experience the pinnacle of beauty at Oasis: where clients receive premium, top-quality services. Discover Tamluk's finest beauty parlour today.</span>
          </div>
        </div>

        <div class="feature-col pt-lg-5" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="700">
          <div class="fact-item text-center h-100 p-5">
            <div class="icon-wrapper mb-3">
              <v-icon icon="mdi-emoticon-happy" color="#eaa636" size="48"></v-icon>
            </div>
            <h3 class="mb-3 text-warning">100% Satisfaction</h3>
            <span class="text-muted">At Oasis, we guarantee 100% client satisfaction. Experience our exceptional beauty services and leave feeling truly satisfied.</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script logic needed
</script>

<style scoped>
.home-why-us {
  padding: 80px 0;
  background-color: #fff;
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
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mb-5 { margin-bottom: 3rem; }

.features-row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.feature-col {
  width: 33.333%;
  padding: 15px;
}

.fact-item {
  background-color: #fdf5eb;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  padding: 3rem;
  transition: 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fact-item:hover {
  margin-top: -10px;
  background: #ffffff;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);
}

.text-warning {
  color: #eaa636;
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
}

.text-muted {
  color: #6c757d;
  line-height: 1.6;
}

.pt-lg-5 {
  padding-top: 3rem;
}

@media (max-width: 992px) {
  .feature-col {
    width: 50%;
  }
  .pt-lg-5 {
    padding-top: 0;
  }
}

@media (max-width: 768px) {
  .feature-col {
    width: 100%;
  }
}
</style>
