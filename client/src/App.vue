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
<script  lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/common/Header.vue';
import { Toaster } from 'vue-sonner'
import  { defineComponent } from 'vue';
export default defineComponent({
name:'App',
components:{Header,RouterView,Toaster},
setup(){
  return{}
}
})
</script>

<template>
  <v-app>
    <v-main class="overflow-y-auto">
      <Header/>
      <div class="mt-14">
        <RouterView />
      </div>
      <!-- Vue Sonner toaster -->
      <Toaster position="bottom-right" />
    </v-main>
  </v-app>
</template>
