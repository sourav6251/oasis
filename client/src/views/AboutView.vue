<template>
  <AboutUs/>
  <Footer/>
</template>

<script setup lang="ts">
import AboutUs from '@/components/aboutUs/AboutUs.vue';
import Footer from '@/components/common/Footer.vue';


</script>
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
