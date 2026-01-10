<template>
  <div class="home-page">

    <!-- Header Start -->
    <div class="container-fluid hero-header bg-light mb-5">
      <div class="container">
        <div class="row g-5 align-items-center">
          <div class="col-lg-6" v-motion :initial="{ opacity: 0, x: -100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="100" :duration="1000">
            <p class="text-warning text-uppercase mb-2 font-weight-bold">Welcome To Oasis</p>
            <h1 class=" mb-3" style="font-weight: 800; font-size: 50px;">The Best Professional Beauty Premium & Academy</h1>
            <p>All Type of Bridal Makeup, Party Makeup, Weeding, Pre Weeding Makeup, Hair Stylish, Hair Smoothing, Spa done here.</p>
            <div class="flex align-items-center">
              <a href="service.html" class="btn btn-warning py-3 px-4 me-5 text-black">Explore More</a>
              <a href="https://wa.me/9932269688" class="btn btn-lg btn-success rounded-circle flex justify-content-center align-items-center" style="width: 50px; height: 50px;">
                <v-icon icon="mdi-whatsapp" size="30" color="white"></v-icon>
              </a>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="row g-3">
              <div class="col-6 text-end flex flex-col justify-end" v-motion :initial="{ opacity: 0, x: 100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="200" :duration="1000">
                <img class="img-fluid bg-white p-3 w-100 mb-3" src="/1.jpg" alt="Makeup Service">
                <img class="img-fluid bg-white p-3 w-50 self-end" src="/3.jpg" alt="Beauty Service">
              </div>
              <div class="col-6" v-motion :initial="{ opacity: 0, x: 100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="400" :duration="1000">
                  <img class="img-fluid bg-white p-3 w-40" src="/2.png" alt="Bridal Makeup">
                <img class="img-fluid bg-white p-3 mt-5 mb-3 h-56" src="/4.jpg" alt="Hair Service">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Header End -->

    <!-- About Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="row g-5">
          <div class="col-lg-6">
            <div class="row g-3 img-twice position-relative h-100" v-motion :initial="{ opacity: 0, x: -100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="100" :duration="1000">
              <div class="col-6">
                <img class="img-fluid bg-light p-3" src="/logocov.png" alt="About Oasis Makeover">
              </div>
              <div class="col-6 align-self-end">
                <img class="img-fluid bg-light p-3" src="/5.jpg" alt="Our Studio">
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="h-100" v-motion :initial="{ opacity: 0, x: 100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="300" :duration="1000">
              <p class="text-warning text-uppercase mb-2">About Us</p>
              <h1 class="display-6 mb-4">We Are Creative And Professional Makeup Studio & Academy</h1>
              <p>Welcome to Oasis, the premium beauty parlour in Tamluk! Our passion lies in transforming your look through stunning makeovers, exquisite hair designs, and rejuvenating skin treatments. With a team of skilled professionals, we not only offer top-notch services but also provide training to aspiring beauticians.</p>
              <p>Experience the epitome of beauty and let us make your visit to Oasis a truly unforgettable one. Discover the oasis of beauty today!</p>
              <div class="row g-2 mb-4">
                <div class="col-sm-6">
                  <i class="fa fa-check text-warning me-3"></i>Quality Work
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check text-warning me-3"></i>Premium Service
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check  text-warning me-3"></i>Online Booking
                </div>
                <div class="col-sm-6">
                  <i class="fa fa-check text-warning me-3"></i>Home Appointment
                </div>
              </div>
              <a class="btn btn-warning py-3 px-5 text-black " href="about.html">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- About End -->

    <!-- Why We Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center mx-auto" style="max-width: 500px;" v-motion :initial="{ opacity: 0, y: 50 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100" :duration="1000">
          <p class="text-warning text-uppercase mb-2">Why Choose Us!</p>
          <h1 class="display-6 mb-5">The Best Parlour You Have Ever Seen</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-4 col-md-6 pt-lg-5 rounded" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="200" :duration="1000">
            <div class="fact-item bg-light text-center h-100 p-5">
              <h3 class="text-warning mb-3">Best Service</h3>
              <span>Experience the ultimate in beauty services at Oasis. We are committed to providing our clients with the very best service and exceptional results.</span>
            </div>
          </div>
          <div class="col-lg-4 col-md-6" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="300" :duration="1000">
            <div class="fact-item bg-light text-center h-100 p-5">
              <h3 class="mb-3 text-warning">Premium Work</h3>
              <span>Experience the pinnacle of beauty at Oasis: where clients receive premium, top-quality services. Discover Tamluk's finest beauty parlour today.</span>
            </div>
          </div>
          <div class="col-lg-4 col-md-6 pt-lg-5" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="400" :duration="1000">
            <div class="fact-item bg-light text-center h-100 p-5">
              <h3 class="mb-3 text-warning">100% Satisfaction</h3>
              <span>At Oasis, we guarantee 100% client satisfaction. Experience our exceptional beauty services and leave feeling truly satisfied.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Why We End -->

    <!-- Service Start -->
    <div class="container-xxl bg-light py-5 my-5">
      <div class="container py-5">
        <div class="text-center mx-auto mb-5" style="max-width: 500px;" v-motion :initial="{ opacity: 0, y: 50 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100" :duration="1000">
          <p class="text-warning text-uppercase mb-2">Our Services</p>
          <h1 class="display-6 mb-4">We Provide Best Professional Services</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="200" :duration="1000">
            <div class="service-item flex flex-column bg-white p-3 pb-0">
              <div class="position-relative">
                <img class="img-fluid" src="/6.jpg" alt="Makeup Services">
                
              </div>
              <div class="text-center p-4">
                <h4>Makeup</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pt-lg-5" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="300" :duration="1000">
            <div class="service-item flex flex-column bg-white p-3 pb-0">
              <div class="position-relative">
                <img class="img-fluid" src="/7.jpg" alt="Hair Services">
              </div>
              <div class="text-center p-4">
                <h4>Hair</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="400" :duration="1000">
            <div class="service-item flex flex-column bg-white p-3 pb-0">
              <div class="position-relative">
                <img class="img-fluid" src="/8.jpg" alt="Skin Services">
                <!-- <div class="service-overlay">
                  <a class="btn btn-lg-square btn-outline-light rounded-circle" href="service.html#skin">
                    <i class="fa fa-link text-warning"></i>
                  </a>
                </div> -->
              </div>
              <div class="text-center p-4">
                <h4>Skin</h4>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6 pt-lg-5" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="500" :duration="1000">
            <div class="service-item flex flex-column bg-white p-3 pb-0">
              <div class="position-relative">
                <img class="img-fluid" src="/9.jpg" alt="Spa Services">
                <!-- <div class="service-overlay">
                  <a class="btn btn-lg-square btn-outline-light rounded-circle" href="service.html#spa">
                    <i class="fa fa-link text-warning"></i>
                  </a>
                </div> -->
              </div>
              <div class="text-center p-4">
                <h4>Spa</h4>
              </div>
            </div>
          </div>
        </div>
        <button class="btn btn-explore mt-4">Explore More</button>
      </div>
    </div>
    <!-- Service End -->

    <!-- Project Start -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center mx-auto mb-5" style="max-width: 500px;" v-motion :initial="{ opacity: 0, y: 50 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100" :duration="1000">
          <p class="text-warning text-uppercase mb-2">Our Works</p>
          <h1 class="display-6 mb-0">Discover Our Premium, Unique & Creative Works</h1>
        </div>
        <div class="row g-3">
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, x: -100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="200" :duration="1000">
            <div class="row g-3">
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/10.jpg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/11.jpeg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="300" :duration="1000">
            <div class="row g-3">
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/12.jpg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/13.jpg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="400" :duration="1000">
            <div class="row g-3">
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/14.jpg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/15.jpg" alt="Hair Cutting">
                  <div class="project-title h5 mb-0">Hair Cutting</div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-md-6" v-motion :initial="{ opacity: 0, x: 100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="500" :duration="1000">
            <div class="row g-3">
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/16.jpg" alt="Agamoni Look">
                  <div class="project-title h5 mb-0">Agamoni Look</div>
                </div>
              </div>
              <div class="col-12">
                <div class="project-item">
                  <img class="img-fluid" src="/17.jpg" alt="Bridal Makeup">
                  <div class="project-title h5 mb-0">Bridal</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="btn btn-explore mt-4">Explore More</button>
      </div>
    </div>
    <!-- Project End -->

    <!-- Testimonial Start (Static) -->
    <div class="container-xxl py-5">
      <div class="container">
        <div class="text-center mx-auto mb-5" style="max-width: 500px;" v-motion :initial="{ opacity: 0, y: 50 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="100" :duration="1000">
          <p class="text-warning text-uppercase mb-2">Client's Review</p>
        </div>
        <div class="testimonial-grid">
          <div class="testimonial-item bg-white p-4" v-motion :initial="{ opacity: 0, x: -100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="200" :duration="1000">
            <div class="flex align-items-center mb-4">
              <div class="ms-4">
                <h5 class="mb-1">Diya De</h5>
              </div>
            </div>
            <p class="mb-0">"Exquisite transformations await at this beauty parlour! Expert treatments, skilled stylists, and a welcoming atmosphere combine for an unforgettable pampering experience. Highly recommend!"</p>
          </div>
          <div class="testimonial-item bg-white p-4" v-motion :initial="{ opacity: 0, y: 100 }" :visibleOnce="{ opacity: 1, y: 0 }" :delay="300" :duration="1000">
            <div class="flex align-items-center mb-4">
              <div class="ms-4">
                <h5 class="mb-1">Shreya Mondal</h5>
              </div>
            </div>
            <p class="mb-0">"Thrilled with my hair service! The parlour's expertise shone through, leaving me with stunning results. A top-notch experience I'll rave about!"</p>
          </div>
          <div class="testimonial-item bg-white p-4" v-motion :initial="{ opacity: 0, x: 100 }" :visibleOnce="{ opacity: 1, x: 0 }" :delay="400" :duration="1000">
            <div class="flex align-items-center mb-4">
              <div class="ms-4">
                <h5 class="mb-1">Sujata Maity</h5>
              </div>
            </div>
            <p class="mb-0">"Oasis Makeover worked magic on my bridal look! Impeccable makeup that lasted all day. I felt truly radiant. Grateful for their exceptional artistry!"</p>
          </div>
        </div>

        <button class="btn btn-explore mt-4">Explore More</button>
      </div>
    </div>
    <!-- Testimonial End -->


  </div>
  <Footer/>
</template>

<script setup lang="ts">
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped>
/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');

/* --- CSS Reset & Base --- */
.home-page *,
.home-page *::before,
.home-page *::after {
  box-sizing: border-box;
}

.home-page {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #545454;
  background-color: #fff;
}

.home-page h1,
.home-page h2,
.home-page h3,
.home-page h4,
.home-page h5,
.home-page h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  line-height: 1.2;
  color: #1e1916;
}

.home-page h1 {
  font-size: calc(1.375rem + 1.5vw);
}

@media (min-width: 1200px) {
  .home-page h1 {
    font-size: 2.5rem;
  }
}

.home-page h3 {
  font-size: calc(1.3rem + 0.6vw);
}

@media (min-width: 1200px) {
  .home-page h3 {
    font-size: 1.75rem;
  }
}

.home-page h4 {
  font-size: calc(1.275rem + 0.3vw);
}

.home-page h5 {
  font-size: 1.25rem;
}

.home-page p {
  margin-top: 0;
  margin-bottom: 1rem;
}

.home-page a {
  color: #eaa636;
  text-decoration: none;
}

.home-page a:hover {
  color: #bb852b;
}

.home-page img {
  vertical-align: middle;
  max-width: 100%;
  height: auto;
}

/* --- Layout & Grid System (Flexbox) --- */
.container,
.container-fluid,
.container-xxl {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container,
  .container-xxl {
    max-width: 1140px;
  }
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-top: 0;
  margin-right: -15px;
  margin-left: -15px;
}

.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-top: 0;
}

/* Gutters */
.g-0,
.gx-0 {
  --bs-gutter-x: 0;
}

.g-0,
.gy-0 {
  --bs-gutter-y: 0;
}

.g-3 {
  margin-top: -1rem;
  margin-left: -1rem;
}

.g-3 > * {
  padding-top: 1rem;
  padding-left: 1rem;
}

.g-5 {
  margin-top: -3rem;
  margin-left: -3rem;
}

.g-5 > * {
  padding-top: 3rem;
  padding-left: 3rem;
}

/* Columns */
.col-6 {
  flex: 0 0 auto;
  width: 50%;
}

.col-12 {
  flex: 0 0 auto;
  width: 100%;
}

@media (min-width: 576px) {
  .col-sm-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}

@media (min-width: 768px) {
  .col-md-6 {
    flex: 0 0 auto;
    width: 50%;
  }
}

@media (min-width: 992px) {
  .col-lg-3 {
    flex: 0 0 auto;
    width: 25%;
  }

  .col-lg-4 {
    flex: 0 0 auto;
    width: 33.3333%;
  }

  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.6667%;
  }
}

/* --- Utilities --- */
.flex {
  display: flex !important;
}

.d-none {
  display: none !important;
}

.d-block {
  display: block !important;
}

.d-inline-block {
  display: inline-block !important;
}

@media (min-width: 576px) {
  .d-sm-block {
    display: block !important;
  }
}

@media (min-width: 768px) {
  .d-mflex {
    display: flex !important;
  }
}

@media (min-width: 992px) {
  .d-lg-block {
    display: block !important;
  }

  .d-lg-none {
    display: none !important;
  }

  .d-lg-flex {
    display: flex !important;
  }
}

.flex-column {
  flex-direction: column !important;
}

.justify-content-center {
  justify-content: center !important;
}

.justify-content-between {
  justify-content: space-between !important;
}

.justify-content-start {
  justify-content: flex-start !important;
}

.align-items-center {
  align-items: center !important;
}

.align-items-start {
  align-items: flex-start !important;
}

.align-self-end {
  align-self: flex-end !important;
}

.text-center {
  text-align: center !important;
}

.text-start {
  text-align: left !important;
}

.text-end {
  text-align: right !important;
}

@media (min-width: 768px) {
  .text-md-start {
    text-align: left !important;
  }
}

.text-warning {
  color: #eaa636 !important;
}

.text-primary {
  color: #eaa636 !important;
}

.text-white {
  color: #fff !important;
}

.text-dark {
  color: #1e1916 !important;
}

.text-uppercase {
  text-transform: uppercase !important;
}

.font-weight-bold {
  font-weight: 700 !important;
}

.fw-bold {
  font-weight: 700 !important;
}

.fw-normal {
  font-weight: 400 !important;
}

.bg-light {
  background-color: #fdf5eb !important;
}

.bg-white {
  background-color: #fff !important;
}

.bg-secondary {
  background-color: #545454 !important;
}

.bg-dark {
  background-color: #1e1916 !important;
}

.w-100 {
  width: 100% !important;
}

.w-50 {
  width: 50% !important;
}

.h-100 {
  height: 100% !important;
}

.vh-100 {
  height: 100vh !important;
}

.position-relative {
  position: relative !important;
}

.position-absolute {
  position: absolute !important;
}

.position-fixed {
  position: fixed !important;
}

.top-0 {
  top: 0 !important;
}

.top-50 {
  top: 50% !important;
}

.start-50 {
  left: 50% !important;
}

.translate-middle {
  transform: translate(-50%, -50%) !important;
}

.m-0 {
  margin: 0 !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mt-5 {
  margin-top: 3rem !important;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.me-3 {
  margin-right: 1rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}

.me-5 {
  margin-right: 3rem !important;
}

.me-auto {
  margin-right: auto !important;
}

.ms-2 {
  margin-left: 0.5rem !important;
}

.ms-3 {
  margin-left: 1rem !important;
}

.ms-4 {
  margin-left: 1.5rem !important;
}

.ms-auto {
  margin-left: auto !important;
}

.mx-auto {
  margin-left: auto !important;
  margin-right: auto !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.p-5 {
  padding: 3rem !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.py-5 {
  padding-top: 3rem !important;
  padding-bottom: 3rem !important;
}

.px-0 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

.px-3 {
  padding-left: 1rem !important;
  padding-right: 1rem !important;
}

.px-4 {
  padding-left: 1.5rem !important;
  padding-right: 1.5rem !important;
}

.px-5 {
  padding-left: 3rem !important;
  padding-right: 3rem !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pt-3 {
  padding-top: 1rem !important;
}

.pt-4 {
  padding-top: 1.5rem !important;
}

.pt-5 {
  padding-top: 3rem !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pb-3 {
  padding-bottom: 1rem !important;
}

.pb-4 {
  padding-bottom: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 3rem !important;
}

.ps-3 {
  padding-left: 1rem !important;
}

.ps-4 {
  padding-left: 1.5rem !important;
}

.ps-5 {
  padding-left: 3rem !important;
}

.pe-3 {
  padding-right: 1rem !important;
}

.pe-4 {
  padding-right: 1.5rem !important;
}

.pe-5 {
  padding-right: 3rem !important;
}

@media (min-width: 992px) {
  .py-lg-0 {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  .py-lg-5 {
    padding-top: 3rem !important;
    padding-bottom: 3rem !important;
  }

  .px-lg-5 {
    padding-left: 3rem !important;
    padding-right: 3rem !important;
  }

  .ps-lg-5 {
    padding-left: 3rem !important;
  }

  .pe-lg-5 {
    padding-right: 3rem !important;
  }

  .pt-lg-5 {
    padding-top: 3rem !important;
  }
}

.border {
  border: 1px solid #dee2e6 !important;
}

.border-top {
  border-top: 1px solid #dee2e6 !important;
}

.border-secondary {
  border-color: #545454 !important;
}

.border-warning {
  border-color: #eaa636 !important;
}

.rounded {
  border-radius: 0.25rem !important;
}

.rounded-circle {
  border-radius: 50% !important;
}

.rounded-pill {
  border-radius: 50rem !important;
}

/* --- Components: Buttons --- */
.btn {
  display: inline-block;
  font-weight: 500;
  line-height: 1.5;
  color: #545454;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  transition: all 0.5s ease;
}

.btn:hover {
  opacity: 0.9;
}

.btn-warning {
  color: #000;
  background-color: #eaa636;
  border-color: #eaa636;
}

.btn-warning:hover {
  color: #000;
  background-color: #d6942a;
  border-color: #d6942a;
}

.btn-success {
  color: #fff;
  background-color: #198754;
  border-color: #198754;
}

.btn-success:hover {
  color: #fff;
  background-color: #157347;
  border-color: #146c43;
}

.btn-outline-warning {
  color: #eaa636;
  border-color: #eaa636;
}

.btn-outline-warning:hover {
  color: #000;
  background-color: #eaa636;
  border-color: #eaa636;
}

.btn-outline-light {
  color: #fdf5eb;
  border-color: #fdf5eb;
}

.btn-outline-light:hover {
  color: #000;
  background-color: #fdf5eb;
  border-color: #fdf5eb;
}

.btn-link {
  font-weight: 400;
  color: #eaa636;
  text-decoration: none;
  padding: 0;
  border: 0;
}

.btn-link:hover {
  color: #bb852b;
  text-decoration: underline;
}

.btn-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

.btn-square {
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-sm-square {
  width: 32px;
  height: 32px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-lg-square {
  width: 48px;
  height: 48px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* --- Components: Navbar --- */
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  z-index: 1030;
  background-color: #000;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.navbar-brand {
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  white-space: nowrap;
}

.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.navbar-toggler:focus {
  outline: 0;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%28234, 166, 54, 1%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-collapse {
  flex-basis: 100%;
  flex-grow: 1;
  align-items: center;
}

.navbar-nav {
  display: flex;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.nav-link {
  display: block;
  padding: 0.5rem 1rem;
  color: #eaa636;
  font-weight: 600;
  font-size: 18px;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #ffd166;
}

.nav-item {
  margin: 0;
}

/* Mobile Navigation - Always visible for demo */
@media (max-width: 991.98px) {
  .navbar-collapse {
    display: block !important;
    background-color: #000;
    padding: 1rem;
    margin-top: 0.5rem;
  }

  .navbar-nav {
    flex-direction: column;
  }

  .nav-link {
    padding: 10px 0;
  }
}

@media (min-width: 992px) {
  .navbar-expand-lg {
    flex-wrap: nowrap;
    justify-content: space-between;
  }

  .navbar-expand-lg .navbar-nav {
    flex-direction: row;
  }

  .navbar-expand-lg .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
  }

  .navbar-expand-lg .navbar-toggler {
    display: none;
  }

  .navbar-expand-lg .nav-link {
    padding: 20px 15px;
  }
}

/* --- Components: Display --- */
.display-1 {
  font-size: calc(1.625rem + 4.5vw);
  font-weight: 300;
  line-height: 1.2;
}

.display-4 {
  font-size: calc(1.475rem + 2.7vw);
  font-weight: 300;
  line-height: 1.2;
}

.display-6 {
  font-size: calc(1.375rem + 1.5vw);
  font-weight: 300;
  line-height: 1.2;
}

@media (min-width: 1200px) {
  .display-1 {
    font-size: 5rem;
  }

  .display-4 {
    font-size: 3.5rem;
  }

  .display-6 {
    font-size: 2.5rem;
  }
}

/* --- Original Template CSS (Adapted) --- */
:root {
  --primary: #eaa636;
  --secondary: #545454;
  --light: #fdf5eb;
  --dark: #1e1916;
}

/*** Header ***/
/* .hero-header {
  padding-top: 100px;
} */

.btn-play {
  position: relative;
  display: block;
  box-sizing: content-box;
  width: 16px;
  height: 26px;
  border-radius: 100%;
  border: none;
  outline: none !important;
  padding: 18px 20px 20px 28px;
  background: var(--primary);
}

.btn-play:before {
  content: "";
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 60px;
  height: 60px;
  background: var(--primary);
  border-radius: 100%;
}

.btn-play:after {
  content: "";
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  display: block;
  width: 60px;
  height: 60px;
  background: var(--primary);
  border-radius: 100%;
}

.btn-play span {
  display: block;
  position: relative;
  z-index: 3;
  width: 0;
  height: 0;
  left: -1px;
  border-left: 16px solid #ffffff;
  border-top: 11px solid transparent;
  border-bottom: 11px solid transparent;
}

/*** Facts ***/
.fact-item {
  transition: 0.3s;
  border: 1px solid rgba(0, 0, 0, 0.125);
}

.fact-item:hover {
  margin-top: -10px;
  background: #ffffff !important;
  box-shadow: 0 0 45px rgba(0, 0, 0, 0.07);
}

/*** About ***/
.img-twice::before {
  position: absolute;
  content: "";
  width: 60%;
  height: 80%;
  top: 10%;
  left: 20%;
  border: 1rem solid var(--light);
  z-index: -1;
}

/*** Service ***/
.service-item {
  transition: 0.3s;
  overflow: hidden;
  position: relative;
}

.service-item:hover {
  margin-top: -10px;
  background: var(--primary) !important;
}

.service-item:hover * {
  color: var(--light) !important;
}

.service-overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: 0.5s;
}

.service-item:hover .service-overlay {
  opacity: 1;
}

/*** Project ***/
.project-item {
  position: relative;
  overflow: hidden;
  margin-bottom: 1rem;
}

.project-item .project-title {
  position: absolute;
  top: auto;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  padding: 1rem;
  text-align: center;
  background: #ffffff;
  transition: 0.5s;
  color: #1e1916;
}

.project-item:hover .project-title {
  color: #ffffff;
  background: var(--primary);
}

/*** Testimonial (Static) ***/
.testimonial-item {
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

/*** Footer ***/
.footer-background {
  background-color: #000;
}

@media (min-width: 992px) {
  .footer::after {
    position: absolute;
    content: "";
    width: 1px;
    height: 100%;
    top: 0;
    left: 50%;
    background: #333;
  }
}

.footer .btn.btn-link {
  display: block;
  margin-bottom: 5px;
  padding: 0;
  text-align: left;
  color: rgba(255, 255, 255, 0.5);
  font-weight: normal;
  text-transform: capitalize;
  transition: 0.3s;
}

.footer .btn.btn-link::before {
  position: relative;
  content: "\f105";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: rgba(255, 255, 255, 0.5);
  margin-right: 10px;
}

.footer .btn.btn-link:hover {
  color: var(--primary);
  letter-spacing: 1px;
  box-shadow: none;
}

/* Simple hover animations */
.animated {
  opacity: 1;
}

.slideInDown {
  animation: none;
}

.fadeIn {
  animation: none;
}

.fadeInUp {
  animation: none;
}

.wow {
  opacity: 1;
}

/* Image styling */
.img-fluid {
  max-width: 100%;
  height: auto;
}

.bg-white {
  background-color: #fff;
}

/* Simple grid for testimonials */
.testimonial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .testimonial-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Remove spinner */
#spinner {
  display: none;
}

/* Remove back to top */
.back-to-top {
  display: none !important;
}

/* Basic animations for hover effects */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 1s ease-in;
}


/* Explore More Button Styling */
.btn-explore {
  background: var(--primary);
  color: #1e1916;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 15px 40px;
  border-radius: 50px;
  border: none;
  position: relative;
  overflow: hidden;
  transition: all 0.4s ease;
  z-index: 1;
  box-shadow: 0 5px 15px rgba(234, 166, 54, 0.3);
}

.btn-explore::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0%;
  height: 100%;
  background-color: #635c58;
  transition: all 0.4s ease;
  z-index: -1;
  border-radius: 50px;
}

.btn-explore:hover {
  color: #fff;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(234, 166, 54, 0.5);
}

.btn-explore:hover::before {
  width: 100%;
}
</style>