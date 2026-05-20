const BRAND_SUBFOLDER: Record<string, string> = {
  eeai: 'eea',
}

export function resolveBrandGameKey(categoryFolder: string, brandFile: string) {
  const prefix = brandFile.replace(/\.png$/i, '').split('_')[0]
  const subfolder = BRAND_SUBFOLDER[prefix] ?? prefix
  return `${categoryFolder}/${subfolder}`
}

function paths(category: string, subfolder: string, files: string[]) {
  return files.map((file) => `/images/brand/${category}/${subfolder}/${file}`)
}

const brandGameImages: Record<string, string[]> = {
  'chess/kx': paths('chess', 'kx', [
    'kx_chess_0.png',
    'kx_chess_610.png',
    'kx_chess_630.png',
    'kx_chess_720.png',
    'kx_chess_730.png',
    'kx_chess_3009.png',
  ]),
  'live/eea': paths('live', 'eea', [
    'eeai_live_113-L4moPT.png',
    'eeai_live_115-ZXVJHn.png',
    'eeai_live_116-wNAvRm.png',
    'eeai_live_117-1LdhsB.png',
  ]),
  'live/mt': paths('live', 'mt', ['mt_live_lobby.png']),
  'slot/antplay': paths('slot', 'antplay', [
    'antplay_slot_salc.png',
    'antplay_slot_sam.png',
    'antplay_slot_sdw.png',
    'antplay_slot_setl.png',
    'antplay_slot_sjcs.png',
    'antplay_slot_sqft.png',
    'antplay_slot_srf.png',
    'antplay_slot_szs.png',
  ]),
  'slot/as': paths('slot', 'as', [
    'as_slot_5000001.png',
    'as_slot_5000004.png',
    'as_slot_5000010.png',
    'as_slot_6000042.png',
    'as_slot_6000043.png',
    'as_slot_6000044.png',
    'as_slot_6000045.png',
  ]),
  'slot/gb': paths('slot', 'gb', [
    'gb_slot_slots-BreakAway.png',
    'gb_slot_slots-DiscoZombie.png',
    'gb_slot_slots-Duelatdawn.png',
    'gb_slot_slots-StarLightNightMarket.png',
    'gb_slot_slots-TreasureQilin.png',
    'gb_slot_slots-WarOfTheGods.png',
    'gb_slot_slots-WealthGanesha.png',
    'gb_slot_slots-WesternShowdown.png',
    'gb_slot_slots-WildBountyShowdown.png',
  ]),
  'slot/glc': paths('slot', 'glc', [
    'glc_slot_cashdragontiger.png',
    'glc_slot_cashforestparty.png',
    'glc_slot_cashk3niuniu.png',
    'glc_slot_cashk4niuniu.png',
    'glc_slot_cashmahjong2p.png',
    'glc_slot_cashqz28g.png',
    'glc_slot_slomahjong2.png',
    'glc_slot_slopowerofthor.png',
  ]),
  'slot/pg': paths('slot', 'pg', [
    'pg_slot_54.png',
    'pg_slot_60.png',
    'pg_slot_65.png',
    'pg_slot_74.png',
    'pg_slot_84.png',
    'pg_slot_87.png',
    'pg_slot_89.png',
    'pg_slot_104.png',
    'pg_slot_106.png',
  ]),
  'sport/fb': paths('sport', 'fb', ['fb_sport_lobby.png']),
  'lottery/ltg': paths('lottery', 'ltg', [
    'ltg_lottery_1001.png',
    'ltg_lottery_1003.png',
    'ltg_lottery_60101.png',
    'ltg_lottery_60102.png',
    'ltg_lottery_60201.png',
    'ltg_lottery_60301.png',
    'ltg_lottery_60303.png',
    'ltg_lottery_60304.png',
    'ltg_lottery_60305.png',
    'ltg_lottery_70101.png',
    'ltg_lottery_100002.png',
    'ltg_lottery_lobby.png',
  ]),
}

export function getBrandGameImages(gameKey: string) {
  return brandGameImages[gameKey] ?? []
}
