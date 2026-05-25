<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/store/module/game';
import GameCard, { type BrandItem, type Game } from './GameCard.vue'
import { useI18n } from 'vue-i18n';
import { useLangStore } from '@/store/module/lang';

const { t } = useI18n();
const langStore = useLangStore()
const gameStore = useGameStore()

const imgUrl = import.meta.env.VITE_TGI_IMG_URL

const props = withDefaults(
  defineProps<{
    category?: string
    title?: string
    titleEn?: string
    showCategoryTabs?: boolean
  }>(),
  {
    category: 'all',
    title: '热门游戏',
    titleEn: 'Popular Games',
    showCategoryTabs: true,
  },
)

const categoryMap = new Map<String, { productType: number;}>([
  ['chess', { productType: 5 }],
  ['live', { productType: 4 }],
  ['slots', { productType: 1 }],
  ['sports', { productType: 2 }],
  ['lottery', { productType: 3 }],
])

const activeProduct = ref('')

const categoryBrands = ref<BrandItem[]>([])

const displayGames = ref<Game[]>([])

const setCateAndGame = async () => {
  await gameStore.getGameList()

  const type = categoryMap.get(props.category)?.productType
  const navIndex = gameStore.respDemoGameList.navs.findIndex(d => d.productType == type)
  const gameItems = gameStore.respDemoGameList.gameItems[navIndex]
  if (gameItems) {
    activeProduct.value = gameItems[0].productId

    if (gameStore.productFromHot) {
      activeProduct.value = gameStore.productFromHot
      gameStore.productFromHot = ''
    }

    categoryBrands.value = gameItems.map(d => {
      return {
        src: `${imgUrl}/logo/${d.productId}.png`,
        alt: d.productId,
        label: d.productId.toUpperCase(),
        gameKey: `${props.category}-${d.productId}`,
        productId: d.productId,
      }
    })

    changeGame(activeProduct.value)
  }
}

const changeGame = (productId: string) => {
  activeProduct.value = productId

  const games = gameStore.respDemoGameList.datas.find(d => d.productId == activeProduct.value)?.games;
  if (games) {
    displayGames.value = games.map(d => {
      return {
        gameId: d.gameId,
        name: t(`game_name.${d.gameId}`),
        image: `${imgUrl}/game/${d.gameId}.png`,
      }
    })
  }
}

onMounted(async () => {
  await setCateAndGame()
})

watch(
  () => langStore.current,
  async (newVal) => {
    await langStore.getGameLang(newVal);
    changeGame(activeProduct.value)
  }
)
</script>

<template>
  <div>
    <div class="min-h-screen md:bg-[url('/images/bg/hot.png')] md:bg-[length:100%_100%] bg-no-repeat bg-top bg-fixed">
      <div class="mx-auto max-w-screen-xl space-y-12 px-4 py-10">
        <section>
          <div class="mb-2 flex items-center gap-2">
            <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
            <h2 class="font-sans text-lg font-bold tracking-tight text-foreground">{{ props.category ? $t(`nav.${props.category}`) : '' }}</h2>
          </div>

          <div v-if="categoryBrands.length" class="mb-6 rounded-2xl px-3 pt-1.5 pb-2 sm:px-4">
            <div class="grid grid-cols-4 gap-1.5 sm:grid-cols-5 sm:gap-2 md:grid-cols-5 lg:grid-cols-6">
              <GameCard v-for="brand in categoryBrands" :key="brand.gameKey" :brand="brand" :active="activeProduct === brand.productId" @click="changeGame(brand.productId)" />
            </div>
          </div>

          <div class="mb-6 flex items-center gap-3" aria-hidden="true">
            <span class="h-px flex-1 bg-border" />
            <span class="shrink-0 font-sans text-[14px] font-medium uppercase tracking-widest text-muted-foreground/80">
              {{ $t('label.gamesList') }}
            </span>
            <span class="h-px flex-1 bg-border" />
          </div>

          <div class="grid grid-cols-2 gap-1.5 lg:grid-cols-6 md:grid-cols-3">
            <GameCard v-for="game in displayGames" :key="`${game.gameId}`" :game="game" />
          </div>

          <div v-if="displayGames.length === 0" class="py-16 text-center text-muted-foreground">
            {{ $t('label.noGames') }}
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
