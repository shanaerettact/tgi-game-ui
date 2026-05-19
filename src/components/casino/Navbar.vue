<script setup lang="ts">
import { ref } from 'vue'
import {
  Zap,
  Trophy,
  Gamepad2,
  Users,
  Gift,
  LayoutGrid,
  ChevronDown,
  Globe,
  Wallet,
  LogIn,
  UserPlus,
  Menu,
  X,
  RefreshCw,
  type LucideIcon,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const navItems: { label: string; labelEn: string; icon: LucideIcon }[] = [
  { label: '体育', labelEn: 'Sports', icon: Trophy },
  { label: '彩票', labelEn: 'Lottery', icon: Zap },
  { label: '电子', labelEn: 'Slots', icon: Gamepad2 },
  { label: '真人', labelEn: 'Live', icon: Users },
  { label: '礼物', labelEn: 'Gifts', icon: Gift },
  { label: '棋牌', labelEn: 'Board', icon: LayoutGrid },
]

const mobileOpen = ref(false)
const activeItem = ref('Slots')

function setActiveItem(labelEn: string) {
  activeItem.value = labelEn
}

function selectNavItem(labelEn: string) {
  setActiveItem(labelEn)
  mobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 w-full bg-card border-b border-border shadow-sm">
    <div class="max-w-screen-xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
      <a href="#" class="flex items-center gap-2 shrink-0">
        <div
          class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground font-bold text-sm leading-none"
        >
          TOP<br />10
        </div>
        <span class="hidden sm:block font-bold text-lg text-foreground tracking-tight">
          TOP<span class="text-primary">10</span>
        </span>
      </a>

      <nav class="hidden lg:flex items-center gap-1">
        <button
          v-for="item in navItems"
          :key="item.labelEn"
          type="button"
          class="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-150"
          :class="
            cn(
              activeItem === item.labelEn
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )
          "
          @click="setActiveItem(item.labelEn)"
        >
          <component :is="item.icon" class="w-4 h-4" />
          <span>{{ item.label }}</span>
          <span class="text-[10px] opacity-70">{{ item.labelEn }}</span>
        </button>
      </nav>

      <div class="flex items-center gap-2">
        <div class="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm">
          <span class="w-3 h-3 rounded-full bg-primary inline-block" />
          <span class="font-medium text-foreground">CNY</span>
          <ChevronDown class="w-3 h-3 text-muted-foreground" />
        </div>
        <div class="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm">
          <Wallet class="w-3.5 h-3.5 text-muted-foreground" />
          <span class="text-muted-foreground">余额：</span>
          <span class="font-semibold text-foreground">206.94</span>
          <RefreshCw
            class="w-3 h-3 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          />
        </div>
        <div
          class="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-secondary rounded-lg text-sm font-medium text-foreground cursor-pointer hover:bg-border transition-colors"
        >
          <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
            <span class="text-primary text-xs font-bold">J</span>
          </div>
          <span>johnny</span>
        </div>
        <button
          type="button"
          class="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-[#c4102a] transition-colors shadow-sm"
        >
          <LogIn class="w-4 h-4" />
          登出
        </button>
        <button
          type="button"
          class="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-lg border border-primary text-primary text-sm font-semibold hover:bg-primary/5 transition-colors"
        >
          <UserPlus class="w-4 h-4" />
          注册
        </button>
        <div
          class="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground cursor-pointer hover:border-primary/50 transition-colors"
        >
          <Globe class="w-4 h-4" />
          <span>简体中文</span>
          <ChevronDown class="w-3 h-3" />
        </div>
        <button
          type="button"
          class="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <X v-if="mobileOpen" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
        </button>
      </div>
    </div>

    <div v-if="mobileOpen" class="lg:hidden border-t border-border bg-card px-4 pb-4 pt-2">
      <nav class="flex flex-col gap-1">
        <button
          v-for="item in navItems"
          :key="item.labelEn"
          type="button"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 text-left"
          :class="
            cn(
              activeItem === item.labelEn
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )
          "
          @click="selectNavItem(item.labelEn)"
        >
          <component :is="item.icon" class="w-4 h-4 shrink-0" />
          <span>{{ item.label }}</span>
          <span class="opacity-60 text-xs">{{ item.labelEn }}</span>
        </button>
      </nav>
      <div class="mt-4 flex gap-2">
        <button
          type="button"
          class="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
        >
          <LogIn class="w-4 h-4" />
          登出
        </button>
        <button
          type="button"
          class="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-primary text-primary text-sm font-semibold"
        >
          <UserPlus class="w-4 h-4" />
          注册
        </button>
      </div>
    </div>
  </header>
</template>
