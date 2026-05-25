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

      <!-- ── FAR BACKGROUND (heaviest blur, lowest opacity) ─────────────────── -->

      <!-- Large roulette wheel — far-left background anchor -->
      <svg class="absolute -left-10 top-1/2 -translate-y-1/2 w-36 h-36 opacity-[0.04] text-primary blur-[5px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="3"/>
        <circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
        <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="5" fill="currentColor"/>
        <line x1="32" y1="2" x2="32" y2="62" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
        <line x1="2" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
        <line x1="10" y1="10" x2="54" y2="54" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
        <line x1="54" y1="10" x2="10" y2="54" stroke="currentColor" stroke-width="1" stroke-dasharray="2 4"/>
      </svg>

      <!-- Large spade — far-right background anchor -->
      <svg class="absolute -right-8 top-1/2 -translate-y-1/2 w-32 h-32 opacity-[0.04] text-primary blur-[5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C32 4 6 22 6 36a12 12 0 0 0 20 9c-1 4-3 7-7 9h26c-4-2-6-5-7-9a12 12 0 0 0 20-9C58 22 32 4 32 4z"/>
      </svg>

      <!-- Large club — far top-center -->
      <svg class="absolute left-[48%] -top-10 w-28 h-28 opacity-[0.04] text-primary blur-[5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="12"/>
        <circle cx="20" cy="38" r="12"/>
        <circle cx="44" cy="38" r="12"/>
        <rect x="27" y="38" width="10" height="14" rx="2"/>
      </svg>

      <!-- ── MID BACKGROUND (medium blur, medium opacity) ────────────────────── -->

      <!-- Dice top-left -->
      <svg class="absolute -left-4 -top-4 w-20 h-20 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="10" fill="currentColor"/>
        <circle cx="20" cy="20" r="5" fill="white"/>
        <circle cx="44" cy="20" r="5" fill="white"/>
        <circle cx="32" cy="32" r="5" fill="white"/>
        <circle cx="20" cy="44" r="5" fill="white"/>
        <circle cx="44" cy="44" r="5" fill="white"/>
      </svg>

      <!-- Club suit top-right -->
      <svg class="absolute -right-4 -top-3 w-20 h-20 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="12"/>
        <circle cx="20" cy="38" r="12"/>
        <circle cx="44" cy="38" r="12"/>
        <rect x="27" y="38" width="10" height="14" rx="2"/>
      </svg>

      <!-- Poker chip — left-center mid -->
      <svg class="absolute left-[12%] top-1/2 -translate-y-1/2 w-16 h-16 opacity-[0.055] text-primary blur-[2.5px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="4"/>
        <circle cx="32" cy="32" r="21" stroke="currentColor" stroke-width="2.5" stroke-dasharray="5 3"/>
        <circle cx="32" cy="32" r="13" stroke="currentColor" stroke-width="2"/>
        <circle cx="32" cy="32" r="5" fill="currentColor"/>
      </svg>

      <!-- Diamond suit center-right mid -->
      <svg class="absolute right-[10%] top-1/2 -translate-y-1/2 w-16 h-16 opacity-[0.055] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,4 60,32 32,60 4,32"/>
      </svg>

      <!-- Heart suit bottom-left quadrant -->
      <svg class="absolute left-[28%] -bottom-4 w-16 h-16 opacity-[0.055] text-primary blur-[2px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56S6 38 6 22a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 16-26 34-26 34z"/>
      </svg>

      <!-- Small dice bottom-right -->
      <svg class="absolute -right-2 -bottom-2 w-14 h-14 opacity-[0.06] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="4" y="4" width="56" height="56" rx="10" fill="currentColor"/>
        <circle cx="22" cy="22" r="5" fill="white"/>
        <circle cx="42" cy="42" r="5" fill="white"/>
      </svg>

      <!-- Spade top-center mid -->
      <svg class="absolute left-1/2 -translate-x-1/2 -top-5 w-20 h-20 opacity-[0.055] text-primary blur-[2.5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C32 4 6 22 6 36a12 12 0 0 0 20 9c-1 4-3 7-7 9h26c-4-2-6-5-7-9a12 12 0 0 0 20-9C58 22 32 4 32 4z"/>
      </svg>

      <!-- Horseshoe — right side mid -->
      <svg class="absolute right-[22%] -bottom-3 w-14 h-14 opacity-[0.05] text-primary blur-[2px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 48 C10 20 54 20 54 48" stroke="currentColor" stroke-width="7" stroke-linecap="round" fill="none"/>
        <rect x="6" y="44" width="10" height="14" rx="3" fill="currentColor"/>
        <rect x="48" y="44" width="10" height="14" rx="3" fill="currentColor"/>
      </svg>

      <!-- ── CENTER FILL (middle horizontal band, staggered vertically) ────────── -->

      <!-- Roulette wheel — dead center, large far-bg anchor -->
      <svg class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 opacity-[0.045] text-primary blur-[4px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="30" stroke="currentColor" stroke-width="3"/>
        <circle cx="32" cy="32" r="22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="3 2"/>
        <circle cx="32" cy="32" r="14" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="32" cy="32" r="5" fill="currentColor"/>
        <line x1="32" y1="2" x2="32" y2="18" stroke="currentColor" stroke-width="1.5"/>
        <line x1="32" y1="46" x2="32" y2="62" stroke="currentColor" stroke-width="1.5"/>
        <line x1="2" y1="32" x2="18" y2="32" stroke="currentColor" stroke-width="1.5"/>
        <line x1="46" y1="32" x2="62" y2="32" stroke="currentColor" stroke-width="1.5"/>
        <line x1="10" y1="10" x2="20" y2="20" stroke="currentColor" stroke-width="1.5"/>
        <line x1="44" y1="44" x2="54" y2="54" stroke="currentColor" stroke-width="1.5"/>
        <line x1="54" y1="10" x2="44" y2="20" stroke="currentColor" stroke-width="1.5"/>
        <line x1="20" y1="44" x2="10" y2="54" stroke="currentColor" stroke-width="1.5"/>
      </svg>

      <!-- Playing card outline — center-left of middle -->
      <svg class="absolute left-[33%] top-1/2 -translate-y-[40%] w-14 h-18 opacity-[0.05] text-primary blur-[2.5px]" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="52" rx="4" stroke="currentColor" stroke-width="2.5"/>
        <text x="6" y="16" font-size="12" fill="currentColor" font-family="serif" font-weight="bold">A</text>
        <path d="M20 22 C20 22 12 28 12 34 a8 8 0 0 0 16 0 C28 28 20 22 20 22z" fill="currentColor"/>
        <text x="26" y="50" font-size="12" fill="currentColor" font-family="serif" font-weight="bold" transform="rotate(180 30 46)">A</text>
      </svg>

      <!-- Playing card outline — center-right of middle -->
      <svg class="absolute right-[33%] top-1/2 -translate-y-[60%] w-14 h-18 opacity-[0.05] text-primary blur-[2.5px]" viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="36" height="52" rx="4" stroke="currentColor" stroke-width="2.5"/>
        <text x="6" y="16" font-size="12" fill="currentColor" font-family="serif" font-weight="bold">K</text>
        <path d="M20 20 C20 20 10 29 20 36 C30 29 20 20 20 20z M20 36 L16 48 L20 44 L24 48 Z" fill="currentColor"/>
        <text x="26" y="50" font-size="12" fill="currentColor" font-family="serif" font-weight="bold" transform="rotate(180 30 46)">K</text>
      </svg>

      <!-- Poker chip — center-left mid -->
      <svg class="absolute left-[42%] top-1/2 -translate-y-[75%] w-10 h-10 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="4"/>
        <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/>
        <circle cx="32" cy="32" r="11" stroke="currentColor" stroke-width="2"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>

      <!-- Poker chip — center-right mid -->
      <svg class="absolute right-[42%] top-1/2 translate-y-[20%] w-10 h-10 opacity-[0.06] text-primary blur-[2px]" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="29" stroke="currentColor" stroke-width="4"/>
        <circle cx="32" cy="32" r="20" stroke="currentColor" stroke-width="2" stroke-dasharray="5 3"/>
        <circle cx="32" cy="32" r="11" stroke="currentColor" stroke-width="2"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
      </svg>

      <!-- Small spade — upper center-left -->
      <svg class="absolute left-[36%] top-[15%] w-7 h-7 opacity-[0.065] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C32 4 6 22 6 36a12 12 0 0 0 20 9c-1 4-3 7-7 9h26c-4-2-6-5-7-9a12 12 0 0 0 20-9C58 22 32 4 32 4z"/>
      </svg>

      <!-- Small diamond — upper center-right -->
      <svg class="absolute right-[35%] top-[10%] w-7 h-7 opacity-[0.065] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,4 60,32 32,60 4,32"/>
      </svg>

      <!-- Small heart — lower center-left -->
      <svg class="absolute left-[38%] bottom-[10%] w-7 h-7 opacity-[0.065] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56S6 38 6 22a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 16-26 34-26 34z"/>
      </svg>

      <!-- Small club — lower center-right -->
      <svg class="absolute right-[37%] bottom-[8%] w-7 h-7 opacity-[0.065] text-primary blur-[1.5px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="12"/>
        <circle cx="20" cy="38" r="12"/>
        <circle cx="44" cy="38" r="12"/>
        <rect x="27" y="38" width="10" height="14" rx="2"/>
      </svg>

      <!-- ── NEAR FOREGROUND-ADJACENT (softest blur, slightly more present) ──── -->

      <!-- Stacked poker chips — left edge bottom -->
      <svg class="absolute left-[5%] -bottom-2 w-10 h-10 opacity-[0.07] text-primary blur-[1px]" viewBox="0 0 40 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="20" cy="52" rx="18" ry="6" fill="currentColor" opacity="0.9"/>
        <ellipse cx="20" cy="44" rx="18" ry="6" fill="currentColor" opacity="0.75"/>
        <ellipse cx="20" cy="36" rx="18" ry="6" fill="currentColor" opacity="0.6"/>
        <ellipse cx="20" cy="28" rx="18" ry="6" fill="currentColor" opacity="0.45"/>
      </svg>

      <!-- Small diamond — top-left area -->
      <svg class="absolute left-[20%] top-1 w-8 h-8 opacity-[0.07] text-primary blur-[1px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,4 60,32 32,60 4,32"/>
      </svg>

      <!-- Small heart — top-right area -->
      <svg class="absolute right-[18%] top-1 w-8 h-8 opacity-[0.07] text-primary blur-[1px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 56S6 38 6 22a14 14 0 0 1 26-7 14 14 0 0 1 26 7c0 16-26 34-26 34z"/>
      </svg>

      <!-- Tiny club bottom-center -->
      <svg class="absolute left-[52%] -bottom-1 w-9 h-9 opacity-[0.07] text-primary blur-[1px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="12"/>
        <circle cx="20" cy="38" r="12"/>
        <circle cx="44" cy="38" r="12"/>
        <rect x="27" y="38" width="10" height="14" rx="2"/>
      </svg>

      <!-- Tiny spade bottom-left -->
      <svg class="absolute left-[40%] -bottom-2 w-8 h-8 opacity-[0.06] text-primary blur-[1px]" viewBox="0 0 64 64" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4C32 4 6 22 6 36a12 12 0 0 0 20 9c-1 4-3 7-7 9h26c-4-2-6-5-7-9a12 12 0 0 0 20-9C58 22 32 4 32 4z"/>
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
