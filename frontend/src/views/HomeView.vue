<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      title="Custom home content"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div v-else class="subtrix-home relative min-h-screen overflow-hidden bg-[#f7f9fb] text-slate-950 dark:bg-[#05070d] dark:text-white">
    <div class="subtrix-backdrop pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="subtrix-backdrop__grid"></div>
      <div class="subtrix-backdrop__beam subtrix-backdrop__beam--one"></div>
      <div class="subtrix-backdrop__beam subtrix-backdrop__beam--two"></div>
      <div class="subtrix-backdrop__sheen"></div>
    </div>

    <header class="sticky top-0 z-30 border-b border-slate-200/70 bg-white/78 px-5 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#05070d]/74">
      <nav class="mx-auto flex max-w-7xl items-center justify-between gap-4" aria-label="Main navigation">
        <router-link to="/" class="flex min-w-0 items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-[#05070d]">
          <span class="brand-mark">
            <img :src="siteLogo || '/logo.png'" alt="" class="h-full w-full object-contain" />
          </span>
          <span class="min-w-0">
            <span class="block truncate text-sm font-semibold tracking-[0.02em] text-slate-950 dark:text-white">{{ siteName }}</span>
            <span class="hidden text-xs text-slate-500 dark:text-slate-400 sm:block">{{ t('home.headerTagline') }}</span>
          </span>
        </router-link>

        <div class="flex items-center gap-2">
          <a href="#workflow" class="nav-link hidden md:inline-flex">{{ t('home.nav.workflow') }}</a>
          <a href="#control" class="nav-link hidden md:inline-flex">{{ t('home.nav.control') }}</a>
          <a href="#models" class="nav-link hidden md:inline-flex">{{ t('home.nav.models') }}</a>
          <button
            @click="toggleTheme"
            class="icon-button"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
            :aria-label="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>
          <router-link
            :to="isAuthenticated ? dashboardPath : '/login'"
            class="header-cta"
          >
            <span v-if="isAuthenticated" class="header-cta__avatar">{{ userInitial }}</span>
            {{ isAuthenticated ? t('home.dashboard') : t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="relative z-10">
      <section class="px-5 pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-20">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(430px,0.82fr)] lg:items-center">
          <div class="max-w-4xl">
            <h1 class="max-w-5xl text-balance text-5xl font-semibold leading-[0.96] tracking-normal text-slate-950 dark:text-white sm:text-6xl lg:text-7xl">
              {{ t('home.heroTitle') }}
            </h1>
            <p class="mt-7 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              {{ siteSubtitle }}
            </p>

            <div class="mt-9 flex flex-col gap-3 sm:flex-row">
              <router-link
                v-if="isAuthenticated"
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="primary-action"
              >
                {{ t('home.goToDashboard') }}
                <Icon name="arrowRight" size="md" :stroke-width="2" />
              </router-link>
              <a
                v-else
                :href="requestKeyHref"
                class="primary-action"
              >
                {{ t('home.getStarted') }}
                <Icon name="arrowRight" size="md" :stroke-width="2" />
              </a>
              <a :href="healthCheckUrl" target="_blank" rel="noopener noreferrer" class="secondary-action">
                {{ t('home.secondaryCta') }}
              </a>
              <button type="button" class="secondary-action" @click="copyBaseUrlSetup">
                {{ t('home.copyBaseUrl') }}
              </button>
            </div>

            <dl class="mt-10 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-3">
              <div v-for="metric in heroMetrics" :key="metric.label" class="metric-tile">
                <dt>{{ metric.label }}</dt>
                <dd>{{ metric.value }}</dd>
              </div>
            </dl>
          </div>

          <aside class="hero-console" :aria-label="`${siteName} API gateway preview`">
            <div class="hero-console__topbar">
              <div class="flex items-center gap-2" aria-hidden="true">
                <span class="h-2.5 w-2.5 rounded-full bg-rose-400"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-amber-300"></span>
                <span class="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              </div>
              <span>Gateway preview</span>
            </div>

            <div class="code-window">
              <div><span class="text-cyan-300">client</span>.baseURL = <span class="text-emerald-300">"https://api.subtrix.org/v1"</span></div>
              <div><span class="text-cyan-300">apiKey</span> = <span class="text-emerald-300">"sk-subtrix..."</span></div>
              <div><span class="text-cyan-300">savings</span> = <span class="text-emerald-300">"route + model dependent"</span></div>
            </div>

            <div class="routing-panel">
              <div class="routing-panel__header">
                <div>
                  <p>{{ t('home.heroPanel.title') }}</p>
                  <span>{{ t('home.heroPanel.description') }}</span>
                </div>
                <div class="spend-chip">
                  <span>{{ t('home.heroPanel.spend') }}</span>
                  <strong>$1,248</strong>
                </div>
              </div>

              <div class="route-lanes" aria-hidden="true">
                <div v-for="lane in routeLanes" :key="lane.name" class="route-lane">
                  <span>{{ lane.name }}</span>
                  <div><i :style="{ width: lane.width }"></i></div>
                  <b>{{ lane.value }}</b>
                </div>
              </div>
            </div>

            <div class="provider-strip">
              <div v-for="provider in providers" :key="provider.model" class="provider-strip__item">
                <ModelIcon :model="provider.model" size="24px" />
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="workflow" class="section-band px-5 py-16 lg:py-20">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p class="section-label">{{ t('home.sections.workflow') }}</p>
            <h2 class="section-title">{{ t('home.howItWorks.title') }}</h2>
            <p class="section-copy">{{ t('home.howItWorks.subtitle') }}</p>
          </div>
          <div class="workflow-rail">
            <article v-for="(step, index) in steps" :key="step.title" class="workflow-step">
              <span class="workflow-step__index">0{{ index + 1 }}</span>
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="control" class="px-5 py-16 lg:py-24">
        <div class="mx-auto max-w-7xl">
          <div class="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p class="section-label">{{ t('home.sections.control') }}</p>
              <h2 class="section-title">{{ t('home.features.title') }}</h2>
            </div>
            <p class="section-copy lg:pb-1">{{ t('home.features.subtitle') }}</p>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <article v-for="feature in features" :key="feature.title" class="feature-card">
              <div class="feature-card__icon">
                <Icon :name="feature.icon" size="lg" />
              </div>
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="models" class="px-5 py-16 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <div class="model-panel">
            <div class="model-panel__content">
              <p class="section-label">{{ t('home.sections.models') }}</p>
              <h2 class="section-title">{{ t('home.providers.title') }}</h2>
              <p class="section-copy">{{ t('home.providers.description') }}</p>
              <p class="mt-5 text-sm font-semibold text-cyan-700 dark:text-cyan-300">{{ t('home.providers.compatibility') }}</p>
            </div>

            <div class="model-grid">
              <article v-for="provider in providers" :key="provider.model" class="model-card">
                <div>
                  <ModelIcon :model="provider.model" size="28px" />
                </div>
                <h3>{{ provider.name }}</h3>
                <p>{{ provider.note }}</p>
              </article>
            </div>
          </div>

          <div class="tool-grid">
            <article v-for="tool in tools" :key="tool.name" class="tool-card">
              <ModelIcon :model="tool.icon" size="24px" />
              <div>
                <h3>{{ tool.name }}</h3>
                <p>{{ tool.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="section-band px-5 py-16 lg:py-20">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p class="section-label">{{ t('home.sections.comparison') }}</p>
            <h2 class="section-title">{{ t('home.comparison.title') }}</h2>
            <p class="section-copy">{{ t('home.comparison.subtitle') }}</p>
          </div>

          <table class="comparison-table">
            <caption class="sr-only">{{ t('home.comparison.title') }}</caption>
            <thead>
              <tr>
                <th scope="col">{{ t('home.comparison.headers.capability') }}</th>
                <th scope="col">{{ t('home.comparison.headers.direct') }}</th>
                <th scope="col">{{ t('home.comparison.headers.gateway') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in comparisonRows" :key="row.feature">
                <th scope="row" :data-label="t('home.comparison.headers.capability')">{{ row.feature }}</th>
                <td :data-label="t('home.comparison.headers.direct')">{{ row.direct }}</td>
                <td :data-label="t('home.comparison.headers.gateway')">{{ row.gateway }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="px-5 py-16 lg:py-24">
        <div class="cta-panel">
          <div>
            <h2>{{ t('home.cta.title') }}</h2>
            <p>{{ t('home.cta.description') }}</p>
          </div>
          <div class="flex flex-col gap-3 sm:flex-row">
            <router-link v-if="isAuthenticated" :to="dashboardPath" class="primary-action">
              {{ t('home.goToDashboard') }}
              <Icon name="arrowRight" size="md" :stroke-width="2" />
            </router-link>
            <a v-else :href="requestKeyHref" class="primary-action">
              {{ t('home.cta.button') }}
              <Icon name="arrowRight" size="md" :stroke-width="2" />
            </a>
            <a :href="healthCheckUrl" target="_blank" rel="noopener noreferrer" class="secondary-action secondary-action--dark">
              {{ t('home.cta.secondaryButton') }}
            </a>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 border-t border-slate-200 bg-white/82 px-5 py-7 dark:border-white/10 dark:bg-[#05070d]/82">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          &copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}
        </p>
        <p class="text-sm text-slate-500 dark:text-slate-400">{{ t('home.footer.tagline') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore, useAuthStore } from '@/stores'
import Icon from '@/components/icons/Icon.vue'
import ModelIcon from '@/components/common/ModelIcon.vue'
import { sanitizeUrl } from '@/utils/url'
import { resolvePublicSiteName } from '@/utils/publicBrand'

const { t, tm } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => resolvePublicSiteName(appStore.cachedPublicSettings?.site_name || appStore.siteName))
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || t('home.heroDescription'))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const requestKeyHref = 'mailto:hello@subtrix.org?subject=Subtrix%20API%20key%20request'
const healthCheckUrl = 'https://api.subtrix.org/health'
const userInitial = computed(() => {
  const user = authStore.user
  if (!user?.email) return ''
  return user.email.charAt(0).toUpperCase()
})
const currentYear = computed(() => new Date().getFullYear())

type IconName = InstanceType<typeof Icon>['$props']['name']

const heroMetrics = computed(() => tm('home.heroMetrics') as Array<{ value: string; label: string }>)
const features = computed(() => tm('home.features.items') as Array<{ icon: IconName; title: string; description: string }>)
const steps = computed(() => tm('home.howItWorks.steps') as Array<{ title: string; description: string }>)
const providers = computed(() => tm('home.providers.items') as Array<{ model: string; name: string; note: string }>)
const tools = computed(() => tm('home.tools') as Array<{ icon: string; name: string; description: string }>)
const comparisonRows = computed(() => tm('home.comparison.items') as Array<{ feature: string; direct: string; gateway: string }>)

const routeLanes = [
  { name: 'OpenAI', value: '38%', width: '72%' },
  { name: 'Claude', value: '27%', width: '58%' },
  { name: 'Gemini', value: '21%', width: '48%' },
  { name: 'Grok', value: '14%', width: '34%' }
]

async function copyBaseUrlSetup() {
  const setup = [
    'Base URL: https://api.subtrix.org/v1',
    'API key: request from hello@subtrix.org',
    'Note: compatible routes, models, and savings are route-, model-, and volume-dependent.'
  ].join('\n')

  try {
    await navigator.clipboard.writeText(setup)
    appStore.showSuccess(t('home.copiedBaseUrl'))
  } catch {
    appStore.showError(t('home.copyBaseUrlFailed'))
  }
}

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<style scoped>
.subtrix-home {
  isolation: isolate;
}

.subtrix-backdrop {
  z-index: 0;
  contain: paint;
}

.subtrix-backdrop__grid,
.subtrix-backdrop__beam,
.subtrix-backdrop__sheen {
  position: absolute;
  inset: 0;
}

.subtrix-backdrop__grid {
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(180deg, black 0%, transparent 72rem);
}

:global(.dark) .subtrix-backdrop__grid {
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.06) 1px, transparent 1px);
}

.subtrix-backdrop__beam {
  opacity: 0.46;
  background:
    linear-gradient(112deg, transparent 9%, rgba(20, 184, 166, 0.15) 30%, transparent 50%),
    linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(247, 249, 251, 0.94) 48rem, #f7f9fb);
  background-size: 190% 100%, 100% 100%;
  animation: beam-sweep 28s ease-in-out infinite alternate;
}

:global(.dark) .subtrix-backdrop__beam {
  opacity: 0.5;
  background:
    linear-gradient(112deg, transparent 8%, rgba(34, 211, 238, 0.12) 30%, transparent 52%),
    linear-gradient(180deg, rgba(5, 7, 13, 0), rgba(5, 7, 13, 0.88) 45rem, #05070d);
}

.subtrix-backdrop__beam--two {
  opacity: 0.28;
  transform: translateY(11rem);
  animation-duration: 36s;
  animation-direction: alternate-reverse;
}

.subtrix-backdrop__sheen {
  background:
    radial-gradient(ellipse at 18% 8%, rgba(20, 184, 166, 0.13), transparent 32rem),
    radial-gradient(ellipse at 84% 0%, rgba(56, 189, 248, 0.11), transparent 34rem);
}

.brand-mark {
  display: inline-flex;
  height: 2.5rem;
  width: 2.5rem;
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

.nav-link {
  align-items: center;
  border-radius: 0.5rem;
  padding: 0.55rem 0.75rem;
  color: rgb(71 85 105);
  font-size: 0.82rem;
  font-weight: 600;
  transition: color 180ms ease, background-color 180ms ease;
}

.nav-link:hover,
.nav-link:focus-visible {
  background: rgba(15, 23, 42, 0.06);
  color: rgb(15 23 42);
  outline: 2px solid rgba(20, 184, 166, 0.6);
  outline-offset: 2px;
}

:global(.dark) .nav-link {
  color: rgb(203 213 225);
}

:global(.dark) .nav-link:hover,
:global(.dark) .nav-link:focus-visible {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.icon-button,
.header-cta,
.primary-action,
.secondary-action {
  min-height: 44px;
  border-radius: 0.5rem;
  transition: transform 180ms ease, border-color 180ms ease, background-color 180ms ease, color 180ms ease, box-shadow 180ms ease;
}

.icon-button {
  display: inline-flex;
  width: 44px;
  align-items: center;
  justify-content: center;
  color: rgb(71 85 105);
}

.icon-button:hover,
.icon-button:focus-visible {
  background: rgba(15, 23, 42, 0.06);
  color: rgb(15 23 42);
  outline: 2px solid rgba(20, 184, 166, 0.6);
  outline-offset: 2px;
}

:global(.dark) .icon-button {
  color: rgb(203 213 225);
}

:global(.dark) .icon-button:hover,
:global(.dark) .icon-button:focus-visible {
  background: rgba(255, 255, 255, 0.08);
  color: white;
}

.header-cta,
.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 0.9rem;
  font-weight: 700;
}

.header-cta {
  background: rgb(15 23 42);
  color: white;
  padding: 0.55rem 0.9rem;
}

.header-cta:hover,
.header-cta:focus-visible {
  background: rgb(8 13 26);
  outline: none;
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.24);
}

:global(.dark) .header-cta {
  background: white;
  color: rgb(15 23 42);
}

.header-cta__avatar {
  display: inline-flex;
  height: 1.65rem;
  width: 1.65rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: rgb(20 184 166);
  color: white;
  font-size: 0.72rem;
}

.primary-action {
  background: linear-gradient(135deg, #0f172a, #0d9488);
  color: white;
  padding: 0.9rem 1.15rem;
  box-shadow: 0 18px 44px rgba(13, 148, 136, 0.24);
}

.primary-action:hover,
.primary-action:focus-visible {
  transform: translateY(-1px);
  outline: none;
  box-shadow: 0 22px 54px rgba(13, 148, 136, 0.32);
}

.secondary-action {
  border: 1px solid rgba(15, 23, 42, 0.12);
  background: rgba(255, 255, 255, 0.72);
  color: rgb(15 23 42);
  padding: 0.9rem 1.15rem;
  backdrop-filter: blur(14px);
}

.secondary-action:hover,
.secondary-action:focus-visible {
  border-color: rgba(20, 184, 166, 0.42);
  color: rgb(13 148 136);
  outline: 2px solid rgba(20, 184, 166, 0.6);
  outline-offset: 2px;
}

:global(.dark) .secondary-action,
.secondary-action--dark {
  border-color: rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: white;
}

.metric-tile {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.64);
  padding: 1rem;
  backdrop-filter: blur(16px);
}

:global(.dark) .metric-tile {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.055);
}

.metric-tile dt {
  color: rgb(100 116 139);
  font-size: 0.78rem;
  line-height: 1.35;
}

.metric-tile dd {
  margin-top: 0.4rem;
  color: rgb(15 23 42);
  font-size: 1.5rem;
  font-weight: 800;
}

:global(.dark) .metric-tile dt {
  color: rgb(148 163 184);
}

:global(.dark) .metric-tile dd {
  color: white;
}

.hero-console {
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 1rem;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.94), rgba(2, 6, 23, 0.96)),
    #020617;
  box-shadow: 0 32px 88px rgba(2, 6, 23, 0.24);
  color: white;
  overflow: hidden;
}

.hero-console__topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1rem;
  color: rgb(148 163 184);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.75rem;
}

.code-window {
  margin: 1rem;
  overflow-x: auto;
  border-radius: 0.5rem;
  border: 1px solid rgba(103, 232, 249, 0.18);
  background: rgba(8, 13, 26, 0.88);
  padding: 1rem;
  color: rgb(203 213 225);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.8rem;
  line-height: 1.85;
  white-space: nowrap;
  scrollbar-width: thin;
}

.routing-panel {
  margin: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.055);
  padding: 1rem;
}

.routing-panel__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.routing-panel__header p {
  font-weight: 750;
}

.routing-panel__header span {
  margin-top: 0.25rem;
  display: block;
  color: rgb(148 163 184);
  font-size: 0.78rem;
  line-height: 1.5;
}

.spend-chip {
  min-width: 6.25rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.09);
  padding: 0.65rem 0.8rem;
  text-align: right;
}

.spend-chip strong {
  display: block;
  color: rgb(52 211 153);
}

.route-lanes {
  margin-top: 1rem;
  display: grid;
  gap: 0.75rem;
}

.route-lane {
  display: grid;
  grid-template-columns: 4.6rem 1fr 3rem;
  align-items: center;
  gap: 0.75rem;
  color: rgb(203 213 225);
  font-size: 0.76rem;
}

.route-lane div {
  height: 0.45rem;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.09);
}

.route-lane i {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #22d3ee, #34d399);
}

.route-lane b {
  text-align: right;
  color: white;
}

.provider-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.provider-strip__item {
  display: flex;
  min-height: 4rem;
  align-items: center;
  justify-content: center;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.035);
}

.provider-strip__item:last-child {
  border-right: 0;
}

.section-band {
  border-block: 1px solid rgba(15, 23, 42, 0.08);
  background: rgba(255, 255, 255, 0.58);
}

:global(.dark) .section-band {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.035);
}

.section-label {
  margin-bottom: 0.9rem;
  color: rgb(15 118 110);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

:global(.dark) .section-label {
  color: rgb(103 232 249);
}

.section-title {
  max-width: 48rem;
  color: rgb(15 23 42);
  font-size: clamp(2rem, 4vw, 3.55rem);
  font-weight: 750;
  line-height: 1.02;
  letter-spacing: 0;
}

:global(.dark) .section-title {
  color: white;
}

.section-copy {
  max-width: 43rem;
  color: rgb(71 85 105);
  font-size: 1rem;
  line-height: 1.8;
}

:global(.dark) .section-copy {
  color: rgb(203 213 225);
}

.workflow-rail {
  display: grid;
  gap: 1px;
  overflow: hidden;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(15, 23, 42, 0.1);
}

:global(.dark) .workflow-rail {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.1);
}

.workflow-step {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 1rem;
  background: rgba(255, 255, 255, 0.72);
  padding: 1.25rem;
  backdrop-filter: blur(16px);
}

:global(.dark) .workflow-step {
  background: rgba(5, 7, 13, 0.74);
}

.workflow-step__index {
  color: rgb(13 148 136);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.82rem;
  font-weight: 800;
}

.workflow-step h3,
.feature-card h3,
.model-card h3,
.tool-card h3 {
  color: rgb(15 23 42);
  font-weight: 750;
}

:global(.dark) .workflow-step h3,
:global(.dark) .feature-card h3,
:global(.dark) .model-card h3,
:global(.dark) .tool-card h3 {
  color: white;
}

.workflow-step p,
.feature-card p,
.model-card p,
.tool-card p {
  margin-top: 0.45rem;
  color: rgb(100 116 139);
  font-size: 0.9rem;
  line-height: 1.65;
}

:global(.dark) .workflow-step p,
:global(.dark) .feature-card p,
:global(.dark) .model-card p,
:global(.dark) .tool-card p {
  color: rgb(148 163 184);
}

.feature-card,
.model-card,
.tool-card {
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(16px);
}

:global(.dark) .feature-card,
:global(.dark) .model-card,
:global(.dark) .tool-card {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.045);
}

.feature-card {
  padding: 1.25rem;
}

.feature-card__icon {
  margin-bottom: 1.15rem;
  display: flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: rgba(20, 184, 166, 0.1);
  color: rgb(13 148 136);
}

:global(.dark) .feature-card__icon {
  background: rgba(34, 211, 238, 0.1);
  color: rgb(103 232 249);
}

.model-panel {
  display: grid;
  gap: 2rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.75rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.76), rgba(236, 254, 255, 0.56));
  padding: 1.25rem;
  backdrop-filter: blur(18px);
}

:global(.dark) .model-panel {
  border-color: rgba(255, 255, 255, 0.12);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.07), rgba(20, 184, 166, 0.06));
}

@media (min-width: 1024px) {
  .model-panel {
    grid-template-columns: 0.78fr 1.22fr;
    padding: 2rem;
  }
}

.model-grid {
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
}

.model-card {
  padding: 1rem;
}

.model-card > div {
  margin-bottom: 1rem;
  display: flex;
  height: 2.75rem;
  width: 2.75rem;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.76);
}

:global(.dark) .model-card > div {
  background: rgba(255, 255, 255, 0.08);
}

.tool-grid {
  margin-top: 1rem;
  display: grid;
  gap: 0.85rem;
  grid-template-columns: repeat(auto-fit, minmax(13rem, 1fr));
}

.tool-card {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 1rem;
}

.comparison-table {
  width: 100%;
  overflow: hidden;
  border-collapse: separate;
  border-spacing: 0;
  border: 1px solid rgba(15, 23, 42, 0.1);
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.78);
  backdrop-filter: blur(16px);
}

:global(.dark) .comparison-table {
  border-color: rgba(255, 255, 255, 0.1);
  background: rgba(5, 7, 13, 0.72);
}

.comparison-table thead {
  background: rgba(15, 23, 42, 0.06);
  color: rgb(71 85 105);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

:global(.dark) .comparison-table thead {
  background: rgba(255, 255, 255, 0.07);
  color: rgb(203 213 225);
}

.comparison-table th,
.comparison-table td {
  padding: 1rem;
  text-align: left;
  vertical-align: top;
}

.comparison-table tbody tr {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  color: rgb(71 85 105);
  font-size: 0.9rem;
  line-height: 1.55;
}

.comparison-table tbody tr + tr th,
.comparison-table tbody tr + tr td {
  border-top: 1px solid rgba(15, 23, 42, 0.08);
}

:global(.dark) .comparison-table tbody tr + tr th,
:global(.dark) .comparison-table tbody tr + tr td {
  border-color: rgba(255, 255, 255, 0.09);
}

:global(.dark) .comparison-table tbody tr {
  color: rgb(203 213 225);
}

.comparison-table tbody th,
.comparison-table tbody td:last-child {
  color: rgb(15 23 42);
  font-weight: 700;
}

:global(.dark) .comparison-table tbody th,
:global(.dark) .comparison-table tbody td:last-child {
  color: white;
}

.cta-panel {
  margin-inline: auto;
  display: flex;
  max-width: 80rem;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  border-radius: 0.75rem;
  background:
    linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(13, 148, 136, 0.9)),
    #0f172a;
  padding: 2rem;
  color: white;
  box-shadow: 0 28px 72px rgba(2, 6, 23, 0.2);
}

@media (min-width: 768px) {
  .cta-panel {
    flex-direction: row;
    align-items: center;
    padding: 2.5rem;
  }
}

.cta-panel h2 {
  max-width: 42rem;
  font-size: clamp(2rem, 4vw, 3.2rem);
  font-weight: 750;
  line-height: 1.03;
}

.cta-panel p {
  margin-top: 1rem;
  max-width: 38rem;
  color: rgb(204 251 241);
  line-height: 1.75;
}

@keyframes beam-sweep {
  from {
    background-position: 0% 0, 0 0;
  }

  to {
    background-position: 100% 0, 0 0;
  }
}

@media (max-width: 760px) {
  .comparison-table,
  .comparison-table thead,
  .comparison-table tbody,
  .comparison-table tr,
  .comparison-table th,
  .comparison-table td {
    display: block;
  }

  .comparison-table thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  .comparison-table tbody tr {
    padding: 1rem;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 0;
  }

  .comparison-table th::before,
  .comparison-table td::before {
    content: attr(data-label);
    display: block;
    margin-bottom: 0.2rem;
    color: rgb(100 116 139);
    font-size: 0.68rem;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(.dark) .comparison-table th::before,
  :global(.dark) .comparison-table td::before {
    color: rgb(148 163 184);
  }

  .comparison-table th + td,
  .comparison-table td + td {
    margin-top: 0.65rem;
  }

  .routing-panel__header {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .subtrix-home *,
  .subtrix-home *::before,
  .subtrix-home *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }

  .subtrix-backdrop__beam {
    animation: none;
  }

  .primary-action:hover,
  .primary-action:focus-visible {
    transform: none;
  }
}
</style>
