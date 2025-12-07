<template>
  <section class="home-hero">
    <div class="container">
      <div class="hero-content">
        <h2 class="welcome-text mb-2 font-weight-bold" v-motion :initial="{ opacity: 0, y: -20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">
          Welcome To Oasis
        </h2>
        <h1 class="main-title mb-3" v-motion :initial="{ opacity: 0, y: -50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          The Best Professional Beauty Premium & Academy
        </h1>
        <p class="description" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="400">
          All Type of Bridal Makeup, Party Makeup, Wedding, Pre Wedding Makeup, Hair Stylish, Hair Smoothing, Spa done here.
        </p>
        <div class="d-flex align-items-center gap-4" v-motion :initial="{ opacity: 0, y: 30 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="600">
          <router-link to="/service" class="explore-btn">
            Explore More
          </router-link>
          <a href="https://wa.me/9932269688" class="whatsapp-btn" target="_blank" rel="noopener noreferrer">
            <v-icon icon="mdi-whatsapp" size="28"></v-icon>
          </a>
        </div>
      </div>
      <div class="hero-images">
        <div class="grid-images">
          <div class="col-left">
            <div class="img-wrapper mb-4" v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000" :delay="200">
              <img class="img-fluid bg-white p-2" src="/1.jpg" alt="Makeup Service">
            </div>
            <div class="img-wrapper w-75 ml-auto" v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000" :delay="400">
              <img class="img-fluid bg-white p-2" src="/3.jpg" alt="Beauty Service">
            </div>
          </div>
          <div class="col-right">
            <div class="img-wrapper w-75" v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000" :delay="300">
              <img class="img-fluid bg-white p-2" src="/2.png" alt="Bridal Makeup">
            </div>
            <div class="img-wrapper mt-4" v-motion :initial="{ opacity: 0, x: 50 }" :enter="{ opacity: 1, x: 0 }" :duration="1000" :delay="500">
              <img class="img-fluid bg-white p-2 h-56" src="/4.jpg" alt="Hair Service">
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script logic needed for now
</script>

<style scoped>
.home-hero {
  padding: 80px 0;
  background: linear-gradient(135deg, #f0f5f3 0%, #ffffff 50%, #f0f5f3 100%);
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.welcome-text {
  color: #eaa636; /* Keeping the gold/orange accent but blending with new style */
  text-transform: uppercase;
  font-family: 'Open Sans', sans-serif;
  letter-spacing: 1px;
}

.main-title {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  font-size: 3.5rem;
  color: #2a363b;
  line-height: 1.2;
}

.description {
  font-size: 1.1rem;
  color: #545454;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.explore-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #eaa636;
  color: #000;
  text-decoration: none;
  font-weight: 600;
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid #eaa636;
}

.explore-btn:hover {
  background-color: transparent;
  color: #eaa636;
}

.whatsapp-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: #198754;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.whatsapp-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  background-color: #157347;
}

.hero-images {
  position: relative;
}

.grid-images {
  display: flex;
  gap: 15px;
}

.col-left, .col-right {
  display: flex;
  flex-direction: column;
  width: 50%;
}

.col-left {
  justify-content: flex-end;
}

.img-wrapper {
  background: white;
  border-radius: 4px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  transition: transform 0.3s ease;
  overflow: hidden;
}

.img-wrapper:hover {
  transform: translateY(-5px);
}

.img-fluid {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Utilities */
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 1rem; }
.mb-4 { margin-bottom: 1.5rem; }
.mt-4 { margin-top: 1.5rem; }
.gap-4 { gap: 1rem; }
.d-flex { display: flex; }
.align-items-center { align-items: center; }
.w-75 { width: 75%; }
.ml-auto { margin-left: auto; }
.p-2 { padding: 0.5rem; }

@media (max-width: 992px) {
  .container {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .hero-content {
    margin-bottom: 40px;
  }

  .d-flex {
    justify-content: center;
  }

  .col-left {
    align-items: flex-end;
  }
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
}
</style>
