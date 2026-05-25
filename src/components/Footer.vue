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
  <footer class="bg-card border-t border-border mt-16">
    <div class="max-w-screen-xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <img src="/top10-logo.png" alt="TOP10 Casino" class="h-10 w-auto object-contain sm:h-11" />
          </div>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">
            {{ $t('label.footerIntro') }}
          </p>
        </div>

        <div>
          <h4 class="font-bold text-foreground text-sm mb-4 flex items-center gap-1.5">
            <Gamepad2 class="w-4 h-4 text-primary" />
            {{ $t('label.gameLobby') }}
          </h4>
          <ul class="space-y-2.5">
            <li v-for="item in visibleNavItems" :key="item.labelEn">
              <RouterLink
                :to="item.path"
                class="text-sm transition-colors"
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

      <div class="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-muted-foreground text-center md:text-left">
          {{ $t('label.copyright') }}
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">18+</span>
          <div class="w-px h-4 bg-border" />
          <span class="text-xs text-muted-foreground">负责任博彩</span>
          <div class="w-px h-4 bg-border" />
          <span class="text-xs text-muted-foreground">Responsible Gaming</span>
        </div>
      </div>
    </div>
  </footer>
</template>
