<script setup lang="ts">
import { provide, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const mobileMenuOpen = ref(false)
provide('mobileMenuOpen', mobileMenuOpen)
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar v-model:mobile-open="mobileMenuOpen" />
    <main>
      <RouterView />
    </main>
    <Footer />
  </div>
</template>
