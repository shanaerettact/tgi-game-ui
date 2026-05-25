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
  <div class="mobile-gaming-bg">
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
        <div class="relative min-h-[100px] sm:min-h-[100px] md:min-h-[240px]">
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

<style scoped>
/*
 * Mobile gaming-themed background — only active below md (< 768px).
 * Pure CSS: SVG data-URI tiling patterns + CSS gradients.
 * Colors are hardcoded to match the default --primary (#CD4FD6) but remain
 * visually harmonious across all themes because opacities are low.
 * Desktop (md+) continues to use the existing hot.png background unchanged.
 */

.mobile-gaming-bg {
  position: relative;
}

@media (max-width: 767px) {
  .mobile-gaming-bg {
    background-color: var(--background);
    background-image:
      /* Fine diamond lattice — tightest layer */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M20 2 L38 20 L20 38 L2 20 Z' fill='none' stroke='%23CD4FD6' stroke-width='0.5' stroke-opacity='0.18'/%3E%3C/svg%3E"),
      /* Larger diamond with centred dot — mid layer */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80'%3E%3Cpath d='M40 4 L76 40 L40 76 L4 40 Z' fill='none' stroke='%23CD4FD6' stroke-width='0.7' stroke-opacity='0.10'/%3E%3Ccircle cx='40' cy='40' r='2.5' fill='%23CD4FD6' fill-opacity='0.13'/%3E%3C/svg%3E"),
      /* Scattered glint dots — sparse accent layer */
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ccircle cx='20' cy='22' r='1.2' fill='%23CD4FD6' fill-opacity='0.30'/%3E%3Ccircle cx='100' cy='14' r='0.9' fill='%23CD4FD6' fill-opacity='0.20'/%3E%3Ccircle cx='60' cy='62' r='1.6' fill='%23CD4FD6' fill-opacity='0.22'/%3E%3Ccircle cx='10' cy='92' r='1.0' fill='%23CD4FD6' fill-opacity='0.18'/%3E%3Ccircle cx='112' cy='80' r='1.3' fill='%23CD4FD6' fill-opacity='0.25'/%3E%3Ccircle cx='42' cy='108' r='0.9' fill='%23CD4FD6' fill-opacity='0.16'/%3E%3C/svg%3E"),
      /* Top-edge radial glow */
      radial-gradient(
        ellipse 90% 45% at 50% -5%,
        color-mix(in srgb, var(--primary) 14%, transparent) 0%,
        transparent 70%
      );
    background-size:
      40px 40px,
      80px 80px,
      120px 120px,
      100% 55%;
    background-position:
      0 0,
      0 0,
      0 0,
      center top;
    background-repeat:
      repeat,
      repeat,
      repeat,
      no-repeat;
  }

  /* Subtle bottom-edge glow for depth */
  .mobile-gaming-bg::after {
    content: '';
    pointer-events: none;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 180px;
    background: radial-gradient(
      ellipse 80% 60% at 50% 120%,
      color-mix(in srgb, var(--primary) 10%, transparent) 0%,
      transparent 70%
    );
    z-index: 0;
  }
}
</style>
