import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

export const useLangStore = defineStore('lang', () => {
  const { locale } = useI18n();

  // 初始語系
  const current = ref(localStorage.getItem('lang') || 'zh_cn');

  // 切換語系
  const setLang = (lang: string) => {
    current.value = lang;
    locale.value = lang;
    localStorage.setItem('lang', lang);
  };

  // 初始化
  const initLang = () => {
    const savedLang = localStorage.getItem('lang') || 'zh_cn';
    setLang(savedLang);
  };

  return {
    current,
    setLang,
    initLang
  };
});
