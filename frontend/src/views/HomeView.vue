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

  <div v-else class="subtrix-home relative min-h-screen overflow-hidden text-[var(--stx-text)]">
    <div class="console-backdrop" aria-hidden="true"></div>

    <header class="topbar" :class="{ 'is-scrolled': isScrolled }">
      <router-link to="/" class="brand" aria-label="Subtrix home">
        <span class="brand-mark">
          <img v-if="siteLogo" :src="siteLogo" alt="" />
          <span v-else>S</span>
        </span>
        <span class="brand-copy">
          <strong>{{ siteName }}</strong>
          <small>OpenAI & Anthropic-compatible gateway</small>
        </span>
      </router-link>

      <nav class="nav-links" aria-label="Primary navigation">
        <a href="#pricing">Pricing</a>
        <a href="#how-it-works">How it works</a>
        <a href="#use-cases">Use cases</a>
        <a href="#calculator">Savings calculator</a>
        <a href="#trust">Trust</a>
      </nav>

      <div class="header-actions">
        <button
          type="button"
          class="theme-toggle"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-pressed="isDark"
          @click="toggleTheme"
        >
          <span class="theme-toggle-track" aria-hidden="true">
            <span class="theme-toggle-sun"></span>
            <span class="theme-toggle-moon"></span>
            <span class="theme-toggle-thumb"></span>
          </span>
          <span>{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
        <router-link v-if="isAuthenticated" :to="dashboardPath" class="nav-cta">
          <span class="user-initial" aria-hidden="true">{{ userInitial }}</span>
          Dashboard
        </router-link>
        <a v-else class="nav-cta" :href="requestKeyHref">Request access</a>
      </div>
    </header>

    <main>
      <section id="hero" class="hero shell">
        <div class="hero-copy">
          <p class="eyebrow">OpenAI & Anthropic-compatible gateway</p>
          <h1>Frontier AI APIs at <span>65% below retail.</span></h1>
          <p class="lede">
            Point Codex, Claude Code, Cursor, your SaaS, or your mobile app to one Subtrix endpoint for discounted, metered, prepaid routing.
          </p>
          <div class="actions" aria-label="Hero calls to action">
            <router-link v-if="isAuthenticated" :to="dashboardPath" class="button primary">
              Go to dashboard
              <Icon name="arrowRight" size="sm" :stroke-width="2" />
            </router-link>
            <a v-else class="button primary" :href="requestKeyHref">Request a Subtrix API key</a>
            <a class="button secondary" :href="healthCheckUrl" target="_blank" rel="noopener noreferrer">Check API health</a>
            <button type="button" class="button secondary" @click="copySetup('openai')">
              Copy base URL
            </button>
          </div>
          <p class="microcopy">
            Customers pay about 35% of standard retail API pricing. Route availability and final rates depend on model, volume, and supply.
          </p>
        </div>

        <aside class="gateway-console" aria-label="Subtrix gateway console preview">
          <div class="console-top">
            <div>
              <span class="console-dot"></span>
              <span>Gateway Console</span>
            </div>
            <strong>Live route sample</strong>
          </div>
          <div class="stream-stage">
            <div class="node client-node">
              <span>Client</span>
              <strong>Codex CLI</strong>
              <small>Claude Code</small>
              <small>Cursor</small>
              <small>SaaS backend</small>
            </div>
            <div class="gateway-orb" aria-hidden="true">
              <span></span>
              <strong>Subtrix</strong>
            </div>
            <div class="node route-node">
              <span>Routes</span>
              <strong>OpenAI-compatible</strong>
              <small>Anthropic-compatible</small>
              <small>Fallback routes</small>
            </div>
            <i class="packet packet-a"></i>
            <i class="packet packet-b"></i>
            <i class="packet packet-c"></i>
          </div>
          <div class="metric-grid">
            <div><strong>65%</strong><span>discount vs retail</span></div>
            <div><strong>35%</strong><span>target retail cost</span></div>
            <div><strong>Prepaid</strong><span>credits</span></div>
            <div><strong>Metered</strong><span>usage</span></div>
          </div>
        </aside>
      </section>

      <section class="pain-strip shell" aria-label="High-token workload pressure">
        <article v-for="item in painPoints" :key="item.title">
          <span class="line-icon" :class="item.icon"></span>
          <h2>{{ item.title }}</h2>
          <p>{{ item.copy }}</p>
        </article>
      </section>

      <section id="pricing" class="section shell">
        <div class="section-head">
          <p class="eyebrow">Pricing</p>
          <h2>65% off retail API pricing, packaged for real workloads.</h2>
          <p>Subtrix targets roughly 35% of standard retail API cost, with final rates based on route, model mix, volume, and availability.</p>
        </div>
        <div class="plans">
          <article v-for="plan in plans" :key="plan.name" class="plan-card" :class="{ featured: plan.featured }">
            <div v-if="plan.badge" class="plan-badge">{{ plan.badge }}</div>
            <div class="plan-heading">
              <h3>{{ plan.name }}</h3>
              <p>{{ plan.description }}</p>
            </div>
            <div class="price"><strong>{{ plan.price }}</strong><span v-html="plan.priceNote"></span></div>
            <ul>
              <li v-for="feature in plan.features" :key="feature">{{ feature }}</li>
            </ul>
            <a v-if="!isAuthenticated" class="button" :class="plan.featured ? 'primary' : 'secondary'" :href="plan.href">
              {{ plan.cta }}
            </a>
            <router-link v-else class="button" :class="plan.featured ? 'primary' : 'secondary'" :to="dashboardPath">
              Go to dashboard
            </router-link>
          </article>
        </div>
        <div class="comparison-strip" aria-label="Retail versus Subtrix pricing comparison">
          <div>
            <span>Official retail API</span>
            <strong>100%</strong>
            <p>Easy to start, expensive at scale.</p>
          </div>
          <div>
            <span>Subtrix target</span>
            <strong>35%</strong>
            <p>65% discount with gateway controls.</p>
          </div>
          <div>
            <span>Your savings</span>
            <strong>65%</strong>
            <p>Margin recovered for high-token workloads.</p>
          </div>
        </div>
        <p class="fine-print">Illustrative target pricing. Final price depends on model route, supply, throughput, and volume.</p>
      </section>

      <section id="how-it-works" class="section shell how-grid">
        <div class="section-head">
          <h2>Change the base URL. Keep your workflow.</h2>
          <p>Use the client patterns your stack already understands. Subtrix sits between customer keys, prepaid balances, compatible route groups, and discounted supply.</p>
        </div>
        <div class="steps">
          <article v-for="(step, index) in workflowSteps" :key="step.title" class="step-card">
            <span>0{{ index + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p v-for="line in step.lines" :key="line">
              <code v-if="line.startsWith('OPENAI_') || line.startsWith('ANTHROPIC_')">{{ line }}</code>
              <template v-else>{{ line }}</template>
            </p>
          </article>
        </div>
        <div class="code-panel" aria-label="Subtrix endpoint setup snippets">
          <div v-for="snippet in snippets" :key="snippet.id" class="code-block" :class="{ wide: snippet.wide }">
            <div class="code-title">
              <span>{{ snippet.title }}</span>
              <button type="button" @click="copySetup(snippet.id)">{{ copiedSnippet === snippet.id ? 'Copied' : 'Copy' }}</button>
            </div>
            <pre><code>{{ snippet.code }}</code></pre>
          </div>
        </div>
      </section>

      <section id="calculator" class="section shell calculator-section">
        <div class="section-head">
          <h2>See what 65% off retail does to your AI margin.</h2>
          <p>Start with your current monthly retail API spend. Subtrix estimates use the public 35% of retail target.</p>
        </div>
        <div class="calculator-panel">
          <div class="calc-inputs">
            <label for="retail-spend">Monthly retail API spend</label>
            <div class="money-input">
              <span>$</span>
              <input id="retail-spend" v-model.number="retailSpend" type="number" min="0" step="100" inputmode="decimal">
            </div>
            <input v-model.number="retailSpend" type="range" min="100" max="50000" step="100" aria-label="Monthly retail API spend slider">
            <div class="discount-lock"><span>Fixed discount</span><strong>65%</strong><small>Effective price: 35% of retail</small></div>
          </div>
          <div class="calc-results" aria-live="polite">
            <div class="result-card"><span>Subtrix estimated bill</span><strong>{{ formatCurrency(subtrixBill) }}</strong></div>
            <div class="result-card savings"><span>Estimated monthly savings</span><strong>{{ formatCurrency(monthlySavings) }}</strong></div>
            <div class="result-card"><span>Annualized savings</span><strong>{{ formatCurrency(annualSavings) }}</strong></div>
          </div>
          <div class="bar-compare" aria-label="Retail and Subtrix price bar comparison">
            <div><span>Retail 100%</span><i style="--bar-width: 100%"></i></div>
            <div><span>Subtrix 35%</span><i style="--bar-width: 35%"></i></div>
          </div>
          <p class="fine-print"><span class="amber-dot"></span> Calculator is illustrative. Final savings depend on compatible route availability, model mix, volume, throughput, and supply.</p>
        </div>
      </section>

      <section id="use-cases" class="section shell">
        <div class="section-head">
          <h2>Built for high-token buyers, not casual chat.</h2>
          <p>Subtrix is for operators whose API usage changes margin, payback period, or delivery economics.</p>
        </div>
        <div class="use-case-grid">
          <article v-for="item in useCases" :key="item.title" class="use-case" :class="{ large: item.large }">
            <span class="spend-chip">{{ item.spend }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
      </section>

      <section class="section shell control-layer">
        <div class="section-head">
          <h2>More than a cheaper key. A control layer for resale-ready usage.</h2>
          <p>Customer access, prepaid balances, route groups, quotas, and a usage ledger make discounted supply operationally usable.</p>
        </div>
        <div class="control-grid">
          <article v-for="item in controlLayer" :key="item.title" class="control-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
        <aside class="dashboard-preview" aria-label="Sample gateway dashboard metrics">
          <div class="sample-label">Sample data</div>
          <div class="dashboard-row"><span>Route group</span><strong>builder-claude-compatible</strong></div>
          <div class="dashboard-row"><span>Balance</span><strong>$700 credits</strong></div>
          <div class="dashboard-row"><span>Retail equivalent</span><strong>$2,000</strong></div>
          <div class="dashboard-row saved"><span>Saved</span><strong>$1,300</strong></div>
          <div class="dashboard-meter"><span></span></div>
        </aside>
      </section>

      <section id="trust" class="section shell trust-section">
        <div class="section-head">
          <h2>Discounted should still be explainable.</h2>
          <p>Subtrix uses direct, route-dependent language so buyers understand what is available before production traffic moves.</p>
        </div>
        <div class="trust-grid">
          <article v-for="item in trustItems" :key="item.title" class="trust-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.copy }}</p>
          </article>
        </div>
      </section>

      <section class="section shell faq-section">
        <div class="section-head">
          <h2>Questions buyers ask before trusting a cheaper API.</h2>
        </div>
        <div class="faq-list">
          <details v-for="(item, index) in faqItems" :key="item.question" :open="index === 0">
            <summary>{{ item.question }}</summary>
            <p>{{ item.answer }}</p>
          </details>
        </div>
      </section>

      <section id="request-access" class="final-cta shell">
        <p class="eyebrow">Bring your token bill</p>
        <h2>If retail API pricing is eating your margin, route it through Subtrix.</h2>
        <p>Send your monthly model mix and traffic pattern. We will map it to a 65%-discount plan where compatible routes are available.</p>
        <div class="actions">
          <router-link v-if="isAuthenticated" :to="dashboardPath" class="button primary">
            Go to dashboard
            <Icon name="arrowRight" size="sm" :stroke-width="2" />
          </router-link>
          <a v-else class="button primary" :href="requestKeyHref">Request a Subtrix key</a>
          <a class="button secondary" :href="healthCheckUrl" target="_blank" rel="noopener noreferrer">Check live API health</a>
        </div>
        <small>Prepaid credits - Customer keys - Route-dependent availability</small>
      </section>
    </main>

    <footer class="footer shell">
      <span>{{ siteName }}</span>
      <span>OpenAI/Anthropic-compatible gateway for high-token workloads.</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useAppStore, useAuthStore } from '@/stores'
import Icon from '@/components/icons/Icon.vue'
import { sanitizeUrl } from '@/utils/url'
import { resolvePublicSiteName } from '@/utils/publicBrand'

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => resolvePublicSiteName(appStore.cachedPublicSettings?.site_name || appStore.siteName))
const siteLogo = computed(() => sanitizeUrl(appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')
const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const isScrolled = ref(false)
const copiedSnippet = ref('')
const retailSpend = ref(2000)

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const requestKeyHref = 'mailto:hello@subtrix.org?subject=Subtrix%20API%20key%20request'
const healthCheckUrl = 'https://api.subtrix.org/health'
const userInitial = computed(() => authStore.user?.email?.charAt(0).toUpperCase() || 'U')

const subtrixBill = computed(() => normalizedRetailSpend.value * 0.35)
const monthlySavings = computed(() => normalizedRetailSpend.value * 0.65)
const annualSavings = computed(() => monthlySavings.value * 12)
const normalizedRetailSpend = computed(() => Math.max(0, Number(retailSpend.value) || 0))

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0
})

const painPoints = [
  { title: 'Agentic coding burns tokens', copy: 'Codex and Claude Code read files, run tools, retry, and keep context alive.', icon: 'terminal-icon' },
  { title: 'AI apps turn tokens into COGS', copy: 'Every active user compounds your inference bill.', icon: 'chart-icon' },
  { title: 'Agencies lose margin in staging', copy: 'Fixed-price builds get squeezed by demos, revisions, and test traffic.', icon: 'pipeline-icon' },
  { title: 'Documents are input-heavy', copy: 'Legal, finance, PDF, and research workflows pay repeatedly for context.', icon: 'docs-icon' }
]

const plans = [
  {
    name: 'Developer',
    description: 'Individual builders and agentic coding power users.',
    price: '35%',
    priceNote: 'of retail API<br>prepaid credits',
    cta: 'Copy base URL setup',
    href: '#how-it-works',
    features: [
      'OpenAI-compatible endpoint.',
      'Codex/Cursor/Aider-style client setup where compatible.',
      'Single customer key.',
      'Usage and balance tracking.',
      'Best-effort model route availability.'
    ]
  },
  {
    name: 'Builder / Agency',
    description: 'Freelance coding agencies, indie SaaS, and AI wrappers.',
    price: '65%',
    priceNote: 'discount<br>volume prepaid',
    cta: 'Request builder keys',
    href: 'mailto:hello@subtrix.org?subject=Subtrix%20builder%20key%20request',
    badge: 'Best for agencies & SaaS',
    featured: true,
    features: [
      'OpenAI + Anthropic-compatible routing where available.',
      'Multiple keys/projects.',
      'Quotas per key or project.',
      'Higher throughput allowance.',
      'Usage exports for client/project accounting.'
    ]
  },
  {
    name: 'Scale',
    description: 'High-volume apps, mobile publishers, B2B SaaS, and document-heavy workflows.',
    price: 'Custom',
    priceNote: 'route mix<br>retail anchored',
    cta: 'Plan volume routing',
    href: 'mailto:hello@subtrix.org?subject=Subtrix%20volume%20routing',
    features: [
      'Dedicated routing group.',
      'Volume-based rate negotiation.',
      'Availability and fallback planning.',
      'Higher request/token throughput.',
      'Migration support for production workloads.'
    ]
  }
]

const workflowSteps = [
  {
    title: 'Point your client to Subtrix',
    lines: [
      'OPENAI_BASE_URL=https://api.subtrix.org/v1',
      'ANTHROPIC_BASE_URL=https://api.subtrix.org'
    ]
  },
  {
    title: 'Subtrix authenticates and meters',
    lines: ['Customer key, credits, quota, project, and route policy are checked before requests move.']
  },
  {
    title: 'Requests route through discounted supply',
    lines: ['Compatible upstream routes are selected based on availability, model, and cost.']
  }
]

const snippets = [
  {
    id: 'openai',
    title: 'OpenAI-compatible',
    code: 'export OPENAI_BASE_URL="https://api.subtrix.org/v1"\nexport OPENAI_API_KEY="sk-subtrix_..."'
  },
  {
    id: 'anthropic',
    title: 'Anthropic-compatible',
    code: 'export ANTHROPIC_BASE_URL="https://api.subtrix.org"\nexport ANTHROPIC_API_KEY="sk-subtrix_..."'
  },
  {
    id: 'curl',
    title: 'Request sample',
    wide: true,
    code: 'curl "$OPENAI_BASE_URL/chat/completions" \\\n  -H "Authorization: Bearer ***" \\\n  -H "Content-Type: application/json" \\\n  -d \'{"model":"frontier-route","messages":[{"role":"user","content":"Ship faster."}]}\''
  }
]

const useCases = [
  {
    title: 'Agentic coding power users',
    spend: '$30-$150/user potential monthly spend',
    copy: 'Codex CLI, Claude Code, Cursor, and Aider users can swap endpoints where compatible and reduce retail API anxiety around long repo context.',
    large: true
  },
  {
    title: 'Marketplace coding agencies',
    spend: '$500-$4k/agency potential monthly spend',
    copy: 'Protect fixed-price delivery margin while staging, demos, revisions, and coding agents keep running.',
    large: true
  },
  {
    title: 'Paid-acquisition AI apps',
    spend: '$2k-$25k/app potential monthly spend',
    copy: 'Cut inference COGS so ROAS and LTV have more room to work.'
  },
  {
    title: 'Mobile AI apps',
    spend: '$10k-$100k+/publisher potential monthly spend',
    copy: 'Make heavy user cohorts survivable without changing the product UX.'
  },
  {
    title: 'Document-heavy tools',
    spend: '$5k-$50k/platform potential monthly spend',
    copy: 'Large PDFs, legal files, finance workflows, and research context become easier to price.'
  }
]

const controlLayer = [
  { title: 'Customer keys', copy: 'Separate customer keys from upstream supply.' },
  { title: 'Prepaid balances', copy: 'Users spend credits, not blank-check API keys.' },
  { title: 'Quotas and limits', copy: 'Control usage by customer, project, or route where supported.' },
  { title: 'Route groups', copy: 'Match workloads to compatible discounted supply.' },
  { title: 'Usage ledger', copy: 'Make request and token spend visible.' },
  { title: 'Model availability boundaries', copy: 'Make route limits explicit before production scale.' }
]

const trustItems = [
  { title: 'No upstream key exposure', copy: 'Customers receive managed Subtrix keys; upstream supply remains private.' },
  { title: 'Prepaid by design', copy: 'Reduce surprise bills with balances, quotas, and route limits.' },
  { title: 'Route-dependent honesty', copy: 'Compatibility, models, throughput, and availability depend on active routes.' },
  { title: 'Logging rules before production', copy: 'Retention and logging policy must be clarified before production traffic.' },
  { title: 'Fallback planning', copy: 'Serious workloads need route and failure expectations, not mystery.' }
]

const faqItems = [
  { question: 'Why can Subtrix be 65% below retail?', answer: 'Aggregated demand, discounted upstream supply, route selection, and prepaid controls. Final availability depends on supply.' },
  { question: 'Do I need to rewrite my app?', answer: 'Usually no for OpenAI-compatible clients; change base URL and key. Anthropic-compatible support depends on client and route.' },
  { question: 'Can this work with Codex, Claude Code, Cursor, or Aider?', answer: 'For compatible clients and routes, yes; setup is via base URL and environment variables.' },
  { question: 'Is it identical to direct provider access?', answer: 'No. Compatibility, features, models, and limits are route-dependent.' },
  { question: 'What happens if a route is unavailable?', answer: 'Use fallback routes or route groups where configured. Production workloads should discuss availability planning.' },
  { question: 'How does billing work?', answer: 'Prepaid credits, usage metering, quotas, and managed customer keys.' },
  { question: 'Who should not use this?', answer: 'Low-volume casual users, or regulated workloads requiring direct enterprise provider contracts unless explicitly approved.' }
]

function formatCurrency(value: number) {
  return currencyFormatter.format(value)
}

async function copySetup(id: string) {
  const snippet = snippets.find((item) => item.id === id) || snippets[0]

  try {
    await navigator.clipboard.writeText(snippet.code)
    copiedSnippet.value = snippet.id
    appStore.showSuccess('Base URL setup copied')
    window.setTimeout(() => {
      if (copiedSnippet.value === snippet.id) copiedSnippet.value = ''
    }, 1300)
  } catch {
    appStore.showError('Could not copy setup. Copy https://api.subtrix.org/v1 manually.')
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
  } else if (savedTheme === 'light') {
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
}

function updateScrollState() {
  isScrolled.value = window.scrollY > 12
}

onMounted(() => {
  initTheme()
  updateScrollState()
  window.addEventListener('scroll', updateScrollState, { passive: true })
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollState)
})
</script>

<style scoped>
.subtrix-home {
  --stx-bg: #0b0f19;
  --stx-bg-deep: #060912;
  --stx-surface: #161d2f;
  --stx-text: #f8fafc;
  --stx-text-soft: #cbd5e1;
  --stx-muted: #94a3b8;
  --stx-cyan: #00f2fe;
  --stx-mint: #10b981;
  --stx-amber: #f59e0b;
  --stx-border: rgba(148, 163, 184, 0.18);
  --stx-border-strong: rgba(0, 242, 254, 0.34);
  --stx-shadow: rgba(0, 0, 0, 0.44);
  --stx-card-bg: linear-gradient(180deg, rgba(22, 29, 47, 0.86), rgba(11, 15, 25, 0.72));
  --stx-panel-bg: rgba(6, 9, 18, 0.72);
  --stx-panel-strong: rgba(6, 9, 18, 0.82);
  --stx-panel-soft: rgba(6, 9, 18, 0.62);
  --stx-chip-bg: rgba(16, 185, 129, 0.08);
  --stx-primary-text: #031018;
  --stx-mono: "JetBrains Mono", "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  isolation: isolate;
  overflow-x: clip;
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 0%, rgba(0, 242, 254, 0.22), transparent 34%),
    radial-gradient(circle at 85% 18%, rgba(16, 185, 129, 0.18), transparent 32%),
    linear-gradient(180deg, var(--stx-bg-deep) 0%, var(--stx-bg) 38%, #08101d 100%);
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  scroll-behavior: smooth;
  scroll-padding-top: 96px;
}

:global(:not(.dark)) .subtrix-home {
  --stx-bg: #f8fafc;
  --stx-bg-deep: #ffffff;
  --stx-surface: #ffffff;
  --stx-text: #07111f;
  --stx-text-soft: #334155;
  --stx-muted: #64748b;
  --stx-cyan: #0891b2;
  --stx-mint: #059669;
  --stx-amber: #d97706;
  --stx-border: rgba(15, 23, 42, 0.12);
  --stx-border-strong: rgba(8, 145, 178, 0.38);
  --stx-shadow: rgba(15, 23, 42, 0.16);
  --stx-card-bg: linear-gradient(180deg, rgba(255, 255, 255, 0.92), rgba(248, 250, 252, 0.82));
  --stx-panel-bg: rgba(255, 255, 255, 0.78);
  --stx-panel-strong: rgba(255, 255, 255, 0.9);
  --stx-panel-soft: rgba(248, 250, 252, 0.9);
  --stx-chip-bg: rgba(5, 150, 105, 0.09);
  --stx-primary-text: #ffffff;
  background:
    radial-gradient(circle at 16% -5%, rgba(8, 145, 178, 0.14), transparent 31%),
    radial-gradient(circle at 86% 10%, rgba(5, 150, 105, 0.13), transparent 29%),
    linear-gradient(180deg, #ffffff 0%, var(--stx-bg) 42%, #eef6fb 100%);
}

.console-backdrop {
  position: fixed;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(148, 163, 184, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.055) 1px, transparent 1px);
  background-size: 42px 42px;
  mask-image: linear-gradient(180deg, black 0%, transparent 82%);
  animation: grid-drift 26s linear infinite;
}

.shell {
  width: min(1180px, calc(100% - 36px));
  margin: 0 auto;
  min-width: 0;
}

.topbar {
  position: sticky;
  top: 12px;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: min(1180px, calc(100% - 28px));
  min-height: 66px;
  margin: 12px auto 0;
  padding: 10px 12px;
  border: 1px solid var(--stx-border);
  border-radius: 18px;
  background: color-mix(in srgb, var(--stx-bg-deep) 78%, transparent);
  backdrop-filter: blur(18px);
  box-shadow: 0 24px 60px -42px var(--stx-shadow);
  transition: border-color 180ms ease, background 180ms ease;
}

.topbar.is-scrolled {
  border-color: var(--stx-border-strong);
  background: color-mix(in srgb, var(--stx-bg-deep) 88%, transparent);
}

.brand,
.nav-links,
.header-actions,
.nav-cta,
.button,
.theme-toggle {
  display: inline-flex;
  align-items: center;
}

.brand {
  min-width: 0;
  gap: 10px;
  text-decoration: none;
}

.brand-mark {
  display: inline-grid;
  place-items: center;
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 10px;
  color: #031018;
  background: linear-gradient(135deg, var(--stx-cyan), var(--stx-mint));
  box-shadow: 0 0 34px rgba(0, 242, 254, 0.22);
  font-weight: 900;
}

.brand-mark img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.brand-copy {
  min-width: 0;
}

.brand-copy strong,
.brand-copy small {
  display: block;
}

.brand-copy strong {
  color: var(--stx-text);
  font-weight: 850;
}

.brand-copy small {
  color: var(--stx-muted);
  font-size: 0.72rem;
  line-height: 1.25;
}

.nav-links {
  gap: 18px;
  color: var(--stx-muted);
  font-size: 0.9rem;
  font-weight: 650;
}

.nav-links a {
  text-decoration: none;
  transition: color 160ms ease;
}

.nav-links a:hover,
.nav-links a:focus-visible {
  color: var(--stx-text);
  outline: none;
}

.header-actions {
  gap: 10px;
  margin-left: auto;
}

.nav-cta,
.button,
.theme-toggle {
  justify-content: center;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 800;
  line-height: 1;
  white-space: nowrap;
  transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease, background 160ms ease;
}

.nav-cta {
  gap: 8px;
  min-height: 42px;
  padding: 0 16px;
  border: 1px solid rgba(0, 242, 254, 0.28);
  background: rgba(0, 242, 254, 0.08);
  color: var(--stx-text);
}

.user-initial {
  display: inline-grid;
  place-items: center;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  color: #031018;
  background: linear-gradient(135deg, var(--stx-cyan), var(--stx-mint));
  font-size: 0.72rem;
}

.theme-toggle {
  gap: 9px;
  min-height: 42px;
  padding: 0 10px;
  border: 1px solid var(--stx-border);
  color: var(--stx-text);
  background: color-mix(in srgb, var(--stx-surface) 72%, transparent);
  cursor: pointer;
}

.theme-toggle-track {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 50px;
  height: 28px;
  padding: 3px;
  border: 1px solid rgba(0, 242, 254, 0.2);
  border-radius: 999px;
  background: rgba(6, 9, 18, 0.56);
}

.theme-toggle-thumb {
  position: absolute;
  top: 3px;
  left: 3px;
  width: 20px;
  height: 20px;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--stx-cyan), var(--stx-mint));
  transition: transform 180ms ease;
}

.theme-toggle[aria-pressed="false"] .theme-toggle-thumb {
  transform: translateX(22px);
}

.theme-toggle-sun,
.theme-toggle-moon {
  position: relative;
  z-index: 1;
  justify-self: center;
  width: 12px;
  height: 12px;
  border-radius: 999px;
}

.theme-toggle-sun {
  background: #fbbf24;
}

.theme-toggle-moon {
  background: #cbd5e1;
  box-shadow: inset 4px -2px 0 #0b1220;
}

.button {
  min-height: 50px;
  gap: 8px;
  padding: 0 18px;
  border: 1px solid var(--stx-border);
  color: var(--stx-text);
  background: color-mix(in srgb, var(--stx-surface) 72%, transparent);
}

.button.primary {
  border-color: transparent;
  color: var(--stx-primary-text);
  background: linear-gradient(135deg, var(--stx-cyan) 0%, var(--stx-mint) 100%);
  box-shadow: 0 20px 50px -30px rgba(0, 242, 254, 0.9);
}

.button.secondary:hover,
.nav-cta:hover,
.button:hover,
.theme-toggle:hover {
  transform: translateY(-2px);
  border-color: var(--stx-border-strong);
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 0.94fr) minmax(0, 1.06fr);
  gap: 44px;
  align-items: center;
  min-height: calc(100dvh - 92px);
  padding: 68px 0 52px;
}

.hero-copy {
  min-width: 0;
  max-width: 690px;
}

.eyebrow {
  margin: 0 0 16px;
  color: var(--stx-cyan);
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 24px;
  color: var(--stx-text);
  font-size: clamp(3.15rem, 6.5vw, 6.4rem);
  font-weight: 850;
  line-height: 0.94;
  letter-spacing: 0;
  text-wrap: balance;
}

h1 span {
  display: inline-block;
  color: transparent;
  background: linear-gradient(100deg, var(--stx-cyan), var(--stx-mint));
  -webkit-background-clip: text;
  background-clip: text;
}

h2 {
  margin-bottom: 16px;
  color: var(--stx-text);
  font-size: clamp(2rem, 4vw, 3.85rem);
  font-weight: 850;
  line-height: 1;
  letter-spacing: 0;
  text-wrap: balance;
}

h3 {
  margin-bottom: 10px;
  color: var(--stx-text);
  font-size: 1.18rem;
  font-weight: 820;
  line-height: 1.18;
}

p,
li {
  color: var(--stx-muted);
  line-height: 1.66;
}

.lede {
  max-width: 620px;
  color: var(--stx-text-soft);
  font-size: clamp(1.12rem, 2vw, 1.34rem);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 30px 0 16px;
}

.microcopy,
.fine-print {
  color: var(--stx-muted);
  font-size: 0.94rem;
}

.gateway-console,
.pain-strip article,
.plan-card,
.step-card,
.code-panel,
.calculator-panel,
.use-case,
.control-card,
.dashboard-preview,
.trust-card,
.faq-list,
.final-cta {
  min-width: 0;
  border: 1px solid var(--stx-border);
  background: var(--stx-card-bg);
  backdrop-filter: blur(18px);
  box-shadow: 0 30px 80px -60px rgba(0, 0, 0, 0.95), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.gateway-console {
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 24px;
}

.gateway-console::before {
  content: "";
  position: absolute;
  inset: -1px;
  background:
    radial-gradient(circle at 50% 42%, rgba(0, 242, 254, 0.16), transparent 34%),
    radial-gradient(circle at 78% 78%, rgba(16, 185, 129, 0.12), transparent 24%);
  pointer-events: none;
}

.console-top,
.stream-stage,
.metric-grid {
  position: relative;
}

.console-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  margin-bottom: 22px;
  color: var(--stx-text-soft);
  font-family: var(--stx-mono);
  font-size: 0.82rem;
}

.console-top div {
  display: flex;
  align-items: center;
  gap: 8px;
}

.console-dot {
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--stx-mint);
  box-shadow: 0 0 18px rgba(16, 185, 129, 0.9);
}

.console-top strong {
  color: var(--stx-cyan);
}

.stream-stage {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 146px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  min-height: 286px;
}

.stream-stage::before,
.stream-stage::after {
  content: "";
  position: absolute;
  top: 50%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(0, 242, 254, 0.62), rgba(16, 185, 129, 0.5), transparent);
}

.stream-stage::before {
  left: 23%;
  right: 53%;
}

.stream-stage::after {
  left: 53%;
  right: 23%;
}

.node {
  min-height: 188px;
  padding: 16px;
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 18px;
  background: var(--stx-panel-bg);
}

.node span,
.node small {
  display: block;
  font-family: var(--stx-mono);
  font-size: 0.75rem;
}

.node span {
  margin-bottom: 12px;
  color: var(--stx-cyan);
}

.node strong {
  display: block;
  margin-bottom: 12px;
  color: var(--stx-text);
}

.node small {
  margin-top: 8px;
  padding: 7px 8px;
  border: 1px solid rgba(148, 163, 184, 0.14);
  border-radius: 9px;
  color: var(--stx-text-soft);
  background: var(--stx-panel-soft);
}

.gateway-orb {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 146px;
  height: 146px;
  border-radius: 50%;
  color: #fff;
  background: conic-gradient(from 90deg, rgba(0, 242, 254, 0.12), var(--stx-cyan), var(--stx-mint), rgba(0, 242, 254, 0.12));
  animation: spin 12s linear infinite;
}

.gateway-orb span {
  position: absolute;
  inset: 10px;
  border-radius: inherit;
  background: radial-gradient(circle at 35% 25%, rgba(0, 242, 254, 0.3), rgba(6, 9, 18, 0.96) 58%);
}

.gateway-orb strong {
  position: relative;
  font-family: var(--stx-mono);
  font-size: 0.9rem;
}

.packet {
  position: absolute;
  top: calc(50% - 4px);
  left: 20%;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: var(--stx-cyan);
  box-shadow: 0 0 18px rgba(0, 242, 254, 0.95);
  animation: packet-move 3.4s linear infinite;
}

.packet-b {
  animation-delay: -1.1s;
  background: var(--stx-mint);
  box-shadow: 0 0 18px rgba(16, 185, 129, 0.95);
}

.packet-c {
  animation-delay: -2.2s;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin-top: 18px;
}

.metric-grid div {
  min-height: 92px;
  padding: 14px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  background: var(--stx-panel-soft);
}

.metric-grid strong,
.price strong,
.comparison-strip strong,
.result-card strong,
.dashboard-row strong {
  font-variant-numeric: tabular-nums;
}

.metric-grid strong {
  display: block;
  margin-bottom: 6px;
  color: var(--stx-text);
  font-size: 1.34rem;
}

.metric-grid span {
  color: var(--stx-muted);
  font-size: 0.83rem;
}

.pain-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  padding: 0 0 48px;
}

.pain-strip article {
  border-radius: 20px;
  padding: 20px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.pain-strip article:hover,
.plan-card:hover,
.use-case:hover,
.control-card:hover,
.trust-card:hover {
  transform: translateY(-3px);
  border-color: rgba(0, 242, 254, 0.3);
}

.pain-strip h2 {
  margin-bottom: 8px;
  font-size: 1.05rem;
  letter-spacing: 0;
  line-height: 1.18;
}

.line-icon {
  display: block;
  width: 34px;
  height: 28px;
  margin-bottom: 16px;
  border: 1px solid rgba(0, 242, 254, 0.34);
  border-radius: 8px;
  background:
    linear-gradient(90deg, var(--stx-cyan) 0 36%, transparent 36% 46%, var(--stx-mint) 46% 66%, transparent 66%),
    rgba(0, 242, 254, 0.06);
}

.chart-icon {
  transform: skewX(-8deg);
}

.pipeline-icon {
  border-radius: 999px;
}

.docs-icon {
  box-shadow: 5px 5px 0 rgba(16, 185, 129, 0.16);
}

.section {
  padding: 92px 0;
}

.section-head {
  max-width: 820px;
  margin-bottom: 28px;
}

.section-head p {
  max-width: 720px;
  color: var(--stx-text-soft);
  font-size: 1.07rem;
}

.plans {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  align-items: stretch;
}

.plan-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100%;
  border-radius: 24px;
  padding: 24px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.plan-card.featured {
  border-color: transparent;
  background:
    var(--stx-card-bg) padding-box,
    linear-gradient(135deg, rgba(0, 242, 254, 0.7), rgba(16, 185, 129, 0.55), rgba(148, 163, 184, 0.18)) border-box;
}

.plan-badge,
.spend-chip,
.sample-label {
  display: inline-flex;
  width: fit-content;
  margin-bottom: 16px;
  padding: 6px 10px;
  border: 1px solid rgba(16, 185, 129, 0.3);
  border-radius: 999px;
  color: var(--stx-mint);
  background: var(--stx-chip-bg);
  font-size: 0.75rem;
  font-weight: 800;
}

.plan-heading {
  min-height: 112px;
}

.price {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  margin: 6px 0 22px;
  padding: 18px 0;
  border-top: 1px solid var(--stx-border);
  border-bottom: 1px solid var(--stx-border);
}

.price strong {
  color: var(--stx-text);
  font-size: clamp(2rem, 4vw, 3.3rem);
  line-height: 0.9;
}

.price span {
  color: var(--stx-muted);
  font-size: 0.9rem;
}

.plan-card ul {
  display: grid;
  gap: 10px;
  margin: 0 0 24px;
  padding-left: 18px;
}

.plan-card .button {
  width: 100%;
  margin-top: auto;
}

.comparison-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  overflow: hidden;
  margin-top: 18px;
  border: 1px solid var(--stx-border);
  border-radius: 22px;
  background: var(--stx-border);
}

.comparison-strip div {
  padding: 20px;
  background: var(--stx-panel-strong);
}

.comparison-strip span {
  color: var(--stx-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.comparison-strip strong {
  display: block;
  margin: 12px 0 8px;
  color: var(--stx-cyan);
  font-size: clamp(2rem, 5vw, 4rem);
  line-height: 0.9;
}

.comparison-strip div:last-child strong {
  color: var(--stx-mint);
}

.how-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 28px;
}

.how-grid .section-head {
  grid-column: 1 / -1;
  margin-bottom: 0;
}

.steps {
  display: grid;
  gap: 14px;
}

.step-card {
  position: relative;
  border-radius: 20px;
  padding: 22px;
}

.step-card span {
  display: inline-block;
  margin-bottom: 12px;
  color: var(--stx-cyan);
  font-family: var(--stx-mono);
  font-size: 0.8rem;
}

.step-card code {
  color: var(--stx-text-soft);
  font-family: var(--stx-mono);
  font-size: 0.83rem;
  overflow-wrap: anywhere;
}

.code-panel {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  border-radius: 24px;
  padding: 16px;
  background: var(--stx-panel-bg);
}

.code-block.wide {
  grid-column: 1 / -1;
}

.code-block {
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 16px;
  background: var(--stx-panel-strong);
}

.code-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
  color: var(--stx-text-soft);
  font-family: var(--stx-mono);
  font-size: 0.78rem;
}

.code-title button {
  min-height: 28px;
  border: 1px solid rgba(0, 242, 254, 0.24);
  border-radius: 8px;
  color: var(--stx-cyan);
  background: rgba(0, 242, 254, 0.07);
  cursor: pointer;
}

pre {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  color: var(--stx-text-soft);
  font-family: var(--stx-mono);
  font-size: 0.82rem;
  line-height: 1.72;
}

.calculator-panel {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 22px;
  border-radius: 28px;
  padding: 24px;
}

.calc-inputs label {
  display: block;
  margin-bottom: 10px;
  color: var(--stx-text-soft);
  font-weight: 800;
}

.money-input {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 62px;
  margin-bottom: 18px;
  padding: 0 16px;
  border: 1px solid var(--stx-border);
  border-radius: 16px;
  background: var(--stx-panel-strong);
}

.money-input span {
  color: var(--stx-mint);
  font-size: 1.5rem;
  font-weight: 900;
}

.money-input input {
  width: 100%;
  border: 0;
  outline: 0;
  color: var(--stx-text);
  background: transparent;
  font-size: 2rem;
  font-weight: 850;
  font-variant-numeric: tabular-nums;
}

input[type="range"] {
  width: 100%;
  accent-color: var(--stx-cyan);
}

.discount-lock {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 6px 14px;
  margin-top: 22px;
  padding: 16px;
  border: 1px solid rgba(16, 185, 129, 0.22);
  border-radius: 16px;
  background: var(--stx-chip-bg);
}

.discount-lock span,
.discount-lock small {
  color: var(--stx-muted);
}

.discount-lock strong {
  color: var(--stx-mint);
  font-size: 1.6rem;
  line-height: 1;
}

.discount-lock small {
  grid-column: 1 / -1;
}

.calc-results {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.result-card {
  min-height: 154px;
  padding: 18px;
  border: 1px solid rgba(148, 163, 184, 0.16);
  border-radius: 18px;
  background: var(--stx-panel-soft);
}

.result-card span {
  display: block;
  min-height: 42px;
  color: var(--stx-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.result-card strong {
  display: block;
  margin-top: 18px;
  color: var(--stx-text);
  font-size: clamp(1.55rem, 3vw, 2.45rem);
  line-height: 1;
}

.result-card.savings strong {
  color: var(--stx-mint);
}

.bar-compare {
  grid-column: 1 / -1;
  display: grid;
  gap: 12px;
}

.bar-compare div {
  display: grid;
  grid-template-columns: 116px 1fr;
  align-items: center;
  gap: 12px;
  color: var(--stx-muted);
  font-size: 0.82rem;
  font-weight: 800;
}

.bar-compare i {
  display: block;
  width: var(--bar-width);
  height: 12px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--stx-cyan), var(--stx-mint));
}

.amber-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: 8px;
  border-radius: 999px;
  background: var(--stx-amber);
}

.use-case-grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 16px;
}

.use-case {
  grid-column: span 2;
  min-height: 230px;
  border-radius: 24px;
  padding: 24px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.use-case.large {
  grid-column: span 3;
}

.control-layer {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 24px;
}

.control-layer .section-head {
  grid-column: 1 / -1;
  margin-bottom: 0;
}

.control-grid,
.trust-grid {
  display: grid;
  gap: 14px;
}

.control-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.control-card,
.trust-card {
  border-radius: 20px;
  padding: 20px;
  transition: transform 160ms ease, border-color 160ms ease;
}

.dashboard-preview {
  align-self: start;
  border-radius: 24px;
  padding: 22px;
  background: linear-gradient(180deg, var(--stx-panel-strong), var(--stx-panel-bg));
}

.dashboard-row {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(148, 163, 184, 0.14);
}

.dashboard-row span {
  color: var(--stx-muted);
}

.dashboard-row strong {
  color: var(--stx-text-soft);
  text-align: right;
}

.dashboard-row.saved strong {
  color: var(--stx-mint);
}

.dashboard-meter {
  height: 12px;
  margin-top: 20px;
  overflow: hidden;
  border-radius: 999px;
  background: rgba(148, 163, 184, 0.12);
}

.dashboard-meter span {
  display: block;
  width: 65%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--stx-cyan), var(--stx-mint));
}

.trust-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.trust-card:nth-child(4) {
  border-color: rgba(245, 158, 11, 0.26);
}

.faq-list {
  overflow: hidden;
  border-radius: 22px;
  background: var(--stx-panel-bg);
}

.faq-list details {
  border-top: 1px solid var(--stx-border);
  padding: 20px 22px;
}

.faq-list details:first-child {
  border-top: 0;
}

.faq-list details[open] {
  border-left: 3px solid var(--stx-cyan);
}

.faq-list summary {
  cursor: pointer;
  color: var(--stx-text);
  font-size: 1.05rem;
  font-weight: 850;
}

.faq-list p {
  max-width: 840px;
  margin: 12px 0 0;
}

.final-cta {
  position: relative;
  overflow: hidden;
  margin-top: 46px;
  border-radius: 30px;
  padding: 56px 44px;
  text-align: center;
}

.final-cta::before {
  content: "";
  position: absolute;
  inset: -60%;
  background: conic-gradient(from 120deg, transparent, rgba(0, 242, 254, 0.16), rgba(16, 185, 129, 0.12), transparent);
  animation: spin 22s linear infinite;
}

.final-cta > * {
  position: relative;
}

.final-cta h2,
.final-cta p {
  max-width: 790px;
  margin-left: auto;
  margin-right: auto;
}

.final-cta .actions {
  justify-content: center;
}

.final-cta small {
  color: var(--stx-muted);
  font-weight: 750;
}

.footer {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 42px 0 52px;
  color: var(--stx-muted);
}

.footer span:first-child {
  color: var(--stx-text);
  font-weight: 850;
}

@keyframes grid-drift {
  from {
    background-position: 0 0, 0 0;
  }

  to {
    background-position: 42px 42px, 42px 42px;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes packet-move {
  0% {
    left: 21%;
    opacity: 0;
    transform: scale(0.65);
  }

  12%,
  88% {
    opacity: 1;
  }

  50% {
    left: 50%;
    opacity: 1;
  }

  100% {
    left: 78%;
    opacity: 0;
    transform: scale(1);
  }
}

@media (max-width: 1100px) {
  .nav-links {
    display: none;
  }

  .hero,
  .how-grid,
  .calculator-panel,
  .control-layer {
    grid-template-columns: 1fr;
  }

  .trust-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .plans,
  .pain-strip,
  .comparison-strip,
  .calc-results {
    grid-template-columns: 1fr;
  }

  .use-case,
  .use-case.large {
    grid-column: span 6;
  }

  .code-panel,
  .control-grid,
  .trust-grid {
    grid-template-columns: 1fr;
  }

  .hero {
    padding-top: 48px;
  }

  .stream-stage {
    grid-template-columns: 1fr;
  }

  .stream-stage::before,
  .stream-stage::after,
  .packet {
    display: none;
  }

  .gateway-orb {
    justify-self: center;
  }
}

@media (max-width: 640px) {
  .shell {
    width: min(100% - 28px, 1180px);
  }

  .topbar {
    align-items: flex-start;
    flex-direction: column;
  }

  .header-actions {
    width: 100%;
    margin-left: 0;
  }

  .theme-toggle,
  .nav-cta {
    flex: 1;
  }

  .brand-copy small {
    display: none;
  }

  h1 {
    font-size: clamp(3rem, 16vw, 4.7rem);
  }

  .metric-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .gateway-console,
  .calculator-panel,
  .final-cta {
    padding: 18px;
    border-radius: 22px;
  }

  .bar-compare div {
    grid-template-columns: 1fr;
  }

  .footer {
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .subtrix-home *,
  .subtrix-home *::before,
  .subtrix-home *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }

  .button:hover,
  .nav-cta:hover,
  .theme-toggle:hover,
  .pain-strip article:hover,
  .plan-card:hover,
  .use-case:hover,
  .control-card:hover,
  .trust-card:hover {
    transform: none;
  }
}
</style>
