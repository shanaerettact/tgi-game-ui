<script setup lang="ts">
import router from '@/router';
import { useGameStore } from '@/store/module/game';
import { onMounted } from 'vue';

const gameStore = useGameStore()

onMounted(() => {
  if (!gameStore.gameUrl) router.push('/')
})
</script>

<template>
  <div class="game-page-container">
    <div class="game-wrap">
      <iframe
        :src="gameStore.gameUrl"
        title="Game"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<style scoped>
.game-page-container {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: calc(100vh - 64px);
  height: 100dvh;
  overflow: hidden;
  background: #000;
  margin-top: 64px;
}

.game-wrap {
  position: relative;
  box-sizing: border-box;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  background: #000;
}

@media (min-width: 1024px) {
  .game-page-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .game-wrap {
    width: min(100vw, calc(100dvh * 16 / 9));
    height: min(100dvh, calc(100vw * 9 / 16));
  }
}

@supports not (height: 100dvh) {
  .game-page-container {
    height: 100vh;
  }

  @media (min-width: 1024px) {
    .game-wrap {
      width: min(100vw, calc(100vh * 16 / 9));
      height: min(100vh, calc(100vw * 9 / 16));
    }
  }
}

.game-wrap iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
</style>
