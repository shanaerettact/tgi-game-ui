<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import {
  ChevronDown,
  Wallet,
  LogIn,
  Menu,
  X,
  RefreshCw,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/navItems'
import { useUserStore } from '@/store/module/user';
import { useLangStore } from '@/store/module/lang';

const route = useRoute()
const langStore = useLangStore()
const userStore = useUserStore();

const visibleNavItems = computed(() => navItems.filter((item) => item.icon.trim() !== ''))

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

const languageOptions = [
  {
    code: 'zh_cn',
    label: '简体中文',
    flag: `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#DE2910"/><polygon fill="#FFDE00" points="8,6 9.6,11.2 14.8,8.4 10.8,12.4 16.4,12.4 11.2,15.2 13.2,20.8 8,17.2 2.8,20.8 4.8,15.2 0,12.4 5.6,12.4 1.6,8.4 6.8,11.2"/></svg>',
    )}`,
  },
  {
    code: 'en',
    label: 'English',
    flag: `data:image/svg+xml,${encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" fill="#B22234"/><path fill="#fff" d="M0 3h32M0 9h32M0 15h32M0 21h32M0 27h32"/><rect width="14" height="17" fill="#3C3B6E"/></svg>',
    )}`,
  },
] as const

type LanguageCode = (typeof languageOptions)[number]['code']

function getCurrencyFlag(code: CurrencyCode) {
  return currencyOptions.find((item) => item.code === code)?.flag ?? ''
}

function getLanguageLabel(code: LanguageCode) {
  return languageOptions.find((item) => item.code === code)?.label ?? ''
}

function getLanguageFlag(code: LanguageCode) {
  return languageOptions.find((item) => item.code === code)?.flag ?? ''
}

const username = ref('')
const password = ref('')

const mobileOpen = defineModel<boolean>('mobileOpen', { default: false })

const activeItem = computed(() => {
  const match = navItems.find((item) => item.path === route.path)
  return match?.labelEn ?? 'Home'
})
const selectedCurrency = ref<CurrencyCode>('CNY')
const currencyOpen = ref(false)
const currencyDropdownRef = ref<HTMLElement | null>(null)
const currencyDropdownStyle = ref({ top: '0px', left: '0px', minWidth: '0px' })
const selectedLanguage = ref<LanguageCode>('zh_cn')
const languageOpen = ref(false)
const languageDropdownRef = ref<HTMLElement | null>(null)
const languageDropdownStyle = ref({ top: '0px', left: '0px', minWidth: '0px' })
const balanceRefreshing = ref(false)
let balanceRefreshTimer: ReturnType<typeof setTimeout> | null = null

async function refreshBalance() {
  if (balanceRefreshing.value) return
  balanceRefreshing.value = true
  if (balanceRefreshTimer) clearTimeout(balanceRefreshTimer)
  await userStore.getBalance()
  balanceRefreshTimer = setTimeout(() => {
    balanceRefreshing.value = false
    balanceRefreshTimer = null
  }, 600)
}

function getCurrencyTrigger() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-currency-trigger]')
  return (
    Array.from(triggers).find((el) => el.getBoundingClientRect().width > 0) ?? triggers[0] ?? null
  )
}

function updateCurrencyDropdownPosition() {
  const trigger = getCurrencyTrigger()
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
    languageOpen.value = false
    await nextTick()
    updateCurrencyDropdownPosition()
  }
}

function getLanguageTrigger() {
  const triggers = document.querySelectorAll<HTMLElement>('[data-language-trigger]')
  return (
    Array.from(triggers).find((el) => el.getBoundingClientRect().width > 0) ?? triggers[0] ?? null
  )
}

function updateLanguageDropdownPosition() {
  const trigger = getLanguageTrigger()
  if (!trigger) return
  const rect = trigger.getBoundingClientRect()
  languageDropdownStyle.value = {
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    minWidth: `${rect.width}px`,
  }
}

async function toggleLanguageMenu() {
  languageOpen.value = !languageOpen.value
  if (languageOpen.value) {
    currencyOpen.value = false
    await nextTick()
    updateLanguageDropdownPosition()
  }
}

function selectLanguage(language: LanguageCode) {
  selectedLanguage.value = language
  languageOpen.value = false
  langStore.setLang(language)
}

function selectCurrency(currency: CurrencyCode) {
  selectedCurrency.value = currency
  currencyOpen.value = false
  userStore.setCurrency(currency)
  userStore.getBalance()
}

function handleCurrencyClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    (target as Element).closest?.('[data-currency-menu]') ||
    currencyDropdownRef.value?.contains(target)
  ) {
    return
  }
  currencyOpen.value = false
}

function handleLanguageClickOutside(event: MouseEvent) {
  const target = event.target as Node
  if (
    (target as Element).closest?.('[data-language-menu]') ||
    languageDropdownRef.value?.contains(target)
  ) {
    return
  }
  languageOpen.value = false
}

function handleDropdownLayout() {
  if (currencyOpen.value) updateCurrencyDropdownPosition()
  if (languageOpen.value) updateLanguageDropdownPosition()
}

onMounted(() => {
  document.addEventListener('click', handleCurrencyClickOutside)
  document.addEventListener('click', handleLanguageClickOutside)
  window.addEventListener('resize', handleDropdownLayout)
  window.addEventListener('scroll', handleDropdownLayout, true)

  selectedLanguage.value = langStore.current as LanguageCode
  if (userStore.isLogin) userStore.getBalance()
})
onUnmounted(() => {
  document.removeEventListener('click', handleCurrencyClickOutside)
  document.removeEventListener('click', handleLanguageClickOutside)
  window.removeEventListener('resize', handleDropdownLayout)
  window.removeEventListener('scroll', handleDropdownLayout, true)
  if (balanceRefreshTimer) clearTimeout(balanceRefreshTimer)
  if (mobileOpen.value) unlockBodyScroll()
})

function closeMobileMenu() {
  mobileOpen.value = false
}

let savedScrollY = 0

function lockBodyScroll() {
  savedScrollY = window.scrollY
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${savedScrollY}px`
  document.body.style.left = '0'
  document.body.style.right = '0'
  document.body.style.width = '100%'
}

function unlockBodyScroll() {
  document.body.style.overflow = ''
  document.body.style.position = ''
  document.body.style.top = ''
  document.body.style.left = ''
  document.body.style.right = ''
  document.body.style.width = ''
  window.scrollTo(0, savedScrollY)
}

watch(mobileOpen, (open) => {
  if (open) {
    lockBodyScroll()
  } else {
    unlockBodyScroll()
  }
})
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
        <RouterLink
          v-for="item in visibleNavItems"
          :key="item.labelEn"
          :to="item.path"
          class="flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-150"
          :class="
            cn(
              activeItem === item.labelEn
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )
          "
        >
          <img :src="item.icon" :alt="item.label" class="h-5 w-5 shrink-0 rounded object-contain" />
          <span class="flex shrink-0 flex-col items-start leading-tight whitespace-nowrap">
            <span>{{ $t(`nav.${item.key}`) }}</span>
          </span>
        </RouterLink>
      </nav>

      <div
        class="relative z-10 flex items-center justify-end gap-1.5 bg-card pl-2 shadow-[-10px_0_12px_-10px_rgba(0,0,0,0.12)] sm:pl-3"
      >
        <template v-if="userStore.isLogin">
          <div data-currency-menu class="hidden md:block">
            <button
              type="button"
              data-currency-trigger
              class="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1 text-sm transition-colors hover:bg-border"
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
            class="hidden shrink-0 flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg px-2 border border-border py-1 text-sm md:flex"
          >
            <Wallet class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span class="hidden shrink-0 text-muted-foreground 2xl:inline">{{ $t('label.balance') }}：</span>
            <span class="shrink-0 font-semibold tabular-nums text-foreground">{{ userStore.balance }}</span>
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
            class="hidden shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1 text-sm font-medium text-foreground transition-colors hover:bg-border md:flex"
          >
            <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span class="text-xs font-bold text-primary">{{ userStore.player?.charAt(0) }}</span>
            </div>
            <span class="hidden shrink-0 2xl:inline">{{ userStore.player }}</span>
          </div>
          <button
            type="button"
            :aria-label="$t('label.logout')"
            class="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors cursor-pointer hover:bg-[#c4102a] sm:flex"
            @click="userStore.logout()"
          >
            <LogIn class="h-4 w-4 shrink-0" />
            <span class="hidden shrink-0 2xl:inline">{{ $t('label.logout') }}</span>
          </button>
        </template>
        <template v-else>
          <div
            class="hidden shrink-0 flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1 text-sm transition-colors focus-within:border-primary md:flex"
          >
            <input v-model="username" type="text" id="login-username" class="w-20 border-0 bg-transparent pl-1 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0" :placeholder="$t('label.username')">
          </div>
          <div
            class="hidden shrink-0 flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1 text-sm transition-colors focus-within:border-primary md:flex"
          >
            <input v-model="password" type="password" id="login-password" class="w-20 border-0 bg-transparent pl-1 outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 active:border-0" :placeholder="$t('label.password')" @keydown.enter="userStore.login(username, password)">
          </div>
          <button
            type="button"
            :aria-label="$t('label.login')"
            class="hidden shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-2.5 py-1.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors cursor-pointer hover:bg-[#75a5ff] sm:flex"
            @click="userStore.login(username, password)"
          >
            <LogIn class="h-4 w-4 shrink-0" />
            <span class="hidden shrink-0 2xl:inline">{{ $t('label.login') }}</span>
          </button>
        </template>
        <div data-language-menu class="hidden 2xl:block">
          <button
            type="button"
            data-language-trigger
            class="flex shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:border-primary/50"
            @click.stop="toggleLanguageMenu"
          >
            <img
              :src="getLanguageFlag(selectedLanguage)"
              :alt="getLanguageLabel(selectedLanguage)"
              class="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-border/50"
            />
            <span class="shrink-0">{{ getLanguageLabel(selectedLanguage) }}</span>
            <ChevronDown
              :class="
                cn(
                  'h-3 w-3 shrink-0 transition-transform',
                  languageOpen && 'rotate-180',
                )
              "
            />
          </button>
        </div>
        <Teleport to="body">
          <div
            v-if="languageOpen"
            ref="languageDropdownRef"
            class="fixed z-[100] rounded-lg border border-border bg-card py-1 shadow-lg"
            :style="languageDropdownStyle"
          >
            <button
              v-for="option in languageOptions"
              :key="option.code"
              type="button"
              class="flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-left text-sm transition-colors hover:bg-secondary"
              :class="
                selectedLanguage === option.code ? 'font-semibold text-primary' : 'text-foreground'
              "
              @click="selectLanguage(option.code)"
            >
              <img
                :src="option.flag"
                :alt="option.label"
                class="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-border/50"
              />
              {{ option.label }}
            </button>
          </div>
        </Teleport>
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

    <div
      v-if="mobileOpen"
      class="lg:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-border bg-card px-3 pb-3 pt-2 overscroll-contain"
    >
      <nav class="mb-4 flex flex-col gap-1">
        <RouterLink
          v-for="item in visibleNavItems"
          :key="item.labelEn"
          :to="item.path"
          class="flex items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-medium transition-all duration-150"
          :class="
            cn(
              activeItem === item.labelEn
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-secondary',
            )
          "
          @click="closeMobileMenu"
        >
          <img :src="item.icon" :alt="item.label" class="h-5 w-5 shrink-0 rounded object-contain" />
          <span class="flex min-w-0 flex-col gap-0.5">
            <span>{{ item.label }}</span>
          </span>
        </RouterLink>
      </nav>
      <div class="flex flex-col gap-3 border-t border-border pt-4">
        <template v-if="userStore.isLogin">
          <div data-currency-menu>
            <button
              type="button"
              data-currency-trigger
              class="flex w-full cursor-pointer items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm transition-colors hover:bg-border"
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
                    'ml-auto h-3 w-3 shrink-0 text-muted-foreground transition-transform',
                    currencyOpen && 'rotate-180',
                  )
                "
              />
            </button>
          </div>
          <div
            class="flex w-full flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-2 text-sm"
          >
            <Wallet class="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
            <span class="shrink-0 text-muted-foreground">{{ $t('label.balance') }}：</span>
            <span class="shrink-0 font-semibold tabular-nums text-foreground">{{ userStore.balance }}</span>
            <button
              type="button"
              aria-label="刷新余额"
              class="ml-auto cursor-pointer text-muted-foreground transition-colors hover:text-primary"
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
            class="flex w-full cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-border"
          >
            <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <span class="text-xs font-bold text-primary">{{ userStore.player?.charAt(0) }}</span>
            </div>
            <span class="shrink-0">{{ userStore.player }}</span>
          </div>
        </template>
        <template v-else>
          <div
            class="flex w-full flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-2 text-sm"
          >
            <input v-model="username" type="text" id="login-username-mobile" class="w-full border pl-1" :placeholder="$t('label.username')">
          </div>
          <div
            class="flex w-full flex-nowrap items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-2 text-sm"
          >
            <input v-model="password" type="password" id="login-username-mobile" class="w-full border pl-1" :placeholder="$t('label.password')" >
          </div>
        </template>
        <div data-language-menu>
          <button
            type="button"
            data-language-trigger
            class="flex w-full cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-lg border border-border px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:border-primary/50"
            @click.stop="toggleLanguageMenu"
          >
            <img
              :src="getLanguageFlag(selectedLanguage)"
              :alt="getLanguageLabel(selectedLanguage)"
              class="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-border/50"
            />
            <span class="shrink-0">{{ getLanguageLabel(selectedLanguage) }}</span>
            <ChevronDown
              :class="
                cn(
                  'ml-auto h-3 w-3 shrink-0 transition-transform',
                  languageOpen && 'rotate-180',
                )
              "
            />
          </button>
        </div>
        <button v-if="userStore.isLogin"
          type="button"
          :aria-label="$t('label.logout')"
          class="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#c4102a]"
        >
          <LogIn class="h-4 w-4 shrink-0" />
          {{ $t('label.logout') }}
        </button>
        <button v-else
          type="button"
          :aria-label="$t('label.login')"
          class="flex w-full items-center justify-center gap-1.5 whitespace-nowrap rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-[#75a5ff]"
          @click="userStore.login(username, password)"
        >
          <LogIn class="h-4 w-4 shrink-0" />
          {{ $t('label.login') }}
        </button>
      </div>
    </div>
  </header>
</template>
