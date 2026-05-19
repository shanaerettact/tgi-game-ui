<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import {
  Zap,
  Trophy,
  Users,
  LayoutGrid,
  ChevronDown,
  Globe,
  Wallet,
  LogIn,
  UserPlus,
  Menu,
  X,
  RefreshCw,
  Fish,
  Home,
  Gamepad,
  Bird,
  Gamepad2,
  type LucideIcon,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

const navItems: { label: string; labelEn: string; icon: LucideIcon }[] = [
  { label: '首頁', labelEn: 'Home', icon: Home },
  { label: '棋牌', labelEn: 'Board', icon: LayoutGrid },
  { label: '真人', labelEn: 'Live', icon: Users },
  { label: '电子', labelEn: 'Slots', icon: Gamepad },
  { label: '捕鱼', labelEn: 'Fishing', icon: Fish },
  { label: '体育', labelEn: 'Sports', icon: Trophy },
  { label: '电竞', labelEn: 'Esports', icon: Gamepad2 },
  { label: '彩票', labelEn: 'Lottery', icon: Zap },
  { label: '斗鸡', labelEn: 'Fighting', icon: Bird },
]

const currencyOptions = [
  {
    code: 'CNY',
    flag: `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#DE2910"/><polygon fill="#FFDE00" points="8,6 9.6,11.2 14.8,8.4 10.8,12.4 16.4,12.4 11.2,15.2 13.2,20.8 8,17.2 2.8,20.8 4.8,15.2 0,12.4 5.6,12.4 1.6,8.4 6.8,11.2"/></svg>',
    )}`,
  },
  {
    code: 'USD',
    flag: `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#B22234"/><path fill="#fff" d="M0 3h32M0 9h32M0 15h32M0 21h32M0 27h32"/><rect width="14" height="17" fill="#3C3B6E"/></svg>',
    )}`,
  },
] as const

type CurrencyCode = (typeof currencyOptions)[number]['code']

function getCurrencyFlag(code: CurrencyCode) {
  return currencyOptions.find((item) => item.code === code)?.flag ?? ''
}

const mobileOpen = ref(false)
const activeItem = ref('Home')
const selectedCurrency = ref<CurrencyCode>('CNY')
const currencyOpen = ref(false)
const currencyMenuRef = ref<HTMLElement | null>(null)
const currencyDropdownRef = ref<HTMLElement | null>(null)
const currencyDropdownStyle = ref({ top: '0px', left: '0px', minWidth: '0px' })
const balanceRefreshing = ref(false)
let balanceRefreshTimer: ReturnType<typeof setTimeout> | null = null

function refreshBalance() {
  if (balanceRefreshing.value) return
  balanceRefreshing.value = true
  if (balanceRefreshTimer) clearTimeout(balanceRefreshTimer)
  balanceRefreshTimer = setTimeout(() => {
    balanceRefreshing.value = false
    balanceRefreshTimer = null
  }, 600)
}

function updateCurrencyDropdownPosition() {
  const trigger = currencyMenuRef.value?.querySelector('button')
  if (!trigger) return
  const rect = trigger.getBoundingClientRect()
  currencyDropdownStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
}

async function toggleCurrencyMenu() {
  currencyOpen.value = !currencyOpen.value
  if (currencyOpen.value) {
    await nextTick()
    updateCurrencyDropdownPosition()
  }
}

function selectCurrency(currency: CurrencyCode) {
  selectedCurrency.value = currency
  currencyOpen.value = false
}

function handleCurrencyClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (currencyMenuRef.value?.contains(target) || currencyDropdownRef.value?.contains(target)) {
    return
  }
  currencyOpen.value = false
}

function handleCurrencyDropdownLayout() {
  if (currencyOpen.value) {
    updateCurrencyDropdownPosition()
  }
}

onMounted(() => {
  document.addEventListener('click', handleCurrencyClickOutside)
  window.addEventListener('resize', handleCurrencyDropdownLayout)
  window.addEventListener('scroll', handleCurrencyDropdownLayout, true)
})
onUnmounted(() => {
  document.removeEventListener('click', handleCurrencyClickOutside)
  window.removeEventListener('resize', handleCurrencyDropdownLayout)
  window.removeEventListener('scroll', handleCurrencyDropdownLayout, true)
  if (balanceRefreshTimer) clearTimeout(balanceRefreshTimer)
})

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
    <div
      class="mx-auto grid min-h-16 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 px-2 py-1 sm:gap-x-3 sm:px-3"
    >
      <a href="#" class="flex items-center shrink-0" aria-label="TOP10">
        <img src="/top10-logo.png" alt="TOP10" class="h-8 w-auto object-contain sm:h-9" />
      </a>

      <nav
        class="hidden min-w-0 items-center justify-start gap-0.5 overflow-x-auto scroll-pr-4 lg:flex [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <button
          v-for="item in navItems"
          :key="item.labelEn"
          type="button"
          class="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-150"
          :class="
            cn(
              activeItem === item.labelEn
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )
          "
          @click="setActiveItem(item.labelEn)"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span class="flex shrink-0 flex-col items-start leading-tight whitespace-nowrap">
            <span>{{ item.label }}</span>
            <span class="hidden text-[10px] font-normal opacity-70 2xl:block">{{ item.labelEn }}</span>
          </span>
        </button>
      </nav>

      <div
        class="relative z-10 flex items-center justify-end gap-1.5 bg-card pl-2 shadow-[-10px_0_12px_-10px_rgba(0,0,0,0.12)] sm:pl-3"
      >
        <div ref="currencyMenuRef" class="hidden md:block">
          <button
            type="button"
            class="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg bg-secondary px-2 py-1 text-sm transition-colors hover:bg-border"
            @click.stop="toggleCurrencyMenu"
          >
            <img
              :src="getCurrencyFlag(selectedCurrency)"
              :alt="selectedCurrency"
              class="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-border/50"
            />
            <span class="shrink-0 font-medium text-foreground">{{ selectedCurrency }}</span>
            <ChevronDown
              :class="
                cn(
                  'h-3 w-3 shrink-0 text-muted-foreground transition-transform',
                  currencyOpen && 'rotate-180',
                )
              "
            />
          </button>
        </div>
        <Teleport to="body">
          <div
            v-if="currencyOpen"
            ref="currencyDropdownRef"
            class="fixed z-[100] rounded-lg border border-border bg-card py-1 shadow-lg"
            :style="currencyDropdownStyle"
          >
            <button
              v-for="option in currencyOptions"
              :key="option.code"
              type="button"
              class="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-secondary"
              :class="
                selectedCurrency === option.code ? 'font-semibold text-primary' : 'text-foreground'
              "
              @click="selectCurrency(option.code)"
            >
              <img
                :src="option.flag"
                :alt="option.code"
                class="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-border/50"
              />
              {{ option.code }}
            </button>
          </div>
        </Teleport>
        <div
          class="hidden shrink-0 flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg bg-secondary px-2 py-1 text-sm md:flex"
        >
          <Wallet class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span class="hidden shrink-0 text-muted-foreground 2xl:inline">余额：</span>
          <span class="shrink-0 font-semibold tabular-nums text-foreground">206.94</span>
          <button
            type="button"
            aria-label="刷新余额"
            class="cursor-pointer text-muted-foreground transition-colors hover:text-primary"
            @click="refreshBalance"
          >
            <RefreshCw
              :class="
                cn('h-3 w-3 shrink-0', balanceRefreshing && 'animate-spin text-primary')
              "
            />
          </button>
        </div>
        <div
          class="hidden shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg bg-secondary px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-border md:flex"
        >
          <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <span class="text-xs font-bold text-primary">J</span>
          </div>
          <span class="hidden shrink-0 2xl:inline">johnny</span>
        </div>
        <button
          type="button"
          aria-label="登出"
          class="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#c4102a] sm:flex"
        >
          <LogIn class="h-4 w-4 shrink-0" />
          <span class="hidden shrink-0 2xl:inline">登出</span>
        </button>
        <div
          class="hidden shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50 2xl:flex"
        >
          <Globe class="h-4 w-4 shrink-0" />
          <span class="hidden shrink-0 2xl:inline">简体中文</span>
          <ChevronDown class="h-3 w-3 shrink-0" />
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

    <div v-if="mobileOpen" class="lg:hidden border-t border-border bg-card px-3 pb-3 pt-2">
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
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          <span class="flex min-w-0 flex-col gap-0.5">
            <span>{{ item.label }}</span>
            <span class="text-xs opacity-60">{{ item.labelEn }}</span>
          </span>
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
