<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-vue-next'
const slides = [
  {
    id: 1,
    image: '/images/hero-banner.jpg',
    badge: '新玩家专属',
    title: '迎新礼金',
    titleEn: 'Welcome Bonus',
    subtitle: '首存即享高达',
    amount: '¥8,888',
    description: '注册即享免费旋转 · 全程VIP服务 · 秒速存取款',
    ctaLabel: '立即领取',
    secondaryLabel: '了解更多',
  },
  {
    id: 2,
    image: '/images/hero-banner-2.jpg',
    badge: '每日活动',
    title: '扑克豪礼',
    titleEn: 'Poker Extravaganza',
    subtitle: '每日红包最高',
    amount: '¥3,000',
    description: '真人百家乐 · 专业荷官 · 超低投注门槛',
    ctaLabel: '开始游戏',
    secondaryLabel: '查看活动',
  },
]

const current = ref(0)
const isAnimating = ref(false)
let timer: ReturnType<typeof setInterval> | null = null

function goTo(index: number) {
  if (isAnimating.value) return
  isAnimating.value = true
  current.value = index
  setTimeout(() => {
    isAnimating.value = false
  }, 500)
}

function prev() {
  goTo((current.value - 1 + slides.length) % slides.length)
}

function next() {
  goTo((current.value + 1) % slides.length)
}

onMounted(() => {
  timer = setInterval(next, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <section class="relative w-full overflow-hidden rounded-2xl shadow-lg h-[420px]">
    <div
      v-for="(s, i) in slides"
      :key="s.id"
      class="absolute inset-0 transition-opacity duration-700"
      :class="i === current ? 'opacity-100' : 'opacity-0'"
    >
      <img :src="s.image" :alt="s.titleEn" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
    </div>

    <div class="relative z-10 h-full flex items-center px-10 md:px-16">
      <div
        class="max-w-lg transition-all duration-500"
        :class="isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'"
      >
        <div
          class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider mb-4"
        >
          <Sparkles class="w-3 h-3" />
          {{ slides[current].badge }}
        </div>
        <h2 class="text-4xl md:text-5xl font-bold text-white leading-tight mb-1 text-balance">
          {{ slides[current].title }}
        </h2>
        <p class="text-white/70 text-sm font-medium mb-3">{{ slides[current].titleEn }}</p>
        <div class="flex items-baseline gap-2 mb-4">
          <span class="text-white/80 text-lg">{{ slides[current].subtitle }}</span>
          <span class="text-4xl font-extrabold text-primary drop-shadow-lg">
            {{ slides[current].amount }}
          </span>
        </div>
        <p class="text-white/80 text-sm mb-6 leading-relaxed">{{ slides[current].description }}</p>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex items-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-[#c4102a] text-primary-foreground font-bold text-sm transition-colors shadow-lg shadow-primary/30"
          >
            {{ slides[current].ctaLabel }}
            <ArrowRight class="w-4 h-4" />
          </button>
          <button
            type="button"
            class="flex items-center gap-1.5 px-6 py-3 rounded-xl border border-white/30 text-white hover:bg-white/10 font-medium text-sm transition-colors backdrop-blur-sm"
          >
            {{ slides[current].secondaryLabel }}
          </button>
        </div>
      </div>
    </div>

    <button
      type="button"
      class="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      aria-label="Previous slide"
      @click="prev"
    >
      <ChevronLeft class="w-5 h-5" />
    </button>
    <button
      type="button"
      class="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
      aria-label="Next slide"
      @click="next"
    >
      <ChevronRight class="w-5 h-5" />
    </button>

    <div class="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
      <button
        v-for="(_, i) in slides"
        :key="i"
        type="button"
        :aria-label="`Go to slide ${i + 1}`"
        class="transition-all duration-300 rounded-full"
        :class="i === current ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/50 hover:bg-white/80'"
        @click="goTo(i)"
      />
    </div>

    <div class="absolute top-5 right-5 z-20 text-white/60 text-xs font-mono">
      {{ String(current + 1).padStart(2, '0') }} / {{ String(slides.length).padStart(2, '0') }}
    </div>
  </section>
</template>
