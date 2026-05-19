<script setup lang="ts">
import { Shield, Gamepad2, Users, Mail } from 'lucide-vue-next'

const footerLinks = {
  games: [
    { label: '体育投注', href: '#' },
    { label: '电子老虎机', href: '#' },
    { label: '真人荷官', href: '#' },
    { label: '彩票游戏', href: '#' },
    { label: '棋牌娱乐', href: '#' },
  ],
  support: [
    { label: '关于我们', href: '#' },
    { label: '负责任博彩', href: '#' },
    { label: '隐私政策', href: '#' },
    { label: '服务条款', href: '#' },
    { label: '帮助中心', href: '#' },
  ],
}

const providers = ['PG Soft', 'Pragmatic', 'NetEnt', 'Evolution', "Play'n GO", 'Microgaming']
</script>

<template>
  <footer class="bg-card border-t border-border mt-16">
    <div class="max-w-screen-xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
        <div class="lg:col-span-2 space-y-4">
          <div class="flex items-center gap-2">
            <img src="/top10-logo.png" alt="TOP10 Casino" class="h-10 w-auto object-contain sm:h-11" />
          </div>
          <p class="text-muted-foreground text-sm leading-relaxed max-w-xs">
            全球领先的在线博彩娱乐平台，为您提供最安全、最公平、最刺激的游戏体验。持有合法运营牌照，百分百保障您的资金安全。
          </p>
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail class="w-3.5 h-3.5 text-primary" />
              <span>support@top10casino.com</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <div
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs text-muted-foreground font-medium"
            >
              <Shield class="w-3 h-3 text-primary" />
              SSL加密
            </div>
          </div>
        </div>

        <div>
          <h4 class="font-bold text-foreground text-sm mb-4 flex items-center gap-1.5">
            <Gamepad2 class="w-4 h-4 text-primary" />
            游戏大厅
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks.games" :key="link.label">
              <a :href="link.href" class="text-sm text-muted-foreground hover:text-primary transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-foreground text-sm mb-4 flex items-center gap-1.5">
            <Users class="w-4 h-4 text-primary" />
            帮助支持
          </h4>
          <ul class="space-y-2.5">
            <li v-for="link in footerLinks.support" :key="link.label">
              <a :href="link.href" class="text-sm text-muted-foreground hover:text-primary transition-colors">
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="border-t border-border pt-8 mb-8">
        <p class="text-xs text-muted-foreground font-medium uppercase tracking-widest text-center mb-4">
          合作游戏提供商
        </p>
        <div class="flex flex-wrap items-center justify-center gap-3">
          <div
            v-for="provider in providers"
            :key="provider"
            class="px-4 py-2 rounded-lg bg-secondary border border-border text-xs font-semibold text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors cursor-pointer"
          >
            {{ provider }}
          </div>
        </div>
      </div>

      <div class="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-xs text-muted-foreground text-center md:text-left">
          © 2024 TOP10 Casino. 保留所有权利。本站仅供18岁以上成年人使用。请负责任地参与博彩活动。
        </p>
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">18+</span>
          <div class="w-px h-4 bg-border" />
          <span class="text-xs text-muted-foreground">负责任博彩</span>
          <div class="w-px h-4 bg-border" />
          <span class="text-xs text-muted-foreground">Responsible Gaming</span>
        </div>
      </div>
    </div>
  </footer>
</template>
