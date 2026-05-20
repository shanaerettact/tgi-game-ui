<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Trophy, Gamepad2, Users, Zap, Flame, type LucideIcon } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import GameCard, { type BrandItem, type Game } from './GameCard.vue'
import { getBrandGameImages, resolveBrandGameKey } from '@/lib/brandGames'

const categoryBrandFiles: Record<string, { folder: string; files: string[] }> = {
  chess: { folder: 'chess', files: ['kx_chess.png'] },
  live: { folder: 'live', files: ['eeai_live.png', 'mt_live.png'] },
  slots: { folder: 'slot', files: ['antplay_slot.png', 'as_slot.png', 'gb_slot.png', 'glc_slot.png', 'pg_slot.png'] },
  sports: { folder: 'sport', files: ['fb_sport.png'] },
  lottery: { folder: 'lottery', files: ['ltg_lottery.png'] },
}

function formatBrandLabel(file: string) {
  const base = file.replace(/\.png$/i, '').split('_')[0]
  return base.toUpperCase()
}

function formatGameName(imagePath: string) {
  const filename = imagePath.split('/').pop()?.replace(/\.png$/i, '') ?? ''
  const stripped = filename
    .replace(/^(kx_chess_|eeai_live_|mt_live_|antplay_slot_|as_slot_|gb_slot_slots-|gb_slot_|glc_slot_|pg_slot_|fb_sport_|ltg_lottery_)/i, '')
    .replace(/[-_]/g, ' ')
    .trim()
  return stripped || filename
}

function buildGamesFromBrandImages(images: string[], category: string, provider: string): Game[] {
  return images.map((image, index) => ({
    id: index + 1,
    name: formatGameName(image),
    nameEn: formatGameName(image),
    image,
    category,
    provider,
    rtp: null,
    hot: false,
    new: false,
    rating: 4.5,
  }))
}

const props = withDefaults(
  defineProps<{
    category?: string
    title?: string
    titleEn?: string
    showCategoryTabs?: boolean
  }>(),
  {
    category: 'all',
    title: '热门游戏',
    titleEn: 'Popular Games',
    showCategoryTabs: true,
  },
)

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
    image: '/images/brand/slot/slot_pg.png',
    category: 'slots',
    provider: 'PG Soft',
    rtp: '96.8%',
    hot: true,
    new: false,
    rating: 4.9,
  },
  {
    id: 2,
    name: '狂野之旅',
    nameEn: 'Wild Safari',
    image: '/images/brand/slot/slot_pp.png',
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
    image: '/images/brand/slot/slot_mga.png',
    category: 'slots',
    provider: 'MGA',
    rtp: '97.2%',
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 4,
    name: 'JDB 电子',
    nameEn: 'JDB Slots',
    image: '/images/brand/slot/slot_jdb.png',
    category: 'slots',
    provider: 'JDB',
    rtp: '96.1%',
    hot: false,
    new: false,
    rating: 4.6,
  },
  {
    id: 5,
    name: '真人百家乐',
    nameEn: 'Live Baccarat',
    image: '/images/brand/live/live_ag.png',
    category: 'live',
    provider: 'AG',
    rtp: '98.9%',
    hot: true,
    new: false,
    rating: 4.9,
  },
  {
    id: 6,
    name: 'BBIN 真人',
    nameEn: 'BBIN Live',
    image: '/images/brand/live/live_bbin.png',
    category: 'live',
    provider: 'BBIN',
    rtp: '98.5%',
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 7,
    name: 'BG 真人',
    nameEn: 'BG Live',
    image: '/images/brand/live/live_bg.png',
    category: 'live',
    provider: 'BG',
    rtp: '98.2%',
    hot: false,
    new: true,
    rating: 4.7,
  },
  {
    id: 8,
    name: '足球赛事',
    nameEn: 'Football Betting',
    image: '/images/brand/sport/sport_fb.png',
    category: 'sports',
    provider: 'FB Sports',
    rtp: null,
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 9,
    name: 'BTI 体育',
    nameEn: 'BTI Sports',
    image: '/images/brand/sport/sport_bti.png',
    category: 'sports',
    provider: 'BTI',
    rtp: null,
    hot: false,
    new: false,
    rating: 4.6,
  },
  {
    id: 10,
    name: '即开彩票',
    nameEn: 'Instant Lottery',
    image: '/images/brand/lottery/lottery_db.png',
    category: 'lottery',
    provider: 'DB Lottery',
    rtp: '93.0%',
    hot: true,
    new: true,
    rating: 4.4,
  },
  {
    id: 11,
    name: '闪电彩票',
    nameEn: 'Lightning Lottery',
    image: '/images/brand/lottery/lottery_lightning.png',
    category: 'lottery',
    provider: 'Lightning',
    rtp: '92.5%',
    hot: false,
    new: false,
    rating: 4.3,
  },
  {
    id: 12,
    name: 'DB 棋牌',
    nameEn: 'DB Chess',
    image: '/images/brand/chess/chess_db.png',
    category: 'chess',
    provider: 'DB',
    rtp: null,
    hot: true,
    new: false,
    rating: 4.8,
  },
  {
    id: 13,
    name: '开元棋牌',
    nameEn: 'KY Chess',
    image: '/images/brand/chess/chess_ky.png',
    category: 'chess',
    provider: 'KY',
    rtp: null,
    hot: true,
    new: false,
    rating: 4.7,
  },
  {
    id: 14,
    name: 'KS 棋牌',
    nameEn: 'KS Chess',
    image: '/images/brand/chess/chess_ks.png',
    category: 'chess',
    provider: 'KS',
    rtp: null,
    hot: false,
    new: true,
    rating: 4.6,
  },
  {
    id: 15,
    name: '欢乐棋牌',
    nameEn: 'HL Chess',
    image: '/images/brand/chess/chess_hl.png',
    category: 'chess',
    provider: 'HL',
    rtp: null,
    hot: false,
    new: false,
    rating: 4.5,
  },
]

const activeCategory = ref('all')

const filtered = computed(() => {
  if (props.showCategoryTabs) {
    return activeCategory.value === 'all'
      ? games
      : games.filter((g) => g.category === activeCategory.value)
  }

  if (props.category === 'home') {
    return games.filter((g) => g.hot)
  }

  return games.filter((g) => g.category === props.category)
})

const categoryBrands = computed<BrandItem[]>(() => {
  if (props.showCategoryTabs) return []

  const config = categoryBrandFiles[props.category]
  if (!config) return []

  return config.files.map((file) => ({
    src: `/images/brand/${config.folder}/${file}`,
    alt: file.replace(/\.png$/i, ''),
    label: formatBrandLabel(file),
    gameKey: resolveBrandGameKey(config.folder, file),
  }))
})

const activeBrandSrc = ref<string | null>(null)

const displayGames = computed(() => {
  if (categoryBrands.value.length > 0) {
    const activeBrand = categoryBrands.value.find((brand) => brand.src === activeBrandSrc.value)
    if (!activeBrand) return []

    const images = getBrandGameImages(activeBrand.gameKey)
    return buildGamesFromBrandImages(images, props.category, activeBrand.label)
  }

  return filtered.value
})

watch(
  categoryBrands,
  (brands) => {
    activeBrandSrc.value = brands[0]?.src ?? null
  },
  { immediate: true },
)

function selectBrand(src: string) {
  activeBrandSrc.value = src
}
</script>

<template>
  <div class="mx-auto max-w-screen-xl space-y-12 px-4 py-10">
    <section>
      <div class="mb-5 flex items-center gap-2">
        <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2 class="font-sans text-lg font-bold tracking-tight text-foreground">{{ title }}</h2>
      </div>

      <div
        v-if="showCategoryTabs"
        class="scrollbar-hide mb-5 flex items-center gap-2 overflow-x-auto pb-1"
      >
        <button
          v-for="cat in categories"
          :key="cat.id"
          type="button"
          class="flex shrink-0 items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200"
          :class="
            cn(
              activeCategory === cat.id
                ? 'bg-primary text-primary-foreground shadow-sm shadow-primary/20'
                : 'border border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground',
            )
          "
          @click="activeCategory = cat.id"
        >
          <component :is="cat.icon" class="h-4 w-4" />
          {{ cat.label }}
          <span class="text-[10px] font-normal opacity-70">{{ cat.labelEn }}</span>
        </button>
      </div>

      <div
        v-if="categoryBrands.length"
        class="mb-6 rounded-2xl border border-border/60 bg-muted/30 px-3 py-4 sm:px-4"
      >
        <div class="mb-3 flex items-center gap-2">
          <span class="block h-4 w-0.5 rounded-full bg-primary/60" aria-hidden="true" />
          <p class="font-sans text-xs font-medium text-muted-foreground">合作品牌</p>
        </div>
        <div class="grid grid-cols-4 gap-1.5 sm:grid-cols-5 sm:gap-2 md:grid-cols-5 lg:grid-cols-6">
          <GameCard
            v-for="brand in categoryBrands"
            :key="brand.src"
            :brand="brand"
            :active="activeBrandSrc === brand.src"
            @click="selectBrand(brand.src)"
          />
        </div>
      </div>

      <div
        v-if="categoryBrands.length"
        class="mb-6 flex items-center gap-3"
        aria-hidden="true"
      >
        <span class="h-px flex-1 bg-border" />
        <span class="shrink-0 font-sans text-[14px] font-medium uppercase tracking-widest text-muted-foreground/80">
          遊戲列表
        </span>
        <span class="h-px flex-1 bg-border" />
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <GameCard v-for="game in displayGames" :key="`${game.image}-${game.id}`" :game="game" />
      </div>

      <div v-if="displayGames.length === 0" class="py-16 text-center text-muted-foreground">
        暫無遊戲
      </div>
    </section>
  </div>
</template>
