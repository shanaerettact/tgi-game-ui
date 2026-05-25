import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/main.css';
import store from './store';
import i18n from './lang';
import { useLangStore } from './store/module/lang';

const bootstrap = async () => {
  const app = createApp(App);

  app.use(router);
  app.use(i18n);
  app.use(store);

  const langStore = useLangStore();

  // 等待語系初始化完成
  await langStore.initLang();

  app.mount('#app');
};

bootstrap();