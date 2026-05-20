<script setup lang="ts">
import GameGrid from './GameGrid.vue'
import BackToTop from './BackToTop.vue'
</script>

<template>
  <GameGrid category="lottery" title="彩票" title-en="Lottery" :show-category-tabs="false" />
  <BackToTop />
</template>
