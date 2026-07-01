<template>
  <div class="auth-shell relative min-h-screen overflow-x-hidden bg-[#f7f9fb] px-4 py-6 text-slate-950 dark:bg-[#05070d] dark:text-white sm:px-6 lg:px-8">
    <div class="auth-shell__backdrop pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="auth-shell__grid"></div>
      <div class="auth-shell__beam"></div>
    </div>

    <main class="relative z-10 mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-6xl gap-8 lg:grid-cols-[0.92fr_1fr] lg:items-center">
      <section class="hidden lg:block">
        <router-link to="/" class="mb-12 inline-flex items-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f9fb] dark:focus-visible:ring-offset-[#05070d]">
          <span class="brand-mark">
            <img :src="siteLogo || '/logo.png'" alt="" class="h-full w-full object-contain" />
          </span>
          <span>
            <span class="block text-sm font-semibold tracking-[0.02em]">{{ siteName }}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ t('home.headerTagline') }}</span>
          </span>
        </router-link>

        <h1 class="max-w-xl text-5xl font-semibold leading-[0.98] tracking-normal">
          {{ t('home.authLayout.title') }}
        </h1>
        <p class="mt-6 max-w-lg text-base leading-8 text-slate-600 dark:text-slate-300">
          {{ siteSubtitle }}
        </p>

        <div class="mt-10 grid max-w-lg gap-3">
          <div class="auth-signal">
            <span>01</span>
            <p>{{ authSignals[0] }}</p>
          </div>
          <div class="auth-signal">
            <span>02</span>
            <p>{{ authSignals[1] }}</p>
          </div>
          <div class="auth-signal">
            <span>03</span>
            <p>{{ authSignals[2] }}</p>
          </div>
        </div>
      </section>

      <section class="mx-auto w-full max-w-md lg:ml-auto" aria-label="Authentication form">
        <div class="mb-7 text-center lg:hidden">
          <router-link to="/" class="inline-flex items-center justify-center gap-3 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f9fb] dark:focus-visible:ring-offset-[#05070d]">
            <span class="brand-mark">
              <img :src="siteLogo || '/logo.png'" alt="" class="h-full w-full object-contain" />
            </span>
            <span class="text-left">
              <span class="block text-sm font-semibold tracking-[0.02em]">{{ siteName }}</span>
              <span class="text-xs text-slate-500 dark:text-slate-400">{{ t('home.headerTagline') }}</span>
            </span>
          </router-link>
        </div>

        <h1 class="sr-only">{{ t('home.authLayout.formTitle') }}</h1>

        <div class="auth-card">
          <slot />
        </div>

        <div class="mt-6 text-center text-sm">
          <slot name="footer" />
        </div>

        <div class="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const { t, tm } = useI18n()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'AI Gateway')
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'AI API Gateway Platform')
const currentYear = computed(() => new Date().getFullYear())
const authSignals = computed(() => tm('home.authLayout.signals') as string[])

onMounted(() => {
  appStore.fetchPublicSettings()
})
</script>

<style scoped>
.auth-shell {
  isolation: isolate;
}

.auth-shell__grid,
.auth-shell__beam {
  position: absolute;
  inset: 0;
}

.auth-shell__grid {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  background-size: 78px 78px;
  mask-image: linear-gradient(180deg, black, transparent 64rem);
}

:global(.dark) .auth-shell__grid {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
}

.auth-shell__beam {
  background:
    linear-gradient(118deg, transparent 10%, rgba(20, 184, 166, 0.13) 32%, transparent 52%),
    radial-gradient(ellipse at 12% 12%, rgba(20, 184, 166, 0.12), transparent 31rem),
    linear-gradient(180deg, rgba(247, 249, 251, 0), #f7f9fb 46rem);
}

:global(.dark) .auth-shell__beam {
  background:
    linear-gradient(118deg, transparent 8%, rgba(34, 211, 238, 0.12) 32%, transparent 54%),
    radial-gradient(ellipse at 12% 12%, rgba(34, 211, 238, 0.12), transparent 31rem),
    linear-gradient(180deg, rgba(5, 7, 13, 0), #05070d 46rem);
}

.brand-mark {
  display: inline-flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: linear-gradient(135deg, #ffffff, #eef9f8);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.08);
}

:global(.dark) .brand-mark {
  border-color: rgba(255, 255, 255, 0.12);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(20, 184, 166, 0.12));
}

.auth-signal {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.58);
  padding: 1rem;
  backdrop-filter: blur(16px);
}

:global(.dark) .auth-signal {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.045);
}

.auth-signal span {
  color: rgb(13 148 136);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.78rem;
  font-weight: 800;
}

:global(.dark) .auth-signal span {
  color: rgb(103 232 249);
}

.auth-signal p {
  color: rgb(71 85 105);
  font-size: 0.9rem;
  line-height: 1.6;
}

:global(.dark) .auth-signal p {
  color: rgb(203 213 225);
}

.auth-card {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.75rem;
  background: rgba(255, 255, 255, 0.82);
  padding: 1.5rem;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.1);
  backdrop-filter: blur(18px);
}

:global(.dark) .auth-card {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(5, 7, 13, 0.78);
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.34);
}

@media (min-width: 640px) {
  .auth-card {
    padding: 2rem;
  }
}
</style>
