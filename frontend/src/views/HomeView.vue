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
    class="relative flex min-h-screen flex-col overflow-hidden bg-white text-gray-900 dark:bg-dark-950 dark:text-white"
  >
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.14),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(248,250,252,0.8),rgba(255,255,255,0.96))] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(20,184,166,0.16),transparent_32%),radial-gradient(circle_at_85%_12%,rgba(59,130,246,0.12),transparent_30%),linear-gradient(180deg,rgba(2,6,23,0.96),rgba(15,23,42,0.98))]"></div>
      <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-400/50 to-transparent"></div>
      <div class="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.04)_1px,transparent_1px)] bg-[size:72px_72px] dark:bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)]"></div>
    </div>

    <header class="relative z-20 border-b border-gray-200/70 bg-white/80 px-5 py-4 backdrop-blur-xl dark:border-dark-800/70 dark:bg-dark-950/70">
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
            <div class="rounded-2xl border border-gray-200 bg-white/90 p-4 shadow-2xl shadow-gray-900/10 backdrop-blur dark:border-dark-700 dark:bg-dark-900/90 dark:shadow-black/30">
              <div class="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-dark-800">
                <div class="flex items-center gap-2">
                  <span class="h-3 w-3 rounded-full bg-red-400"></span>
                  <span class="h-3 w-3 rounded-full bg-amber-400"></span>
                  <span class="h-3 w-3 rounded-full bg-emerald-400"></span>
                </div>
                <span class="font-mono text-xs text-gray-400">api.gateway.local</span>
              </div>
              <div class="space-y-4">
                <div class="rounded-xl bg-gray-950 p-4 font-mono text-xs leading-6 text-dark-100">
                  <div><span class="text-emerald-400">$</span> curl /v1/chat/completions</div>
                  <div class="text-sky-300">base_url = "https://api.subtrix.ai/v1"</div>
                  <div class="text-primary-300">model = "best-available"</div>
                </div>
                <div class="grid gap-3 sm:grid-cols-3">
                  <div
                    v-for="metric in heroMetrics"
                    :key="metric.label"
                    class="rounded-xl border border-gray-100 bg-gray-50 p-3 dark:border-dark-800 dark:bg-dark-950/70"
                  >
                    <div class="text-lg font-bold text-gray-950 dark:text-white">{{ metric.value }}</div>
                    <div class="mt-1 text-xs leading-5 text-gray-500 dark:text-dark-400">{{ metric.label }}</div>
                  </div>
                </div>
                <div class="rounded-xl border border-primary-100 bg-primary-50/70 p-4 dark:border-primary-900/40 dark:bg-primary-950/20">
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

      <section class="border-y border-gray-200/70 bg-gray-50/80 px-5 py-8 dark:border-dark-800/70 dark:bg-dark-900/50">
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
