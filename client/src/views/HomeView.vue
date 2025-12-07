<template>
  <div class="home-page">
    <HomeHero />
    <HomeAbout />
    <HomeWhyUs />
    <HomeServices />
    <HomeProjects />
    <HomeTestimonials />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import HomeHero from '@/components/home/HomeHero.vue';
import HomeAbout from '@/components/home/HomeAbout.vue';
import HomeWhyUs from '@/components/home/HomeWhyUs.vue';
import HomeServices from '@/components/home/HomeServices.vue';
import HomeProjects from '@/components/home/HomeProjects.vue';
import HomeTestimonials from '@/components/home/HomeTestimonials.vue';
import Footer from '@/components/common/Footer.vue';
</script>

<style scoped>
/* Global styles for the home page wrapper if needed */
.home-page {
  overflow-x: hidden;
}
</style>
