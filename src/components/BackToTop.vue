<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ArrowUp } from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const SCROLL_THRESHOLD = 80
const visible = ref(false)

function updateVisibility() {
  visible.value = window.scrollY > SCROLL_THRESHOLD
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  await nextTick()
  updateVisibility()
  window.addEventListener('scroll', updateVisibility, { passive: true })
  window.addEventListener('resize', updateVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility)
  window.removeEventListener('resize', updateVisibility)
})
</script>

<template>
  <Teleport to="body">
    <button
      v-show="visible"
      type="button"
      aria-label="回到頁首"
      :class="
        cn(
          'fixed bottom-6 right-6 z-50 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200',
          'hover:scale-105 hover:bg-[#c4102a] hover:shadow-xl active:scale-95',
        )
      "
      @click="scrollToTop"
    >
      <ArrowUp class="h-5 w-5" aria-hidden="true" />
    </button>
  </Teleport>
</template>
