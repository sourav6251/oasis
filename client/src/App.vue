<!-- <script setup lang="ts">
import {  RouterView } from 'vue-router'
import Header from './components/common/Header.vue';
import { Toaster } from 'vue-sonner';
</script>

<template>
  <v-app>
    <v-main class="overflow-y-auto">
      <Header/>
    <RouterView />
      <Toaster closeButton  position="bottom-right"/>
    </v-main>
  </v-app>
</template> -->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/common/Header.vue';
import { Toaster } from 'vue-sonner'
</script>

<template>
  <v-app>
    <v-main class="overflow-y-auto">
      <Header />
      <RouterView />
      <!-- Vue Sonner toaster -->
      <Toaster position="bottom-right" />
    </v-main>
  </v-app>
</template>
