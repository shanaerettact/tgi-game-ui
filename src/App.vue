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
    <section class="bg-background border-y border-border">
      <!-- Top rule accent -->
      <div class="h-0.5 w-full bg-border">
        <div class="h-full w-24 bg-primary mx-auto"></div>
      </div>

      <div class="max-w-screen-xl mx-auto px-6 py-12">

        <!-- Section masthead -->
        <div class="flex flex-col items-center text-center mb-10 space-y-2">
          <div class="flex items-center gap-3 mb-1">
            <div class="h-px w-12 bg-border"></div>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Partner Brands</span>
            <div class="h-px w-12 bg-border"></div>
          </div>
          <h2 class="text-base font-bold text-foreground tracking-tight">合作游戏品牌</h2>
          <p class="text-xs text-muted-foreground max-w-sm leading-relaxed">涵盖全品类顶级游戏供应商，提供最优质的游戏体验</p>
        </div>

        <!-- Outer card frame -->
        <div class="rounded-xl border border-border bg-card shadow-sm overflow-hidden">

          <!-- Category rows -->
          <div
            v-for="(category, index) in appendixCategories"
            :key="category.label"
            :class="[
              'flex items-start gap-0 border-b border-border last:border-b-0',
            ]"
          >
            <!-- Category label column -->
            <div class="flex flex-col items-center justify-center gap-1 px-5 py-4 min-w-[96px] w-24 shrink-0 border-r border-border bg-secondary self-stretch">
              <span class="text-sm font-bold text-foreground leading-tight text-center">{{ category.label }}</span>
              <span class="text-[9px] font-semibold uppercase tracking-widest text-primary leading-tight text-center">{{ category.labelEn }}</span>
            </div>

            <!-- Brand images strip -->
            <div class="flex flex-wrap items-center gap-2 px-5 py-4 flex-1 min-w-0">
              <div
                v-for="brand in brandImages"
                :key="brand.src + category.label"
                class="group relative overflow-hidden rounded-md border border-border bg-background hover:border-primary/50 hover:shadow-sm transition-all duration-200 cursor-pointer shrink-0"
                style="width: 64px; height: 40px;"
              >
                <img
                  :src="brand.src"
                  :alt="brand.alt"
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom count note -->
        <div class="flex items-center justify-center gap-2 mt-6">
          <div class="h-px flex-1 bg-border max-w-[120px]"></div>
          <span class="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
            {{ appendixCategories.length }} 游戏类别 &nbsp;·&nbsp; {{ brandImages.length * appendixCategories.length }}+ 品牌游戏
          </span>
          <div class="h-px flex-1 bg-border max-w-[120px]"></div>
        </div>

      </div>

      <!-- Bottom rule accent -->
      <div class="h-0.5 w-full bg-border">
        <div class="h-full w-24 bg-primary mx-auto"></div>
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
