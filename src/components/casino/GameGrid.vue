<script setup lang="ts">
import { ref, computed } from 'vue'
import { Trophy, Gamepad2, Users, Zap, Flame, ChevronRight, type LucideIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import GameCard, { type Game } from './GameCard.vue'

const categories: { id: string; label: string; labelEn: string; icon: LucideIcon }[] = [
  { id: 'all', label: '全部', labelEn: 'All Games', icon: Flame },
  { id: 'slots', label: '电子', labelEn: 'Slots', icon: Gamepad2 },
  { id: 'live', label: '真人', labelEn: 'Live Casino', icon: Users },
  { id: 'sports', label: '体育', labelEn: 'Sports', icon: Trophy },
  { id: 'lottery', label: '彩票', labelEn: 'Lottery', icon: Zap },
]

const games: Game[] = [
  {
    id: 1,
    name: '幸运财神',
    nameEn: 'Lucky Fortune',
    image: '/images/slot-1.jpg',
    category: 'slots',
    provider: 'PG Soft',
    rtp: '96.8%',
    hot: true,
    new: false,
    rating: 4.9,
  },
  {
    id: 2,
    name: '野生旅途',
    nameEn: 'Wild Safari',
    image: '/images/slot-2.jpg',
    category: 'slots',
    provider: 'Pragmatic',
    rtp: '95.5%',
    hot: false,
    new: true,
    rating: 4.7,
  },
  {
    id: 3,
    name: '钻石狂热',
    nameEn: 'Diamond Rush',
    image: '/images/slot-3.jpg',
    category: 'slots',
    provider: 'NetEnt',
    rtp: '97.2%',
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 4,
    name: '古埃及秘境',
    nameEn: 'Ancient Egypt',
    image: '/images/slot-4.jpg',
    category: 'slots',
    provider: "Play'n GO",
    rtp: '96.1%',
    hot: false,
    new: false,
    rating: 4.6,
  },
  {
    id: 5,
    name: '真人百家乐',
    nameEn: 'Live Baccarat',
    image: '/images/game-live.jpg',
    category: 'live',
    provider: 'Evolution',
    rtp: '98.9%',
    hot: true,
    new: false,
    rating: 4.9,
  },
  {
    id: 6,
    name: '足球赛事',
    nameEn: 'Football Betting',
    image: '/images/game-sports.jpg',
    category: 'sports',
    provider: 'FB Sports',
    rtp: null,
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 7,
    name: '电子老虎机',
    nameEn: 'Classic Slots',
    image: '/images/game-slots.jpg',
    category: 'slots',
    provider: 'Microgaming',
    rtp: '95.8%',
    hot: false,
    new: false,
    rating: 4.5,
  },
  {
    id: 8,
    name: '即开彩票',
    nameEn: 'Instant Lottery',
    image: '/images/game-lottery.jpg',
    category: 'lottery',
    provider: 'OPE Sports',
    rtp: '93.0%',
    hot: false,
    new: true,
    rating: 4.4,
  },
]

const activeCategory = ref('all')

const filtered = computed(() =>
  activeCategory.value === 'all'
    ? games
    : games.filter((g) => g.category === activeCategory.value),
)
</script>

<template>
  <section class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-foreground">热门游戏</h2>
        <p class="text-muted-foreground text-sm mt-0.5">Popular Games</p>
      </div>
      <button type="button" class="flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all">
        查看全部 <ChevronRight class="w-4 h-4" />
      </button>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
      <button
        v-for="cat in categories"
        :key="cat.id"
        type="button"
        class="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 shrink-0"
        :class="
          cn(
            activeCategory === cat.id
              ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
              : 'bg-card text-muted-foreground hover:text-foreground hover:bg-secondary border border-border',
          )
        "
        @click="activeCategory = cat.id"
      >
        <component :is="cat.icon" class="w-4 h-4" />
        {{ cat.label }}
        <span class="text-[10px] opacity-70 font-normal">{{ cat.labelEn }}</span>
      </button>
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <GameCard v-for="game in filtered" :key="game.id" :game="game" />
    </div>

    <div v-if="filtered.length >= 4" class="flex justify-center pt-2">
      <button
        type="button"
        class="px-8 py-3 rounded-xl border border-border text-sm font-semibold text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        加载更多游戏
      </button>
    </div>
  </section>
</template>
