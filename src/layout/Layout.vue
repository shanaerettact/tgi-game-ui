<script lang="ts" setup>
import { computed, provide, ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const isLaunch = computed(() => route.path == 'game-launch')

const mobileMenuOpen = ref(false);
provide('mobileMenuOpen', mobileMenuOpen);
</script>

<template>

  <div class="min-h-screen bg-background">
    <Navbar v-model:mobile-open="mobileMenuOpen" />
    <main>
      <RouterView />
    </main>
    <Footer v-if="!isLaunch" />
  </div>

</template>
