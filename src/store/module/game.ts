import { ReqDemoGameList, RespDemoGameList } from '@/model/demo';
import { ReqGameLaunch, RespGameLaunch } from '@/model/game';
import { errorHandling, gameSrv } from '@/service';
import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { useUserStore } from './user';
import { useLangStore } from './lang';
import router from '@/router';
import { toast } from 'vue-sonner';
import { useI18n } from 'vue-i18n';

const reqDemoGameList = reactive(new ReqDemoGameList());
const respDemoGameList = ref(new RespDemoGameList());

const reqGameLaunch = reactive(new ReqGameLaunch());
const respGameLaunch = ref(new RespGameLaunch());

const getLaunchPlatform = () => {
  if (typeof window === 'undefined') return 0;
  // 0=Desktop,1=Mobile
  return window.matchMedia('(max-width: 1023px), (pointer: coarse)').matches ? 1 : 0;
};

export const useGameStore = defineStore('game-store', () => {
  const { t } = useI18n();
  const langStore = useLangStore();
  const userStore = useUserStore();

  const category = ref('');
  const productFromHot = ref('');
  const gameUrl = ref('');

  const getGameList = async () => {
    await gameSrv.post("/demo/game/list", reqDemoGameList)
      .then((response) => {
        respDemoGameList.value = response.data;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  const gameLaunch = (gameId: string) => {
    if (!userStore.player || !userStore.operator || !userStore.token) {
      toast.warning(t('label.plzLoginFirst'));
      return;
    }

    reqGameLaunch.playerId = userStore.player;
    reqGameLaunch.token = userStore.operator;
    reqGameLaunch.playerSessionKey = userStore.token;
    reqGameLaunch.currencyId = userStore.currency;
    reqGameLaunch.language = langStore.current;
    reqGameLaunch.gameId = gameId;
    reqGameLaunch.platform = getLaunchPlatform();

    gameSrv.post("/game/launch", reqGameLaunch)
      .then((response) => {
        respGameLaunch.value = response.data;
        gameUrl.value = respGameLaunch.value.gameUrl;
        router.push('/game-launch');
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  return {
    category,
    productFromHot,
    gameUrl,
    respDemoGameList,
    getGameList,
    gameLaunch,
  };
});
