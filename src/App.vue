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
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <div>

    </div>
    <main>
      <div class="max-w-screen-xl mx-auto px-4 py-10">
        <section>
          <div class="mb-5 flex items-center gap-2">
            <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
            <h2 class="font-sans text-lg font-bold tracking-tight text-foreground">棋牌品牌</h2>
            <span class="text-sm font-normal text-muted-foreground">Board Game Brands</span>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div
              v-for="brand in brandImages"
              :key="brand.alt"
              class="group flex flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/40 hover:shadow-md cursor-pointer"
            >
              <div class="flex h-16 w-full items-center justify-center rounded-lg bg-secondary p-2">
                <img
                  :src="brand.src"
                  :alt="brand.alt"
                  class="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span class="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                {{ brand.alt.replace('chess_', '') }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>
