<script setup lang="ts">
import { cn } from '@/lib/utils'

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

export interface BrandItem {
  src: string
  alt: string
  label: string
  gameKey: string
}

const props = defineProps<{
  game?: Game
  brand?: BrandItem
  active?: boolean
}>()
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
      class="flex h-12 w-full items-center justify-center overflow-hidden rounded-md bg-background/90 p-1 sm:h-14"
    >
      <img
        :src="brand.src"
        :alt="brand.alt"
        class="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
    <span
      class="font-sans text-[9px] font-medium uppercase tracking-wider transition-colors sm:text-[10px]"
      :class="props.active ? 'text-primary' : 'text-muted-foreground/90 group-hover:text-foreground'"
    >
      {{ brand.label }}
    </span>
  </div>

  <div
    v-else-if="game"
    class="group flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-3 shadow-sm ring-1 ring-border/50 transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:p-4"
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
