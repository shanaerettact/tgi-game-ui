<script setup lang="ts">
import { cn } from '@/lib/utils'
import { useGameStore } from '@/store/module/game';

const gameStore = useGameStore()

export interface Game {
  gameId: string
  name: string
  image: string
}

export interface BrandItem {
  src: string
  alt: string
  label: string
  gameKey: string
  productId: string
}

const props = defineProps<{
  game?: Game
  brand?: BrandItem
  active?: boolean
}>()

const fallbackImage = '/images/newgame.png'

function useFallbackImage(event: Event) {
  const img = event.currentTarget as HTMLImageElement

  if (img.src.endsWith(fallbackImage)) return

  img.src = fallbackImage
}
</script>

<template>
  <div
    v-if="brand"
    class="group flex cursor-pointer flex-col items-center gap-1 rounded-lg border p-1.5 transition-all duration-200 sm:gap-1.5 sm:p-2"
    :class="
      cn(
        props.active
          ? 'border-primary bg-card shadow-sm ring-1 ring-primary/25'
          : 'border-border/80 bg-muted/50 hover:border-primary/35 hover:bg-muted/80',
      )
    "
  >
    <div
      class="flex h-12 w-full items-center justify-center overflow-hidden rounded-md sm:w-[100%]"
    >
      <img
        :src="brand.src"
        :alt="brand.alt"
        class="h-10 w-auto max-w-[85%] object-contain transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:max-w-[100%]"
      />
    </div>
  </div>

  <div
    v-else-if="game"
    class="group flex cursor-pointer flex-col items-center p-3 transition-all duration-200 hover:border-primary/40"
    @click="gameStore.gameLaunch(game.gameId)"
  >
    <div
      class="flex  w-full items-center justify-center rounded-lg p-1"
    >
      <img
        :src="game.image"
        :alt="game.name"
        @error="useFallbackImage"
        class="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <span
      class="font-sans text- font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground"
    >
      {{ game.name }}
    </span>
  </div>
</template>
