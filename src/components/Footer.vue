<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { Gamepad2, Users } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/navItems'

const route = useRoute()

const visibleNavItems = computed(() => navItems.filter((item) => item.icon.trim() !== ''))

const activeItem = computed(() => {
  const match = navItems.find((item) => item.path === route.path)
  return match?.labelEn ?? 'Home'
})

const footerLinks = {
  support: [
    { key: 'about', label: '关于我们', href: '#' },
    { key: 'responsible', label: '负责任博彩', href: '#' },
    { key: 'privacy', label: '隐私政策', href: '#' },
    { key: 'service', label: '服务条款', href: '#' },
    { key: 'help', label: '帮助中心', href: '#' },
  ],
}
</script>

<template>
  <footer class="bg-card border-t border-border mt-8 relative overflow-hidden">
    <!-- Decorative background layer — blurred, low-opacity gambling symbols -->
    <div class="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <!-- Dice top-left -->
      <svg class="absolute -left-4 -top-4 w-20 h-20 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="10" fill="currentColor"/>
        <circle cx="20" cy="20" r="5" fill="white"/>
        <circle cx="44" cy="20" r="5" fill="white"/>
        <circle cx="32" cy="32" r="5" fill="white"/>
        <circle cx="20" cy="44" r="5" fill="white"/>
        <circle cx="44" cy="44" r="5" fill="white"/>
      </svg>

      <!-- Spade suit top-center -->
      <svg class="absolute left-1/2 -translate-x-1/2 -top-6 w-24 h-24 opacity-[0.05] text-primary blur-[3px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C32 4 6 22 6 36a12 12 0 0 0 20 9c-1 4-3 7-7 9h26c-4-2-6-5-7-9a12 12 0 0 0 20-9C58 22 32 4 32 4z"/>
      </svg>

      <!-- Club suit top-right -->
      <svg class="absolute -right-4 -top-3 w-20 h-20 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="12"/>
        <circle cx="20" cy="38" r="12"/>
        <circle cx="44" cy="38" r="12"/>
        <rect x="27" y="38" width="10" height="14" rx="2"/>
      </svg>

      <!-- Star chip center-left -->
      <svg class="absolute left-[12%] top-1/2 -translate-y-1/2 w-14 h-14 opacity-[0.05] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="currentColor" stroke-width="4"/>
        <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2" stroke-dasharray="4 3"/>
        <polygon points="32,10 35,26 50,26 38,36 42,52 32,42 22,52 26,36 14,26 29,26" fill="currentColor"/>
      </svg>

      <!-- Diamond suit center-right -->
      <svg class="absolute right-[10%] top-1/2 -translate-y-1/2 w-16 h-16 opacity-[0.05] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,4 60,32 32,60 4,32"/>
      </svg>

      <!-- Heart suit bottom-left -->
      <svg class="absolute left-[30%] -bottom-4 w-16 h-16 opacity-[0.05] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56S6 38 6 22a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 16-26 34-26 34z"/>
      </svg>

      <!-- Small dice bottom-right -->
      <svg class="absolute -right-2 -bottom-2 w-14 h-14 opacity-[0.06] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="10" fill="currentColor"/>
        <circle cx="22" cy="22" r="5" fill="white"/>
        <circle cx="42" cy="42" r="5" fill="white"/>
      </svg>
    </div>

    <div class="relative z-10 max-w-screen-xl mx-auto px-4 py-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <!-- Brand -->
        <div class="flex flex-col gap-2 min-w-0">
          <img src="/top10-logo.png" alt="TOP10 Casino" class="h-8 w-auto object-contain" />
          <p class="text-muted-foreground text-xs leading-relaxed max-w-[220px]">
            {{ $t('label.footerIntro') }}
          </p>
        </div>

        <!-- Nav links -->
        <div class="min-w-0">
          <h4 class="font-semibold text-foreground text-xs mb-2 flex items-center gap-1">
            <Gamepad2 class="w-3.5 h-3.5 text-primary" />
            {{ $t('label.gameLobby') }}
          </h4>
          <ul class="flex flex-wrap gap-x-4 gap-y-1.5">
            <li v-for="item in visibleNavItems" :key="item.labelEn">
              <RouterLink
                :to="item.path"
                class="text-xs transition-colors"
                :class="
                  cn(
                    activeItem === item.labelEn
                      ? 'font-semibold text-primary'
                      : 'text-muted-foreground hover:text-primary',
                  )
                "
              >
                {{ $t(`nav.${item.key}`) }}
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="border-t border-border mt-4 pt-3 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="text-xs text-muted-foreground text-center sm:text-left">
          {{ $t('label.copyright') }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">18+</span>
          <div class="w-px h-3 bg-border" />
          <span class="text-xs text-muted-foreground">负责任博彩</span>
          <div class="w-px h-3 bg-border" />
          <span class="text-xs text-muted-foreground">Responsible Gaming</span>
        </div>
      </div>
    </div>
  </footer>
</template>
