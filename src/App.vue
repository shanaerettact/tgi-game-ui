<script setup lang="ts">
import Navbar from '@/components/casino/Navbar.vue'
import HeroSlider from '@/components/casino/HeroSlider.vue'
import GameGrid from '@/components/casino/GameGrid.vue'
import Promotions from '@/components/casino/Promotions.vue'
import Footer from '@/components/casino/Footer.vue'

const categories = [
  { label: '体育', sub: 'Sports', img: '/images/game-sports.jpg' },
  { label: '彩票', sub: 'Lottery', img: '/images/game-lottery.jpg' },
  { label: '电子', sub: 'Slots', img: '/images/game-slots.jpg' },
  { label: '真人', sub: 'Live', img: '/images/game-live.jpg' },
  { label: '礼物', sub: 'Gifts', img: '/images/slot-1.jpg' },
  { label: '棋牌', sub: 'Board', img: '/images/slot-2.jpg' },
]

const brandImages = [
  { src: '/images/brand/chess_db.png', alt: 'chess_db' },
  { src: '/images/brand/chess_hl.png', alt: 'chess_hl' },
  { src: '/images/brand/chess_ks.png', alt: 'chess_ks' },
  { src: '/images/brand/chess_ky.png', alt: 'chess_ky' },
  { src: '/images/brand/chess_leg.png', alt: 'chess_leg' },
  { src: '/images/brand/chess_wl.png', alt: 'chess_wl' },
]

const appendixCategories = [
  { label: '棋牌游戏', labelEn: 'CHESS GAME' },
  { label: '真人娱乐', labelEn: 'LIVE CASINO' },
  { label: '老虎机', labelEn: 'SLOT GAME' },
  { label: '体育游戏', labelEn: 'SPORTS GAME' },
  { label: '捕鱼游戏', labelEn: 'FISHING GAME' },
  { label: '体育博彩', labelEn: 'SPORTS BETTING' },
  { label: '电子竞技', labelEn: 'ESPORTS GAME' },
  { label: '彩票游戏', labelEn: 'LOTTERY GAME' },
  { label: '斗鸡游戏', labelEn: 'FIGHTING GAME' },
]
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <!-- Appendix: Game Provider Brands by Category -->
    <section class="bg-card border-b border-border">
      <div class="max-w-screen-xl mx-auto px-4 py-10 space-y-8">

        <!-- Section heading -->
        <div class="flex items-center gap-3">
          <div class="w-1 h-5 rounded-full bg-primary shrink-0"></div>
          <h2 class="text-sm font-bold uppercase tracking-widest text-muted-foreground">合作品牌 &nbsp;·&nbsp; Partner Brands</h2>
        </div>

        <!-- Category rows -->
        <div class="space-y-6">
          <div
            v-for="category in appendixCategories"
            :key="category.label"
            class="space-y-3"
          >
            <!-- Category label -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-semibold text-foreground tracking-wide">{{ category.label }}</span>
              <span class="text-xs text-muted-foreground font-medium">{{ category.labelEn }}</span>
              <div class="flex-1 h-px bg-border"></div>
            </div>

            <!-- Brand images -->
            <div class="flex flex-wrap gap-2">
              <div
                v-for="brand in brandImages"
                :key="brand.src + category.label"
                class="group relative overflow-hidden rounded-lg border border-border bg-secondary hover:border-primary/40 transition-colors cursor-pointer"
                style="width: calc(100% / 12 - 0.5rem)"
              >
                <img
                  :src="brand.src"
                  :alt="brand.alt"
                  class="h-auto w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
    <main>
      <!-- <div class="max-w-screen-xl mx-auto px-4 pt-6 pb-2">
        <HeroSlider />
      </div> -->

      <!-- <div class="max-w-screen-xl mx-auto px-4 py-8 space-y-12">
        <section>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <button
              v-for="cat in categories"
              :key="cat.label"
              class="relative flex flex-col items-center justify-end overflow-hidden rounded-2xl border aspect-[4/3] group transition-shadow hover:shadow-lg cursor-pointer"
            >
              <img
                :src="cat.img"
                :alt="cat.sub"
                class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div class="relative z-10 pb-3 text-center">
                <div class="text-white font-bold text-base">{{ cat.label }}</div>
                <div class="text-white/70 text-xs">{{ cat.sub }}</div>
              </div>
            </button>
          </div>
        </section>

        <GameGrid />
        <Promotions />
      </div> -->
    </main>

    <Footer />
  </div>
</template>
