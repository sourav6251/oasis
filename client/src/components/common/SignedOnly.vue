<script setup lang="ts">
import { useUserStore } from '@/stores/userStore';

const userStore = useUserStore();

</script>

<template>
  <slot v-if="userStore.getIsLogin"></slot>
</template>
