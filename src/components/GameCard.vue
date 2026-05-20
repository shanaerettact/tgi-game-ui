<script setup lang="ts">
export interface Game {
  id: number
  name: string
  nameEn: string
  image: string
  category: string
  provider: string
  rtp: string | null
  hot: boolean
  new: boolean
  rating: number
}

defineProps<{
  game: Game
}>()
</script>

<template>
  <div
    class="group flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:p-4"
  >
    <div
      class="flex h-40 w-full items-center justify-center rounded-lg bg-secondary p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56"
    >
      <img
        :src="game.image"
        :alt="game.nameEn"
        class="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <span
      class="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground"
    >
      {{ game.name }}
    </span>
  </div>
</template>
