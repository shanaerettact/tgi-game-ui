<script setup lang="ts">
import Navbar from '@/components/casino/Navbar.vue'
import HeroSlider from '@/components/casino/HeroSlider.vue'
import GameGrid from '@/components/casino/GameGrid.vue'
import Promotions from '@/components/casino/Promotions.vue'
import Footer from '@/components/casino/Footer.vue'

const categories = [
  { label: '体育', sub: 'Sports', img: '/images/game-sports.jpg' },
  { label: '彩票', sub: 'Lottery', img: '/images/game-lottery.jpg' },
  { label: '电子', sub: 'Slots', img: '/images/game-slots.jpg' },
  { label: '真人', sub: 'Live', img: '/images/game-live.jpg' },
  { label: '礼物', sub: 'Gifts', img: '/images/slot-1.jpg' },
  { label: '棋牌', sub: 'Board', img: '/images/slot-2.jpg' },
]

type BrandImage = { src: string; alt: string }

function createBrandSection(
  id: string,
  title: string,
  folder: string,
  files: string[],
  labelPrefix: string,
) {
  return {
    id,
    title,
    labelPrefix,
    images: files.map((file) => ({
      src: `/images/brand/${folder}/${file}`,
      alt: file.replace(/\.png$/i, ''),
    })) satisfies BrandImage[],
  }
}

const brandSections = [
  createBrandSection('chess', '棋牌品牌', 'chess', [
    'chess_db.png',
    'chess_hl.png',
    'chess_ks.png',
    'chess_ky.png',
    'chess_leg.png',
    'chess_wl.png',
  ], 'chess_'),
  createBrandSection('live', '真人娱乐', 'live', [
    'live_ag.png',
    'live_bbin.png',
    'live_bg.png',
    'live_fb.png',
    'live_we.png',
  ], 'live_'),
  createBrandSection('slots', '老虎机', 'slot', [
    'slot_jdb.png',
    'slot_mga.png',
    'slot_pg.png',
    'slot_pp.png',
    'slot_we.png',
  ], 'slot_'),
  createBrandSection('fishing', '捕鱼游戏', 'fishing', [
    'fishing_ag.png',
    'fishing_baison.png',
    'fishing_bbin.png',
    'fishing_bg.png',
    'fishing_boya.png',
    'fishing_fg.png',
    'fishing_glc.png',
    'fishing_jdb.png',
    'fishing_ks.png',
    'fishing_sp.png',
    'fishing_yl.png',
  ], 'fishing_'),
  createBrandSection('sports', '体育博彩', 'sport', [
    'sport_ap.png',
    'sport_bti.png',
    'sport_cmd.png',
    'sport_fb.png',
    'sport_panda.png',
    'sport_saba.png',
    'sport_sbobet.png',
    'sport_ug.png',
    'sport_we.png',
  ], 'sport_'),
  createBrandSection('esports', '电子竞技', 'esport', [
    'esport_db.png',
    'esport_ia.png',
    'esport_im.png',
    'esport_pinnacle.png',
    'esport_saba.png',
    'esport_tf.png',
  ], 'esport_'),
  createBrandSection('lottery', '彩票游戏', 'lottery', [
    'lottery_db.png',
    'lottery_hp.png',
    'lottery_ig.png',
    'lottery_lightning.png',
    'lottery_sg.png',
    'lottery_tcg.png',
    'lottery_vr.png',
  ], 'lottery_'),
  createBrandSection('cockfight', '斗鸡', 'ckf', [
    'ckf_ds88.png',
    'ckf_phoenix.png',
    'ckf_sv388.png',
    'ckf_wcf888.png',
    'ckf_wgb.png',
    'ckf_ws168.png',
  ], 'ckf_'),
]

function formatBrandLabel(alt: string, prefix: string) {
  return alt.replace(prefix, '')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <Navbar />
    <div>

    </div>
    <main>
      <div class="mx-auto max-w-screen-xl space-y-12 px-4 py-10">
        <section v-for="section in brandSections" :key="section.id">
          <div class="mb-5 flex items-center gap-2">
            <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
            <h2 class="font-sans text-lg font-bold tracking-tight text-foreground">{{ section.title }}</h2>
          </div>

          <div class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            <div
              v-for="brand in section.images"
              :key="`${section.id}-${brand.alt}`"
              class="group flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-border bg-card p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:p-4"
            >
              <div class="flex h-40 w-full items-center justify-center rounded-lg bg-secondary p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56">
                <img
                  :src="brand.src"
                  :alt="brand.alt"
                  class="h-full w-full rounded-xl object-contain transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <span
                class="font-sans text-xs font-semibold uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-foreground"
              >
                {{ formatBrandLabel(brand.alt, section.labelPrefix) }}
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>

    <Footer />
  </div>
</template>
