<script setup lang="ts">
import GameGrid from './GameGrid.vue'
import BackToTop from './BackToTop.vue'
</script>

<template>
  <GameGrid category="sports" title="体育" title-en="Sports" :show-category-tabs="false" />
  <BackToTop />
</template>
