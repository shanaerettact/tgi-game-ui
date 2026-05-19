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
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <main>
      <div class="max-w-screen-xl mx-auto px-4 pt-6 pb-2">
        <HeroSlider />
      </div>

      <div class="bg-primary mt-4">
        <div class="max-w-screen-xl mx-auto px-4 py-3">
          <div class="flex items-center justify-between gap-4 overflow-x-auto">
            <div class="flex items-center gap-6 text-primary-foreground text-sm whitespace-nowrap">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
                <span class="font-medium">在线玩家：</span>
                <span class="font-bold">12,847</span>
              </div>
              <div class="w-px h-4 bg-white/30" />
              <div class="flex items-center gap-2">
                <span class="font-medium">今日奖池：</span>
                <span class="font-bold">¥2,388,500</span>
              </div>
              <div class="w-px h-4 bg-white/30" />
              <div class="flex items-center gap-2">
                <span class="font-medium">今日大奖：</span>
                <span class="font-bold">johnny W. 赢得 ¥88,888</span>
              </div>
            </div>
            <div class="hidden md:flex items-center gap-3 shrink-0">
              <button
                class="px-4 py-1.5 rounded-lg bg-white text-primary font-bold text-xs hover:bg-white/90 transition-colors"
              >
                立即注册
              </button>
              <button
                class="px-4 py-1.5 rounded-lg border border-white/40 text-white font-medium text-xs hover:bg-white/10 transition-colors"
              >
                下载APP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-screen-xl mx-auto px-4 py-8 space-y-12">
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
      </div>
    </main>

    <Footer />
  </div>
</template>
