import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { errorHandling, gameSrv } from '@/service';
import router from '@/router';
import { ReqDemoGetBalance, ReqDemoLogin, RespDemoLogin } from '@/model/demo';

const reqLogin = reactive(new ReqDemoLogin());
const respLogin = ref(new RespDemoLogin());

const reqBalance = reactive(new ReqDemoGetBalance());

export const useUserStore = defineStore('user-store', () => {
  const token = ref(localStorage.getItem('playerSessionKey'));
  const operator = ref(localStorage.getItem('operatorToken'));
  const player = ref(localStorage.getItem('player'));
  const balance = ref(0);
  const currency = ref('CNY');
  const isLogin = computed(() => Boolean(token.value));
  const loadingCount = ref(0);

  const getToken = () => {
    const storedToken = localStorage.getItem('playerSessionKey');

    if (!storedToken) {
      return '';
    }

    if (storedToken !== token.value) {
      token.value = storedToken;
    }
    return token.value;
  };

  const login = (username: string, password: string) => {
    if (!username || !password) return;

    loadingCount.value++;

    reqLogin.username = username;
    reqLogin.password = password;

    gameSrv.post("/demo/login", reqLogin)
      .then((response) => {
        respLogin.value = response.data;
        token.value = respLogin.value.playerSessionKey;
        operator.value = respLogin.value.operatorToken;
        player.value = reqLogin.username;
        localStorage.setItem("operatorToken", operator.value);
        localStorage.setItem("playerSessionKey", token.value);
        localStorage.setItem("player", player.value);

        getBalance();
        router.push('/');
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { loadingCount.value--; });
  };

  const logout = () => {
    token.value = null;
    localStorage.removeItem('operatorToken');
    localStorage.removeItem('playerSessionKey');
    localStorage.removeItem('player');

    router.push('/');
  };

  const getBalance = async () => {
    reqBalance.playerSessionKey = getToken();
    reqBalance.currencyId = currency.value;

    await gameSrv.post("/demo/getbalance", reqBalance)
      .then((response) => {
        balance.value = response.data.balance;
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  const setCurrency = (val: string) => {
    currency.value = val;
  };

  return {
    token,
    operator,
    player,
    balance,
    currency,
    isLogin,
    loadingCount,
    getToken,
    getBalance,
    login,
    logout,
    setCurrency
  };
});

