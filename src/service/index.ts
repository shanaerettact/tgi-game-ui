import { useLangStore } from "@/store/module/lang";
import axios from "axios";

const langStore = useLangStore();

export const apiSrv = axios.create({
  baseURL: import.meta.env.VITE_TGI_GAME_URL
});

export const getText = (item: Array<any>, key: string, showFirst: any = null) => {
  if (!item || item.length === 0) return '';

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