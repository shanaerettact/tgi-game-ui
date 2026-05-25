export type NavItem = {
  key: string;
  label: string;
  labelEn: string;
  icon: string;
  path: string;
};

export const navItems: NavItem[] = [
  { key: 'hot', label: '熱門', labelEn: 'Home', icon: '/images/game-type/hot.png', path: '/' },
  { key: 'chess', label: '棋牌', labelEn: 'Chess', icon: '/images/game-type/chess.png', path: '/chess' },
  { key: 'live', label: '真人', labelEn: 'Live', icon: '/images/game-type/live.png', path: '/live' },
  { key: 'slots', label: '电子', labelEn: 'Slots', icon: '/images/game-type/slot.png', path: '/slots' },
  { key: 'sports', label: '体育', labelEn: 'Sports', icon: '/images/game-type/sports.png', path: '/sports' },
  { key: 'lottery', label: '彩票', labelEn: 'Lottery', icon: '/images/game-type/lottery.png', path: '/lottery' },
];
