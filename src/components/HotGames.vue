<script setup lang="ts">
import BackToTop from './BackToTop.vue'

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
  createBrandSection('slots', '电子', 'slot', [
    'slot_jdb.png',
    'slot_mga.png',
    'slot_pg.png',
    'slot_pp.png',
    'slot_pp.png',
  ], 'slot_'),
]

const rowBrandSections = [
  createBrandSection('live', '真人娱乐', 'live', ['live_ag.png', 'live_bbin.png'], 'live_'),
  createBrandSection('chess', '棋牌品牌', 'chess', ['chess_ks.png'], 'chess_'),
  createBrandSection('sports', '体育博彩', 'sport', ['sport_fb.png'], 'sport_'),
  createBrandSection('lottery', '彩票游戏', 'lottery', ['lottery_lightning.png'], 'lottery_'),
]

function formatBrandLabel(alt: string, prefix: string) {
  return alt.replace(prefix, '')
}
</script>

<template>
  <!--
    Outer wrapper: dark casino-toned background with left/right decorative images.
    Layers (bottom to top):
      z-0  – dark background base
      z-[1] – left/right side images (blurred, faded inward)
      z-[2] – inner vignette: darkens outer edges, highlights the centre content strip
      z-10 – main content
  -->
  <div class="relative overflow-hidden" style="background: linear-gradient(135deg, #0f0c1a 0%, #1a0e2e 40%, #130d1f 60%, #0f0c1a 100%);">

    <!-- Left background decoration image — fades right toward centre -->
    <img
      src="/images/casino-bg-model.jpg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 left-0 z-[1] h-full w-56 select-none object-cover object-top opacity-35 blur-[3px] lg:w-72"
      style="mask-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%);"
    />

    <!-- Right background decoration image — mirrored, fades left toward centre -->
    <img
      src="/images/casino-bg-model.jpg"
      alt=""
      aria-hidden="true"
      class="pointer-events-none absolute inset-y-0 right-0 z-[1] h-full w-56 select-none object-cover object-top opacity-35 blur-[3px] lg:w-72"
      style="transform: scaleX(-1); mask-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%); -webkit-mask-image: linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0) 100%);"
    />

    <!-- Vignette: deepens the outer edges and softly highlights the central content strip -->
    <div
      class="pointer-events-none absolute inset-0 z-[2]"
      aria-hidden="true"
      style="background: radial-gradient(ellipse 70% 100% at 50% 50%, transparent 40%, rgba(8,4,16,0.55) 100%);"
    />

    <!-- Subtle top/bottom edge darkening for depth -->
    <div
      class="pointer-events-none absolute inset-x-0 top-0 z-[2] h-16"
      aria-hidden="true"
      style="background: linear-gradient(to bottom, rgba(8,4,16,0.4), transparent);"
    />
    <div
      class="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-16"
      aria-hidden="true"
      style="background: linear-gradient(to top, rgba(8,4,16,0.4), transparent);"
    />

    <!-- Main content sits above all background layers -->
    <div class="relative z-10 mx-auto max-w-screen-xl space-y-12 px-4 py-10">
    <section v-for="section in brandSections" :key="section.id">
      <div class="mb-5 flex items-center gap-2">
        <span class="block h-5 w-1 rounded-full bg-primary" aria-hidden="true" />
        <h2 class="font-sans text-lg font-bold tracking-tight text-white">{{ section.title }}</h2>
      </div>

      <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div
          v-for="brand in section.images"
          :key="`${section.id}-${brand.alt}`"
          class="group flex cursor-pointer flex-col items-center rounded-xl border border-border bg-white p-2 transition-all duration-200 hover:border-primary/40 hover:shadow-md"
        >
          <div class="flex h-40 w-full items-center justify-center rounded-lg bg-white p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56">
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

    <section>
      <div class="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <div
          v-for="section in rowBrandSections"
          :key="section.id"
          class="flex min-w-0 flex-col gap-3"
          :class="section.images.length > 1 ? 'col-span-2' : 'col-span-1'"
        >
          <div class="flex items-center gap-2">
            <span class="block h-5 w-1 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            <h2 class="truncate font-sans text-lg font-bold tracking-tight text-white">
              {{ section.title }}
            </h2>
          </div>

          <div
            class="grid gap-3"
            :class="section.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
          >
            <div
              v-for="brand in section.images"
              :key="`${section.id}-${brand.alt}`"
              class="group flex min-w-0 cursor-pointer flex-col items-center gap-2.5 rounded-xl border border-border bg-white p-3 transition-all duration-200 hover:border-primary/40 hover:shadow-md sm:p-4"
            >
              <div class="flex h-40 w-full items-center justify-center rounded-lg bg-white p-1 sm:h-44 md:h-48 lg:h-52 xl:h-56">
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
        </div>
      </div>
    </section>
    </div><!-- end main content -->
  </div><!-- end outer relative wrapper -->
  <BackToTop />
</template>
