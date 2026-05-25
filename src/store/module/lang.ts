import i18n from '@/lang';
import { apiSrv, errorHandling } from '@/service';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLangStore = defineStore('lang-store', () => {
  // 初始語系
  const current = ref(localStorage.getItem('lang') || 'zh_cn');

  // 切換語系
  const setLang = async (lang: string) => {
    current.value = lang;
    i18n.global.locale.value = lang as 'zh_cn' || 'en';
    localStorage.setItem('lang', lang);
  };

  // 初始化
  const initLang = async () => {
    const savedLang = localStorage.getItem('lang') || 'zh_cn';
    setLang(savedLang);
    await getGameLang(savedLang);
  };

  const getGameLang = async (lang: string) => {
    const formatLang = lang.replace('_', '-');

    await apiSrv.get(`/game/${formatLang}`)
      .then((response) => {
        i18n.global.mergeLocaleMessage(lang, response.data);
      })
      .catch((error) => {
        errorHandling(error);
      })
      .finally(() => { });
  };

  return {
    current,
    setLang,
    initLang,
    getGameLang
  };
});
