<script setup lang="ts">
import { ref } from 'vue'
import { Play, Star, Flame } from 'lucide-vue-next'
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

const hovered = ref(false)
</script>

<template>
  <div
    class="group relative bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer border border-border hover:border-primary/30"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <div class="relative aspect-[4/3] overflow-hidden">
      <img
        :src="game.image"
        :alt="game.nameEn"
        class="w-full h-full object-cover transition-transform duration-500"
        :class="hovered ? 'scale-110' : 'scale-100'"
      />
      <div
        class="absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-300"
        :class="hovered ? 'opacity-100' : 'opacity-0'"
      >
        <button
          type="button"
          class="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg hover:bg-[#c4102a] transition-colors"
        >
          <Play class="w-4 h-4 fill-current" />
          启动
        </button>
      </div>
      <div class="absolute top-2 left-2 flex gap-1.5">
        <span
          v-if="game.hot"
          class="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wide"
        >
          <Flame class="w-2.5 h-2.5" />
          热门
        </span>
        <span
          v-if="game.new"
          class="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wide"
        >
          NEW
        </span>
      </div>
      <div class="absolute bottom-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px]">
        <Star class="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
        <span class="font-semibold">{{ game.rating }}</span>
      </div>
    </div>
    <div class="p-3">
      <h3 class="font-bold text-sm text-foreground truncate">{{ game.name }}</h3>
      <div class="flex items-center justify-between mt-1">
        <span class="text-xs text-muted-foreground">{{ game.provider }}</span>
        <span v-if="game.rtp" class="text-xs text-primary font-medium">RTP {{ game.rtp }}</span>
      </div>
    </div>
  </div>
</template>
