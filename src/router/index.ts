import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/layout/Layout.vue';
import HotGames from '@/components/HotGames.vue';
import Chess from '@/components/Chess.vue';
import LiveGames from '@/components/LiveGames.vue';
import SlotGames from '@/components/SlotGames.vue';
import SportsGames from '@/components/SportsGames.vue';
import LotteryGames from '@/components/LotteryGames.vue';
import GameLaunch from '@/components/GameLaunch.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', name: 'Home', component: HotGames, },
        { path: 'chess', name: 'Chess', component: Chess, },
        { path: 'live', name: 'Live', component: LiveGames, },
        { path: 'slots', name: 'Slots', component: SlotGames, },
        { path: 'sports', name: 'Sports', component: SportsGames, },
        { path: 'lottery', name: 'Lottery', component: LotteryGames, },
        { path: 'game-launch', name: 'GameLaunch', component: GameLaunch, },
      ],
    },
  ],
});

export default router;
