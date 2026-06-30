<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div
    v-else
    class="home-shell relative flex min-h-screen flex-col overflow-hidden bg-white text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <div class="home-ambient pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div class="home-ambient__base"></div>
      <div class="home-ambient__field home-ambient__field--teal"></div>
      <div class="home-ambient__field home-ambient__field--cyan"></div>
      <div class="home-ambient__field home-ambient__field--emerald"></div>
      <div class="home-ambient__scan"></div>
      <div class="home-ambient__grid"></div>
      <div class="home-ambient__edge"></div>
    </div>

    <header class="relative z-20 border-b border-gray-200/70 bg-white/[0.82] px-5 py-4 backdrop-blur-xl dark:border-cyan-300/10 dark:bg-dark-950/[0.72]">
      <nav class="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <div class="flex min-w-0 items-center gap-3">
          <div class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-dark-700 dark:bg-dark-900">
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <div class="min-w-0">
            <div class="truncate text-sm font-semibold text-gray-950 dark:text-white">{{ siteName }}</div>
            <div class="hidden text-xs text-gray-500 dark:text-dark-400 sm:block">{{ t('home.headerTagline') }}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            @click="toggleTheme"
            class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 dark:text-dark-400 dark:hover:bg-dark-800 dark:hover:text-white"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="inline-flex items-center gap-1.5 rounded-full bg-gray-950 py-1 pl-1 pr-3 text-xs font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[10px] font-semibold text-white">
              {{ userInitial }}
            </span>
            {{ t('home.dashboard') }}
          </router-link>
          <router-link
            v-else
            to="/login"
            class="inline-flex items-center rounded-full bg-gray-950 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
          >
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="relative z-10 flex-1">
      <section class="px-5 pb-14 pt-14 sm:pt-20 lg:pb-20">
        <div class="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
          <div class="text-center lg:text-left">
            <h1 class="mx-auto max-w-4xl text-4xl font-bold leading-tight text-gray-950 dark:text-white sm:text-5xl lg:mx-0 lg:text-6xl">
              {{ t('home.heroTitle') }}
            </h1>
            <p class="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-dark-300 sm:text-lg lg:mx-0">
              {{ siteSubtitle }}
            </p>

            <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <router-link
                :to="isAuthenticated ? dashboardPath : '/login'"
                class="btn btn-primary w-full justify-center px-7 py-3 text-base shadow-lg shadow-primary-500/25 sm:w-auto"
              >
                {{ isAuthenticated ? t('home.goToDashboard') : t('home.getStarted') }}
                <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2" />
              </router-link>
              <router-link
                to="/key-usage"
                class="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 dark:border-dark-700 dark:bg-dark-900 dark:text-dark-100 dark:hover:bg-dark-800 sm:w-auto"
              >
                {{ t('home.secondaryCta') }}
              </router-link>
            </div>

            <div class="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <div
                v-for="tag in tags"
                :key="tag"
                class="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-xs font-medium text-gray-700 shadow-sm backdrop-blur dark:border-dark-700 dark:bg-dark-900/80 dark:text-dark-200"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-primary-500"></span>
                {{ tag }}
              </div>
            </div>
          </div>

          <div class="relative mx-auto w-full max-w-xl">
            <div class="home-console rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-2xl shadow-gray-900/10 backdrop-blur dark:border-cyan-300/10 dark:bg-dark-900/[0.82] dark:shadow-black/30">
              <div class="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-dark-800">
                <div class="flex items-center gap-2">
                  <span class="h-3 w-3 rounded-full bg-red-400"></span>
                  <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                  <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
                </div>
                <span class="font-mono text-xs text-gray-400">api.gateway.local</span>
              </div>
              <div class="space-y-4">
                <div class="rounded-xl bg-gray-950 p-4 font-mono text-xs leading-6 text-dark-100 ring-1 ring-white/10">
                  <div><span class="text-emerald-400">$</span> curl /v1/chat/completions</div>
                  <div class="text-sky-300">base_url = "https://api.subtrix.ai/v1"</div>
                  <div class="text-primary-300">model = "best-available"</div>
                </div>
                <div class="grid gap-3 sm:grid-cols-3">
                  <div
                    v-for="metric in heroMetrics"
                    :key="metric.label"
                    class="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-cyan-300/10 dark:bg-dark-950/[0.62]"
                  >
                    <div class="text-lg font-bold text-gray-950 dark:text-white">{{ metric.value }}</div>
                    <div class="mt-1 text-xs leading-5 text-gray-500 dark:text-dark-400">{{ metric.label }}</div>
                  </div>
                </div>
                <div class="rounded-xl border border-primary-100 bg-primary-50/70 p-4 dark:border-cyan-300/10 dark:bg-primary-950/[0.16]">
                  <div class="flex items-center justify-between gap-4">
                    <div>
                      <div class="text-sm font-semibold text-gray-950 dark:text-white">{{ t('home.heroPanel.title') }}</div>
                      <div class="mt-1 text-xs text-gray-600 dark:text-dark-300">{{ t('home.heroPanel.description') }}</div>
                    </div>
                    <div class="rounded-lg bg-white px-3 py-2 text-right shadow-sm dark:bg-dark-900">
                      <div class="text-xs text-gray-500 dark:text-dark-400">{{ t('home.heroPanel.spend') }}</div>
                      <div class="text-sm font-bold text-emerald-600">$1,248</div>
                    </div>
                  </div>
                  <div class="mt-4 h-2 overflow-hidden rounded-full bg-white dark:bg-dark-800">
                    <div class="h-full w-[62%] rounded-full bg-gradient-to-r from-primary-500 to-emerald-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="border-y border-gray-200/70 bg-gray-50/80 px-5 py-8 dark:border-cyan-300/10 dark:bg-dark-900/[0.42]">
        <div class="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-dark-700 dark:bg-dark-900"
          >
            <div class="text-2xl font-bold text-gray-950 dark:text-white">{{ stat.value }}</div>
            <div class="mt-1 text-sm text-gray-600 dark:text-dark-300">{{ stat.label }}</div>
          </div>
        </div>
      </section>

      <section class="px-5 py-16 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <div class="max-w-3xl">
            <h2 class="text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.features.title') }}</h2>
            <p class="mt-3 text-base leading-7 text-gray-600 dark:text-dark-300">{{ t('home.features.subtitle') }}</p>
          </div>

          <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="feature in features"
              :key="feature.title"
              class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg dark:border-dark-700 dark:bg-dark-900"
            >
              <div class="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-950/40 dark:text-primary-300">
                <Icon :name="feature.icon" size="lg" />
              </div>
              <h3 class="text-lg font-semibold text-gray-950 dark:text-white">{{ feature.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-gray-600 dark:text-dark-300">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-950 px-5 py-16 text-white lg:py-20">
        <div class="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 class="text-3xl font-bold">{{ t('home.howItWorks.title') }}</h2>
            <p class="mt-3 text-base leading-7 text-gray-300">{{ t('home.howItWorks.subtitle') }}</p>
          </div>
          <div class="grid gap-4 md:grid-cols-3">
            <div
              v-for="(step, index) in steps"
              :key="step.title"
              class="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div class="mb-5 flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-sm font-bold text-white">
                {{ index + 1 }}
              </div>
              <h3 class="font-semibold">{{ step.title }}</h3>
              <p class="mt-2 text-sm leading-6 text-gray-300">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <section class="px-5 py-16 lg:py-20">
        <div class="mx-auto max-w-7xl">
          <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <h2 class="text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.providers.title') }}</h2>
              <p class="mt-3 text-base text-gray-600 dark:text-dark-300">{{ t('home.providers.description') }}</p>
            </div>
            <div class="text-sm font-medium text-primary-600 dark:text-primary-300">{{ t('home.providers.compatibility') }}</div>
          </div>

          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <div
              v-for="provider in providers"
              :key="provider.model"
              class="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-dark-700 dark:bg-dark-900"
            >
              <div class="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-100 bg-gray-50 text-gray-950 dark:border-dark-700 dark:bg-dark-950 dark:text-white">
                <ModelIcon :model="provider.model" size="24px" />
              </div>
              <div>
                <div class="text-sm font-semibold text-gray-950 dark:text-white">{{ provider.name }}</div>
                <div class="text-xs text-gray-500 dark:text-dark-400">{{ provider.note }}</div>
              </div>
            </div>
          </div>

          <div class="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div
              v-for="tool in tools"
              :key="tool.name"
              class="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-dark-700 dark:bg-dark-900/70"
            >
              <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-gray-950 shadow-sm dark:bg-dark-950 dark:text-white">
                <ModelIcon :model="tool.icon" size="22px" />
              </div>
              <div>
                <div class="text-sm font-semibold text-gray-950 dark:text-white">{{ tool.name }}</div>
                <div class="text-xs text-gray-500 dark:text-dark-400">{{ tool.description }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-gray-50 px-5 py-16 dark:bg-dark-900/50 lg:py-20">
        <div class="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 class="text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.comparison.title') }}</h2>
            <p class="mt-3 text-base leading-7 text-gray-600 dark:text-dark-300">{{ t('home.comparison.subtitle') }}</p>
          </div>
          <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-dark-700 dark:bg-dark-900">
            <div class="grid grid-cols-[1fr_1fr_1fr] border-b border-gray-200 bg-gray-100 text-xs font-semibold uppercase tracking-wide text-gray-500 dark:border-dark-800 dark:bg-dark-950 dark:text-dark-400">
              <div class="p-4">{{ t('home.comparison.headers.capability') }}</div>
              <div class="p-4">{{ t('home.comparison.headers.direct') }}</div>
              <div class="p-4 text-primary-600 dark:text-primary-300">{{ t('home.comparison.headers.gateway') }}</div>
            </div>
            <div
              v-for="row in comparisonRows"
              :key="row.feature"
              class="grid grid-cols-[1fr_1fr_1fr] border-b border-gray-100 text-sm last:border-b-0 dark:border-dark-800"
            >
              <div class="p-4 font-semibold text-gray-950 dark:text-white">{{ row.feature }}</div>
              <div class="p-4 text-gray-500 dark:text-dark-400">{{ row.direct }}</div>
              <div class="p-4 text-gray-700 dark:text-dark-200">{{ row.gateway }}</div>
            </div>
          </div>
        </div>
      </section>

      <section class="px-5 py-16 lg:py-20">
        <div class="mx-auto max-w-5xl rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-8 text-center shadow-xl shadow-primary-500/10 dark:border-primary-900/40 dark:from-primary-950/30 dark:to-dark-900 md:p-12">
          <h2 class="text-3xl font-bold text-gray-950 dark:text-white">{{ t('home.cta.title') }}</h2>
          <p class="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-dark-300">{{ t('home.cta.description') }}</p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="btn btn-primary justify-center px-7 py-3 text-base"
            >
              {{ isAuthenticated ? t('home.goToDashboard') : t('home.cta.button') }}
              <Icon name="arrowRight" size="md" class="ml-2" :stroke-width="2" />
            </router-link>
            <router-link
              to="/key-usage"
              class="inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-7 py-3 text-sm font-semibold text-gray-800 shadow-sm transition-colors hover:bg-gray-50 dark:border-dark-700 dark:bg-dark-950 dark:text-dark-100 dark:hover:bg-dark-800"
            >
              {{ t('home.cta.secondaryButton') }}
            </router-link>
          </div>
        </div>
      </section>
    </main>

    <footer class="relative z-10 border-t border-gray-200 bg-white px-5 py-7 dark:border-dark-800 dark:bg-dark-950">
      <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p class="text-sm text-gray-500 dark:text-dark-400">
          &copy; {{ currentYear }} {{ siteName }}. {{ t('home.footer.allRightsReserved') }}
        </p>
        <p class="text-sm text-gray-500 dark:text-dark-400">{{ t('home.footer.tagline') }}</p>
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

const { t, tm } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Subtrix')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
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
const userInitial = computed(() => {
  const user = authStore.user
  if (!user?.email) return ''
  return user.email.charAt(0).toUpperCase()
})
const currentYear = computed(() => new Date().getFullYear())

type IconName = InstanceType<typeof Icon>['$props']['name']

const tags = computed(() => tm('home.tags.items') as string[])
const heroMetrics = computed(() => tm('home.heroMetrics') as Array<{ value: string; label: string }>)
const stats = computed(() => tm('home.stats') as Array<{ value: string; label: string }>)
const features = computed(() => tm('home.features.items') as Array<{ icon: IconName; title: string; description: string }>)
const steps = computed(() => tm('home.howItWorks.steps') as Array<{ title: string; description: string }>)
const providers = computed(() => tm('home.providers.items') as Array<{ model: string; name: string; note: string }>)
const tools = computed(() => tm('home.tools') as Array<{ icon: string; name: string; description: string }>)
const comparisonRows = computed(() => tm('home.comparison.items') as Array<{ feature: string; direct: string; gateway: string }>)

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
.home-shell {
  isolation: isolate;
}

.home-ambient {
  z-index: 0;
  contain: paint;
  background: #f8fafc;
}

:global(.dark) .home-ambient {
  background: #020617;
}

.home-ambient__base,
.home-ambient__field,
.home-ambient__scan,
.home-ambient__grid,
.home-ambient__edge {
  position: absolute;
  inset: 0;
}

.home-ambient__base {
  background:
    radial-gradient(circle at 50% -10%, rgba(20, 184, 166, 0.12), transparent 34rem),
    linear-gradient(180deg, rgba(248, 250, 252, 0.84), rgba(255, 255, 255, 0.97) 42rem, rgba(255, 255, 255, 0.99));
}

:global(.dark) .home-ambient__base {
  background:
    radial-gradient(circle at 50% -8%, rgba(34, 211, 238, 0.13), transparent 36rem),
    linear-gradient(180deg, rgba(2, 6, 23, 0.96), rgba(4, 12, 28, 0.98) 36rem, rgba(2, 6, 23, 1));
}

.home-ambient__field {
  left: 50%;
  top: 0;
  width: min(86rem, 122vw);
  height: 42rem;
  border-radius: 999px;
  filter: blur(54px) saturate(115%);
  opacity: 0.4;
  transform: translate3d(-50%, -16%, 0) rotate(0deg);
  will-change: transform, opacity, filter;
  mix-blend-mode: multiply;
}

:global(.dark) .home-ambient__field {
  filter: blur(64px) saturate(128%);
  mix-blend-mode: screen;
}

.home-ambient__field--teal {
  background:
    radial-gradient(ellipse at 18% 48%, rgba(13, 148, 136, 0.2), transparent 48%),
    radial-gradient(ellipse at 62% 36%, rgba(14, 165, 233, 0.12), transparent 42%);
  animation: ambient-drift-a 28s ease-in-out infinite alternate;
}

.home-ambient__field--cyan {
  height: 35rem;
  opacity: 0.32;
  background:
    radial-gradient(ellipse at 74% 30%, rgba(56, 189, 248, 0.18), transparent 48%),
    radial-gradient(ellipse at 36% 62%, rgba(20, 184, 166, 0.11), transparent 44%);
  animation: ambient-drift-b 36s ease-in-out infinite alternate;
}

.home-ambient__field--emerald {
  top: 18rem;
  height: 38rem;
  opacity: 0.22;
  background:
    radial-gradient(ellipse at 26% 42%, rgba(16, 185, 129, 0.18), transparent 48%),
    radial-gradient(ellipse at 70% 58%, rgba(6, 182, 212, 0.12), transparent 46%);
  animation: ambient-drift-c 42s ease-in-out infinite alternate;
}

.home-ambient__scan {
  opacity: 0.5;
  background:
    linear-gradient(115deg, transparent 12%, rgba(20, 184, 166, 0.08) 30%, transparent 48%),
    linear-gradient(180deg, transparent, rgba(255, 255, 255, 0.72) 46rem, rgba(255, 255, 255, 0.98));
  background-size: 180% 100%, 100% 100%;
  animation: ambient-scan 32s ease-in-out infinite alternate;
}

:global(.dark) .home-ambient__scan {
  opacity: 0.38;
  background:
    linear-gradient(115deg, transparent 10%, rgba(34, 211, 238, 0.1) 30%, transparent 50%),
    linear-gradient(180deg, transparent, rgba(2, 6, 23, 0.68) 42rem, rgba(2, 6, 23, 1));
  background-size: 180% 100%, 100% 100%;
}

.home-ambient__grid {
  opacity: 0.44;
  background-image:
    linear-gradient(rgba(15, 23, 42, 0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(15, 23, 42, 0.04) 1px, transparent 1px);
  background-position: 0 0;
  background-size: 72px 72px;
  mask-image: linear-gradient(180deg, black, transparent 72rem);
  animation: ambient-grid 38s linear infinite;
}

:global(.dark) .home-ambient__grid {
  opacity: 0.52;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.045) 1px, transparent 1px);
}

.home-ambient__edge {
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(20, 184, 166, 0.52), rgba(56, 189, 248, 0.38), transparent);
}

.home-console {
  box-shadow:
    0 24px 80px rgba(2, 6, 23, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.65);
}

:global(.dark) .home-console {
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.38),
    0 0 0 1px rgba(34, 211, 238, 0.03),
    inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

@keyframes ambient-drift-a {
  from {
    opacity: 0.32;
    transform: translate3d(-54%, -18%, 0) rotate(-7deg) scale(1);
  }

  to {
    opacity: 0.46;
    transform: translate3d(-46%, -10%, 0) rotate(8deg) scale(1.08);
  }
}

@keyframes ambient-drift-b {
  from {
    opacity: 0.22;
    transform: translate3d(-42%, -2%, 0) rotate(10deg) scale(0.96);
  }

  to {
    opacity: 0.38;
    transform: translate3d(-58%, -15%, 0) rotate(-8deg) scale(1.12);
  }
}

@keyframes ambient-drift-c {
  from {
    opacity: 0.16;
    transform: translate3d(-58%, 0, 0) rotate(-12deg) scale(1.04);
  }

  to {
    opacity: 0.28;
    transform: translate3d(-44%, -10%, 0) rotate(6deg) scale(1.14);
  }
}

@keyframes ambient-scan {
  from {
    background-position: 0% 0, 0 0;
    opacity: 0.34;
  }

  to {
    background-position: 100% 0, 0 0;
    opacity: 0.52;
  }
}

@keyframes ambient-grid {
  from {
    background-position: 0 0;
  }

  to {
    background-position: 72px 72px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-ambient__field,
  .home-ambient__scan,
  .home-ambient__grid {
    animation: none;
  }

  .home-ambient__field--teal {
    opacity: 0.34;
    transform: translate3d(-52%, -13%, 0) rotate(-3deg) scale(1.04);
  }

  .home-ambient__field--cyan {
    opacity: 0.24;
    transform: translate3d(-48%, -8%, 0) rotate(4deg) scale(1.02);
  }

  .home-ambient__field--emerald {
    opacity: 0.18;
    transform: translate3d(-50%, -6%, 0) rotate(0deg) scale(1.06);
  }
}
</style>
