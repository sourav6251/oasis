<template>
  <section class="home-services">
    <div class="container">
      <div class="section-header text-center mx-auto mb-5" style="max-width: 600px;">
        <p class="section-subtitle mb-2" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="800">Our Services</p>
        <h1 class="display-6 mb-4 font-playfair" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="200">
          We Provide Best Professional Services
        </h1>
      </div>

      <div class="services-row">
        <div class="service-col" v-for="(service, idx) in services" :key="idx" :class="{ 'pt-lg-5': idx % 2 !== 0 }" v-motion :initial="{ opacity: 0, y: 50 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="300 + (idx * 150)">
          <div class="service-item bg-white p-3 pb-0">
            <div class="position-relative">
              <img class="img-fluid" :src="service.img" :alt="service.title">
            </div>
            <div class="text-center p-4">
              <h4 class="font-playfair">{{ service.title }}</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5" v-motion :initial="{ opacity: 0, y: 20 }" :enter="{ opacity: 1, y: 0 }" :duration="1000" :delay="800">
        <router-link to="/service" class="explore-btn">
          Explore More
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const services = [
  { title: "Makeup", img: "/6.jpg" },
  { title: "Hair", img: "/7.jpg" },
  { title: "Skin", img: "/8.jpg" },
  { title: "Spa", img: "/9.jpg" }
];
</script>

<style scoped>
.home-services {
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
.p-3 { padding: 1rem; }
.p-4 { padding: 1.5rem; }
.pb-0 { padding-bottom: 0; }
.bg-white { background-color: #fff; }

.services-row {
  display: flex;
  flex-wrap: wrap;
  margin: -15px;
}

.service-col {
  width: 25%;
  padding: 15px;
}

.service-item {
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  transition: 0.3s;
  overflow: hidden;
  height: 100%;
}

.service-item:hover {
  transform: translateY(-10px);
  background: #eaa636 !important;
}

.service-item:hover h4 {
  color: #fff;
}

.position-relative {
  position: relative;
  overflow: hidden;
  border-radius: 4px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
  display: block;
  width: 100%;
  object-fit: cover;
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

.pt-lg-5 {
  padding-top: 3rem;
}

@media (max-width: 992px) {
  .service-col {
    width: 50%;
  }
  .pt-lg-5 {
    padding-top: 0;
  }
}

@media (max-width: 576px) {
  .service-col {
    width: 100%;
  }
}
</style>
