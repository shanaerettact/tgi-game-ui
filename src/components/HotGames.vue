<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import BackToTop from './BackToTop.vue'
import { useGameStore } from '@/store/module/game';
import router from '@/router';

const gameStore = useGameStore()

const sliderSlides = [
  { id: 1, src: '/images/banner/1.png', alt: '热门推荐 1' },
  { id: 2, src: '/images/banner/2.png', alt: '热门推荐 2' },
  { id: 3, src: '/images/banner/3.png', alt: '热门推荐 3' },
]

const currentSlide = ref(0)
let sliderTimer: ReturnType<typeof setInterval> | null = null

function goToSlide(index: number) {
  currentSlide.value = (index + sliderSlides.length) % sliderSlides.length
}

function nextSlide() {
  goToSlide(currentSlide.value + 1)
}

function prevSlide() {
  goToSlide(currentSlide.value - 1)
}

function startSliderAutoplay() {
  if (sliderSlides.length <= 1) return
  stopSliderAutoplay()
  sliderTimer = setInterval(nextSlide, 5000)
}

function stopSliderAutoplay() {
  if (sliderTimer) {
    clearInterval(sliderTimer)
    sliderTimer = null
  }
}

onMounted(startSliderAutoplay)
onUnmounted(stopSliderAutoplay)

type BrandImage = { src: string; alt: string }

function createBrandSection(
  id: string,
  title: string,
  folder: string,
  files: string[],
  labelPrefix: string,
) {
  return {
    id,
    title,
    labelPrefix,
    images: files.map((file) => ({
      src: `/images/brand/${folder}/${file}`,
      alt: file.replace(/\.png$/i, ''),
    })) satisfies BrandImage[],
  }
}

const brandSections = [
  createBrandSection('slots', '电子', 'slot', [
    'gb_slot.png',
    'glc_slot.png',
    'antplay_slot.png',
    'as_slot.png',
    'pg_slot.png',
  ], 'slot_'),
]

const rowBrandSections = [
  createBrandSection('live', '真人娱乐', 'live', ['eeai_live.png', 'mt_live.png'], 'live_'),
  createBrandSection('chess', '棋牌品牌', 'chess', ['kx_chess.png'], 'chess_'),
  createBrandSection('sports', '体育博彩', 'sport', ['fb_sport.png'], 'sport_'),
  createBrandSection('lottery', '彩票游戏', 'lottery', ['ltg_lottery.png'], 'lottery_'),
]

const handleDirect = (path: string, product: string) => {
  gameStore.productFromHot = product
  window.scrollTo({ top: 0 })
  router.push(path)
}
</script>

<template>
  <div class="hot-games-wrapper">
    <div
      class="pointer-events-none absolute inset-0 hidden bg-[url('/images/bg/hot.png')] bg-[length:100%_100%] bg-no-repeat md:block"
      aria-hidden="true"
    />
    <div class="relative z-10 mx-auto max-w-screen-xl space-y-12 px-4 mt-10">
      <section
        class="relative overflow-hidden rounded-xl border border-border bg-card shadow-sm mb-4"
        aria-label="轮播图"
        @mouseenter="stopSliderAutoplay"
        @mouseleave="startSliderAutoplay"
      >
        <div class="relative  min-h-[100px] sm:min-h-[100px] md:min-h-[240px]">
          <img
            v-for="(slide, index) in sliderSlides"
            :key="slide.id"
            :src="slide.src"
            :alt="slide.alt"
            class="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
            :class="index === currentSlide ? 'opacity-100' : 'pointer-events-none opacity-0'"
          />
        </div>

        <template v-if="sliderSlides.length > 1">
          <button
            type="button"
            class="absolute left-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary/35 text-primary-foreground shadow-sm transition-colors hover:bg-primary/55 sm:left-3 sm:h-9 sm:w-9 sm:bg-primary/90 sm:hover:bg-primary"
            aria-label="上一张"
            @click="prevSlide"
          >
            <ChevronLeft class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          </button>
          <button
            type="button"
            class="absolute right-1.5 top-1/2 z-10 flex h-6 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-primary/35 text-primary-foreground shadow-sm transition-colors hover:bg-primary/55 sm:right-3 sm:h-9 sm:w-9 sm:bg-primary/90 sm:hover:bg-primary"
            aria-label="下一张"
            @click="nextSlide"
          >
            <ChevronRight class="h-3.5 w-3.5 sm:h-5 sm:w-5" />
          </button>

          <div class="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-2">
            <button
              v-for="(slide, index) in sliderSlides"
              :key="`dot-${slide.id}`"
              type="button"
              class="h-2 rounded-full transition-all"
              :class="
                index === currentSlide
                  ? 'w-6 bg-primary'
                  : 'w-2 bg-primary/30 hover:bg-primary/60'
              "
              :aria-label="`切换到第 ${index + 1} 张`"
              @click="goToSlide(index)"
            />
          </div>
        </template>
      </section>

      <section v-for="section in brandSections" :key="section.id">
      <div class="mt-8 flex items-center gap-2">
        <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2 class="font-sans text-lg font-bold tracking-tight text-foreground">{{ $t(`nav.${section.id}`) }}</h2>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div
          v-for="brand in section.images"
          :key="`${section.id}-${brand.alt}`"
          class="group flex cursor-pointer flex-col items-center rounded-xl p-2 transition-all duration-200"
          @click="handleDirect(section.id, brand.alt)"
        >
          <div class="flex h-40 w-full items-center justify-center p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56">
            <img
              :src="brand.src"
              :alt="brand.alt"
              class="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div
          v-for="section in rowBrandSections"
          :key="section.id"
          class="flex min-w-0 flex-col gap-1"
          :class="section.images.length > 1 ? 'col-span-2' : 'col-span-1'"
        >
          <div class="flex items-center gap-2">
            <span class="block h-5 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <h2 class="truncate font-sans text-lg font-bold tracking-tight text-foreground">
              {{ $t(`nav.${section.id}`) }}
            </h2>
          </div>

          <div
            class="grid gap-3"
            :class="section.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
          >
            <div
              v-for="brand in section.images"
              :key="`${section.id}-${brand.alt}`"
              class="group flex cursor-pointer flex-col items-center rounded-xl p-2 transition-all duration-200"
              @click="handleDirect(section.id, brand.alt)"
            >
              <div class="flex h-40 w-full items-center justify-center p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56">
                <img
                  :src="brand.src"
                  :alt="brand.alt"
                  class="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </div>
  <BackToTop />
</template>
