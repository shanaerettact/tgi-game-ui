import i18n from "@/lang";
import { useLangStore } from "@/store/module/lang";
import { useUserStore } from "@/store/module/user";
import axios, { AxiosError } from "axios";
import { toast } from "vue-sonner";

// API錯誤訊息處理
export const errorHandling = (err: AxiosError) => {

  if (err.response == null || err.response.status == null) {
    toast.error('Error Message.');
  } else {
    const userStore = useUserStore();
    switch (err.response.status) {
      case 400: // 參數錯誤
        toast.error(i18n.global.t('error_code.' + err.response.status));
        break;
      case 401: // Token 失效
        userStore.logout();
        toast.error(i18n.global.t('error_code.401'));
        break;
      case 403: // 权限不足，IP 未列入白名单
      case 452: // 交易单号已使用(重复交易)
      case 453: // 玩家钱包余额不足
      case 454: // 三方轉呼叫異常
      case 460: // 游戏已停用
        toast.error(i18n.global.t('error_code.' + err.response.status));
        break;
      default: // 系統錯誤
        toast.error(i18n.global.t('error_code.500'));
        break;
    }
  }
};

export const gameSrv = axios.create({
  baseURL: import.meta.env.VITE_TGI_GAME_URL
});

export const apiSrv = axios.create({
  baseURL: import.meta.env.VITE_TGI_API_URL
});

export const getText = (item: Array<any>, key: string, showFirst: any = null) => {
  if (!item || item.length === 0) return '';

  const langStore = useLangStore();

  const normalizeLang = (lang: string) => lang?.toLowerCase().replace('_', '-');

  const currentLang = normalizeLang(langStore.current);

  const found = item.find(i => normalizeLang(i.lang) === currentLang);

  let x = found?.[key] ?? '';

  // 若沒有資料 是否顯示第一筆
  if (!x && showFirst && item.length > 0) {
    x = item[0][key];
  }

  return x;
};