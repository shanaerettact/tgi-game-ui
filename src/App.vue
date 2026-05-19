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
      <div>
        <div>棋牌游戏 CHESS GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>真人娱乐 LIVE CASINO</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>老虎机 SLOT GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>体育游戏 SPORTS GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>捕鱼游戏 FISHING GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>体育博彩 SPORTS GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>电子竞技 ESPORTS GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>彩票游戏 LOTTERY GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>
      <div>
        <div>斗鸡游戏 FIGHTING GAME</div>
        <div class="max-w-screen-xl mx-auto space-y-3 px-4 pt-6 pb-2 flex flex-wrap gap-2">
          <div v-for="brand in brandImages" :key="brand.src" class="w-1/12">
            <img :src="brand.src" :alt="brand.alt" class="h-auto w-full rounded-lg" loading="lazy" />
          </div>
        </div>
      </div>

    </div>
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
