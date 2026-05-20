import { createRouter, createWebHistory } from 'vue-router'
import BrandSections from '@/components/BrandSections.vue'
import Chess from '@/components/Chess.vue'
import LiveGames from '@/components/LiveGames.vue'
import SlotGames from '@/components/SlotGames.vue'
import SportsGames from '@/components/SportsGames.vue'
import LotteryGames from '@/components/LotteryGames.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: BrandSections },
    { path: '/chess', name: 'Chess', component: Chess },
    { path: '/live', name: 'Live', component: LiveGames },
    { path: '/slots', name: 'Slots', component: SlotGames },
    { path: '/sports', name: 'Sports', component: SportsGames },
    { path: '/lottery', name: 'Lottery', component: LotteryGames },
  ],
})

export default router
