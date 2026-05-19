<script setup lang="ts">
import {
  ArrowRight,
  Gift,
  Zap,
  Shield,
  Headphones,
  CreditCard,
  ChevronRight,
  type LucideIcon,
} from 'lucide-vue-next'

const promos: {
  id: number
  tag: string
  title: string
  desc: string
  amount: string
  amountLabel: string
  color: string
  borderColor: string
  icon: LucideIcon
}[] = [
  {
    id: 1,
    tag: '限时活动',
    title: '首存礼金',
    desc: '首次充值立享100%匹配奖金，最高可获得 ¥3,888 礼金',
    amount: '100%',
    amountLabel: '首存匹配',
    color: 'from-primary/10 to-primary/5',
    borderColor: 'border-primary/20',
    icon: Gift,
  },
  {
    id: 2,
    tag: '每日活动',
    title: '每日签到奖励',
    desc: '连续签到7天，累计奖励最高达 ¥1,000 现金奖励',
    amount: '¥1,000',
    amountLabel: '最高奖励',
    color: 'from-amber-50 to-amber-50/50',
    borderColor: 'border-amber-200',
    icon: Zap,
  },
  {
    id: 3,
    tag: 'VIP专属',
    title: '忠诚度返现',
    desc: 'VIP会员每周享受最高10%流水返水，无限制提取',
    amount: '10%',
    amountLabel: '每周返现',
    color: 'from-violet-50 to-violet-50/50',
    borderColor: 'border-violet-200',
    icon: Shield,
  },
]

const trustFeatures: {
  icon: LucideIcon
  title: string
  titleEn: string
  desc: string
}[] = [
  {
    icon: Shield,
    title: '安全保障',
    titleEn: 'Secure & Licensed',
    desc: '持有合法运营牌照，采用军事级别加密技术保护您的账户安全',
  },
  {
    icon: CreditCard,
    title: '闪速存取款',
    titleEn: 'Fast Transactions',
    desc: '支持多种支付方式，存款即时到账，提款最快5分钟到账',
  },
  {
    icon: Headphones,
    title: '7×24 客服',
    titleEn: '24/7 Support',
    desc: '专业客服团队全天候在线，随时为您提供专属帮助',
  },
]
</script>

<template>
  <div class="space-y-12">
    <section class="space-y-6">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-2xl font-bold text-foreground">精彩活动</h2>
          <p class="text-muted-foreground text-sm mt-0.5">Promotions & Bonuses</p>
        </div>
        <button type="button" class="flex items-center gap-1 text-sm text-primary font-medium hover:gap-2 transition-all">
          全部活动 <ChevronRight class="w-4 h-4" />
        </button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="promo in promos"
          :key="promo.id"
          class="relative bg-gradient-to-br rounded-2xl border p-6 hover:shadow-md transition-shadow cursor-pointer group"
          :class="[promo.color, promo.borderColor]"
        >
          <div class="flex items-center justify-between mb-4">
            <span
              class="px-2.5 py-1 rounded-lg bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider"
            >
              {{ promo.tag }}
            </span>
            <component :is="promo.icon" class="w-5 h-5 text-primary opacity-60" />
          </div>
          <div class="mb-3">
            <span class="text-3xl font-extrabold text-primary">{{ promo.amount }}</span>
            <span class="ml-2 text-xs text-muted-foreground">{{ promo.amountLabel }}</span>
          </div>
          <h3 class="font-bold text-foreground text-base mb-1">{{ promo.title }}</h3>
          <p class="text-muted-foreground text-xs leading-relaxed mb-4">{{ promo.desc }}</p>
          <button
            type="button"
            class="flex items-center gap-1.5 text-sm font-semibold text-primary hover:gap-2.5 transition-all group-hover:text-[#c4102a]"
          >
            立即领取 <ArrowRight class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>

    <section class="bg-card rounded-2xl border border-border p-8">
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-foreground">为什么选择我们</h2>
        <p class="text-muted-foreground text-sm mt-1">Why Choose TOP10 Casino</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div v-for="feature in trustFeatures" :key="feature.title" class="text-center space-y-3">
          <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10">
            <component :is="feature.icon" class="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 class="font-bold text-foreground">{{ feature.title }}</h3>
            <p class="text-xs text-muted-foreground mt-0.5 mb-2">{{ feature.titleEn }}</p>
            <p class="text-sm text-muted-foreground leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
