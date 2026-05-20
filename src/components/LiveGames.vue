<script setup lang="ts">
import GameGrid from './GameGrid.vue'
import BackToTop from './BackToTop.vue'
</script>

<template>
  <GameGrid category="live" title="真人" title-en="Live" :show-category-tabs="false" />
  <BackToTop />
</template>
