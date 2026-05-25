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
  <div class="">
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

<style scoped>
/* ─── Mobile-only decorative background enhancements ─────────────────────── */
/* All rules here are inside @media (max-width: 767px) so desktop is untouched */

@media (max-width: 767px) {

  /* Root wrapper: establish stacking context & deep-blue base gradient */
  div:first-child {
    position: relative;
    isolation: isolate;
    background:
      /* Top-left neon purple-blue radial glow */
      radial-gradient(ellipse 55% 38% at 8% 12%, rgba(90, 120, 255, 0.22) 0%, transparent 70%),
      /* Bottom-right cyan radial glow */
      radial-gradient(ellipse 60% 40% at 95% 90%, rgba(14, 165, 233, 0.20) 0%, transparent 65%),
      /* Centre warm-gold accent glow (poker chip feel) */
      radial-gradient(ellipse 40% 30% at 50% 52%, rgba(250, 200, 80, 0.09) 0%, transparent 70%),
      /* Base ocean-blue gradient from top to bottom */
      linear-gradient(170deg, #d6e8ff 0%, #eaf2ff 38%, #f0f7ff 62%, #daeeff 100%);
  }

  /* ── Pseudo-element ::before — CSS-only SVG casino pattern tile ───────── */
  div:first-child::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    /* Tiled SVG with card suits, dice face, sparkle stars — all vector, no assets */
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3C!-- Spade top-left --%3E%3Ctext x='10' y='32' font-size='22' fill='%231A6CF6' opacity='0.13' font-family='serif'%3E%E2%99%A0%3C/text%3E%3C!-- Heart centre --%3E%3Ctext x='68' y='88' font-size='24' fill='%231A6CF6' opacity='0.11' font-family='serif'%3E%E2%99%A5%3C/text%3E%3C!-- Diamond bottom-right --%3E%3Ctext x='118' y='148' font-size='20' fill='%230EA5E9' opacity='0.13' font-family='serif'%3E%E2%99%A6%3C/text%3E%3C!-- Club mid-right --%3E%3Ctext x='122' y='52' font-size='19' fill='%231A6CF6' opacity='0.10' font-family='serif'%3E%E2%99%A3%3C/text%3E%3C!-- Star sparkle top-right --%3E%3Ctext x='130' y='22' font-size='14' fill='%231A6CF6' opacity='0.15' font-family='serif'%3E%E2%98%85%3C/text%3E%3C!-- Small star mid-left --%3E%3Ctext x='42' y='115' font-size='10' fill='%230EA5E9' opacity='0.14' font-family='serif'%3E%E2%98%85%3C/text%3E%3C!-- Dice face (6 dots) centred bottom-left as SVG rect+circles --%3E%3Crect x='6' y='110' width='28' height='28' rx='5' fill='none' stroke='%231A6CF6' stroke-width='1.4' opacity='0.12'/%3E%3Ccircle cx='12' cy='116' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='20' cy='116' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='28' cy='116' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='12' cy='124' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='28' cy='124' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='12' cy='132' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='20' cy='132' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3Ccircle cx='28' cy='132' r='2.2' fill='%231A6CF6' opacity='0.12'/%3E%3C!-- Tiny diamond sparkle --%3E%3Cpolygon points='80,6 84,14 80,22 76,14' fill='%230EA5E9' opacity='0.14'/%3E%3C!-- Horizontal divider line hint --%3E%3Cline x1='0' y1='80' x2='160' y2='80' stroke='%231A6CF6' stroke-width='0.5' opacity='0.06' stroke-dasharray='4 8'/%3E%3C/svg%3E");
    background-size: 160px 160px;
    background-repeat: repeat;
  }

  /* ── Pseudo-element ::after — large floating translucent orbs / coins ──── */
  div:first-child::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    /* Large blurred neon orbs that give depth without changing layout */
    background:
      /* Top centre orb — bright blue */
      radial-gradient(circle 72px at 50% 6%, rgba(26, 108, 246, 0.17) 0%, transparent 80%),
      /* Mid-left coin-shaped circle */
      radial-gradient(circle 48px at 6% 42%, rgba(14, 165, 233, 0.14) 0%, transparent 80%),
      /* Mid-right cyan */
      radial-gradient(circle 56px at 94% 38%, rgba(14, 165, 233, 0.13) 0%, transparent 80%),
      /* Bottom centre deep gold shimmer */
      radial-gradient(circle 80px at 52% 96%, rgba(250, 200, 80, 0.12) 0%, transparent 75%),
      /* Extra bottom-left soft blue */
      radial-gradient(circle 44px at 10% 88%, rgba(26, 108, 246, 0.12) 0%, transparent 80%);
  }

  /* Ensure content wrapper sits above the decorative layers */
  div:first-child > .relative {
    position: relative;
    z-index: 1;
  }

  /* ── Brand-card containers get subtle glass shimmer on mobile ─────────── */
  /* These selectors match the `.group` divs wrapping brand images */
  div:first-child .group {
    position: relative;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid rgba(26, 108, 246, 0.14);
    border-radius: 14px;
    box-shadow:
      0 2px 12px rgba(26, 108, 246, 0.10),
      0 1px 3px rgba(0, 0, 0, 0.06);
  }

  /* ── Slider section: matching glass card style ────────────────────────── */
  div:first-child section[aria-label] {
    box-shadow:
      0 4px 24px rgba(26, 108, 246, 0.14),
      0 1px 4px rgba(0, 0, 0, 0.07);
    border-color: rgba(26, 108, 246, 0.18);
  }

  /* ── Section heading accent bar — glow on mobile ─────────────────────── */
  div:first-child span[aria-hidden="true"] {
    box-shadow: 0 0 8px rgba(26, 108, 246, 0.55);
  }

}
/* ─────────────────────────────────────────────────────────────────────────── */
</style>
