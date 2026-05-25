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
  <footer class="bg-card border-t border-border mt-8">
    <div class="max-w-screen-xl mx-auto px-4 py-5">
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
