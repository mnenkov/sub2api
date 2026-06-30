// =====================
// English-only note removed during locale cleanup
// =====================

// OpenAI
const openaiModels = [
  // English-only note removed during locale cleanup
  'gpt-5.2', 'gpt-5.2-2025-12-11', 'gpt-5.2-chat-latest',
  'gpt-5.2-pro', 'gpt-5.2-pro-2025-12-11',
  // English-only note removed during locale cleanup
  'gpt-5.5',
  // English-only note removed during locale cleanup
  'gpt-5.4', 'gpt-5.4-mini', 'gpt-5.4-2026-03-05',
  // English-only note removed during locale cleanup
  'gpt-5.3-codex', 'gpt-5.3-codex-spark', 'codex-auto-review',
  'gpt-4o-audio-preview', 'gpt-4o-realtime-preview',
  // English-only note removed during locale cleanup
  'gpt-image-1', 'gpt-image-1.5', 'gpt-image-2'
]

// Anthropic Claude
export const claudeModels = [
  'claude-3-5-sonnet-20241022', 'claude-3-5-sonnet-20240620',
  'claude-3-5-haiku-20241022',
  'claude-3-7-sonnet-20250219',
  'claude-sonnet-4-20250514', 'claude-opus-4-20250514',
  'claude-opus-4-1-20250805',
  'claude-sonnet-4-5-20250929', 'claude-haiku-4-5-20251001',
  'claude-opus-4-5-20251101',
  'claude-opus-4-6',
  'claude-opus-4-7',
  'claude-opus-4-8',
  'claude-sonnet-4-6',
  'claude-fable-5'
]

// Google Gemini
const geminiModels = [
  // Keep in sync with backend curated Gemini lists.
  // This list is intentionally conservative (models commonly available across OAuth/API key).
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
  'gemini-2.0-flash',
  'gemini-2.5-flash',
  'gemini-2.5-pro',
  'gemini-3.5-flash',
  'gemini-3-flash-preview',
  'gemini-3-pro-preview'
]

// English-only note removed during locale cleanup
// English-only note removed during locale cleanup
const antigravityModels = [
  // English-only note removed during locale cleanup
  'claude-fable-5',
  'claude-opus-4-6',
  'claude-opus-4-6-thinking',
  'claude-opus-4-7',
  'claude-opus-4-8',
  'claude-opus-4-5-thinking',
  'claude-sonnet-4-6',
  'claude-sonnet-4-5',
  'claude-sonnet-4-5-thinking',
  // English-only note removed during locale cleanup
  'gemini-3.1-flash-image',
  'gemini-2.5-flash-image',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite',
  'gemini-2.5-flash-thinking',
  'gemini-2.5-pro',
  // English-only note removed during locale cleanup
  'gemini-3-flash',
  'gemini-3-pro-high',
  'gemini-3-pro-low',
  // English-only note removed during locale cleanup
  'gemini-3.1-pro-high',
  'gemini-3.1-pro-low',
  'gemini-3-pro-image',
  // English-only note removed during locale cleanup
  'gpt-oss-120b-medium',
  'tab_flash_lite_preview'
]

// English-only note removed during locale cleanup
const zhipuModels = [
  'glm-4', 'glm-4v', 'glm-4-plus', 'glm-4-0520',
  'glm-4-air', 'glm-4-airx', 'glm-4-long', 'glm-4-flash',
  'glm-4v-plus', 'glm-4.5', 'glm-4.6',
  'glm-3-turbo', 'glm-4-alltools',
  'chatglm_turbo', 'chatglm_pro', 'chatglm_std', 'chatglm_lite',
  'cogview-3', 'cogvideo'
]

// English-only note removed during locale cleanup
const qwenModels = [
  'qwen-turbo', 'qwen-plus', 'qwen-max', 'qwen-max-longcontext', 'qwen-long',
  'qwen2-72b-instruct', 'qwen2-57b-a14b-instruct', 'qwen2-7b-instruct',
  'qwen2.5-72b-instruct', 'qwen2.5-32b-instruct', 'qwen2.5-14b-instruct',
  'qwen2.5-7b-instruct', 'qwen2.5-3b-instruct', 'qwen2.5-1.5b-instruct',
  'qwen2.5-coder-32b-instruct', 'qwen2.5-coder-14b-instruct', 'qwen2.5-coder-7b-instruct',
  'qwen3-235b-a22b',
  'qwq-32b', 'qwq-32b-preview'
]

// DeepSeek
const deepseekModels = [
  'deepseek-chat', 'deepseek-coder', 'deepseek-reasoner',
  'deepseek-v3', 'deepseek-v3-0324',
  'deepseek-r1', 'deepseek-r1-0528',
  'deepseek-r1-distill-qwen-32b', 'deepseek-r1-distill-qwen-14b', 'deepseek-r1-distill-qwen-7b',
  'deepseek-r1-distill-llama-70b', 'deepseek-r1-distill-llama-8b'
]

// Mistral
const mistralModels = [
  'mistral-small-latest', 'mistral-medium-latest', 'mistral-large-latest',
  'open-mistral-7b', 'open-mixtral-8x7b', 'open-mixtral-8x22b',
  'codestral-latest', 'codestral-mamba',
  'pixtral-12b-2409', 'pixtral-large-latest'
]

// Meta Llama
const metaModels = [
  'llama-3.3-70b-instruct',
  'llama-3.2-90b-vision-instruct', 'llama-3.2-11b-vision-instruct',
  'llama-3.2-3b-instruct', 'llama-3.2-1b-instruct',
  'llama-3.1-405b-instruct', 'llama-3.1-70b-instruct', 'llama-3.1-8b-instruct',
  'llama-3-70b-instruct', 'llama-3-8b-instruct',
  'codellama-70b-instruct', 'codellama-34b-instruct', 'codellama-13b-instruct'
]

// xAI Grok
const xaiModels = [
  'grok-4.3',
  'grok-build-0.1',
  'grok-4.20-0309-reasoning',
  'grok-4.20-0309-non-reasoning',
  'grok-4.20-multi-agent-0309',
  'grok',
  'grok-latest',
  'grok-build',
  'grok-4.20-reasoning',
  'grok-4.20-non-reasoning'
]

// Cohere
const cohereModels = [
  'command-a-03-2025',
  'command-r', 'command-r-plus',
  'command-r-08-2024', 'command-r-plus-08-2024',
  'c4ai-aya-23-35b', 'c4ai-aya-23-8b',
  'command', 'command-light'
]

// Yi (01.AI)
const yiModels = [
  'yi-large', 'yi-large-turbo', 'yi-large-rag',
  'yi-medium', 'yi-medium-200k',
  'yi-spark', 'yi-vision',
  'yi-1.5-34b-chat', 'yi-1.5-9b-chat', 'yi-1.5-6b-chat'
]

// Moonshot/Kimi
const moonshotModels = [
  'moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k',
  'kimi-latest'
]

// English-only note removed during locale cleanup
const doubaoModels = [
  'doubao-pro-256k', 'doubao-pro-128k', 'doubao-pro-32k', 'doubao-pro-4k',
  'doubao-lite-128k', 'doubao-lite-32k', 'doubao-lite-4k',
  'doubao-vision-pro-32k', 'doubao-vision-lite-32k',
  'doubao-1.5-pro-256k', 'doubao-1.5-pro-32k', 'doubao-1.5-lite-32k',
  'doubao-1.5-pro-vision-32k', 'doubao-1.5-thinking-pro'
]

// MiniMax
const minimaxModels = [
  'abab6.5-chat', 'abab6.5s-chat', 'abab6.5s-chat-pro',
  'abab6-chat',
  'abab5.5-chat', 'abab5.5s-chat'
]

// English-only note removed during locale cleanup
const baiduModels = [
  'ernie-4.0-8k-latest', 'ernie-4.0-8k', 'ernie-4.0-turbo-8k',
  'ernie-3.5-8k', 'ernie-3.5-128k',
  'ernie-speed-8k', 'ernie-speed-128k', 'ernie-speed-pro-128k',
  'ernie-lite-8k', 'ernie-lite-pro-128k',
  'ernie-tiny-8k'
]

// English-only note removed during locale cleanup
const sparkModels = [
  'spark-desk', 'spark-desk-v1.1', 'spark-desk-v2.1',
  'spark-desk-v3.1', 'spark-desk-v3.5', 'spark-desk-v4.0',
  'spark-lite', 'spark-pro', 'spark-max', 'spark-ultra'
]

// English-only note removed during locale cleanup
const hunyuanModels = [
  'hunyuan-lite', 'hunyuan-standard', 'hunyuan-standard-256k',
  'hunyuan-pro', 'hunyuan-turbo', 'hunyuan-large',
  'hunyuan-vision', 'hunyuan-code'
]

// Perplexity
const perplexityModels = [
  'sonar', 'sonar-pro', 'sonar-reasoning',
  'llama-3-sonar-small-32k-online', 'llama-3-sonar-large-32k-online',
  'llama-3-sonar-small-32k-chat', 'llama-3-sonar-large-32k-chat'
]

// English-only note removed during locale cleanup
const allModelsList: string[] = [
  ...openaiModels,
  ...claudeModels,
  ...geminiModels,
  ...zhipuModels,
  ...qwenModels,
  ...deepseekModels,
  ...mistralModels,
  ...metaModels,
  ...xaiModels,
  ...cohereModels,
  ...yiModels,
  ...moonshotModels,
  ...doubaoModels,
  ...minimaxModels,
  ...baiduModels,
  ...sparkModels,
  ...hunyuanModels,
  ...perplexityModels
]

// English-only note removed during locale cleanup
export const allModels = allModelsList.map(m => ({ value: m, label: m }))

// =====================
// English-only note removed during locale cleanup
// =====================

const anthropicPresetMappings = [
  { label: 'Fable 5', from: 'claude-fable-5', to: 'claude-fable-5', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400' },
  { label: 'Sonnet 4', from: 'claude-sonnet-4-20250514', to: 'claude-sonnet-4-20250514', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: 'Sonnet 4.5', from: 'claude-sonnet-4-5-20250929', to: 'claude-sonnet-4-5-20250929', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'Sonnet 4.6', from: 'claude-sonnet-4-6', to: 'claude-sonnet-4-6', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'Opus 4.5', from: 'claude-opus-4-5-20251101', to: 'claude-opus-4-5-20251101', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Opus 4.6', from: 'claude-opus-4-6', to: 'claude-opus-4-6', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Opus 4.7', from: 'claude-opus-4-7', to: 'claude-opus-4-7', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Opus 4.8', from: 'claude-opus-4-8', to: 'claude-opus-4-8', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Haiku 3.5', from: 'claude-3-5-haiku-20241022', to: 'claude-3-5-haiku-20241022', color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'Haiku 4.5', from: 'claude-haiku-4-5-20251001', to: 'claude-haiku-4-5-20251001', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'Opus->Sonnet', from: 'claude-opus-4-6', to: 'claude-sonnet-4-5-20250929', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' }
]

const openaiPresetMappings = [
  { label: 'GPT-4o', from: 'gpt-4o', to: 'gpt-4o', color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' },
  { label: 'GPT-4o Mini', from: 'gpt-4o-mini', to: 'gpt-4o-mini', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: 'GPT-4.1', from: 'gpt-4.1', to: 'gpt-4.1', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'o1', from: 'o1', to: 'o1', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'o3', from: 'o3', to: 'o3', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'GPT-5.3 Codex Spark', from: 'gpt-5.3-codex-spark', to: 'gpt-5.3-codex-spark', color: 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400' },
  { label: 'GPT-5.2', from: 'gpt-5.2', to: 'gpt-5.2', color: 'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400' },
  { label: 'GPT-5.5', from: 'gpt-5.5', to: 'gpt-5.5', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' },
  { label: 'GPT-5.4', from: 'gpt-5.4', to: 'gpt-5.4', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400' },
  { label: 'Haiku→5.4', from: 'claude-haiku-4-5-20251001', to: 'gpt-5.4', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'Opus→5.4', from: 'claude-opus-4-6', to: 'gpt-5.4', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Sonnet→5.4', from: 'claude-sonnet-4-6', to: 'gpt-5.4', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' }
]

const geminiPresetMappings = [
  { label: 'Flash 2.0', from: 'gemini-2.0-flash', to: 'gemini-2.0-flash', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: '2.5 Flash', from: 'gemini-2.5-flash', to: 'gemini-2.5-flash', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: '2.5 Image', from: 'gemini-2.5-flash-image', to: 'gemini-2.5-flash-image', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' },
  { label: '2.5 Pro', from: 'gemini-2.5-pro', to: 'gemini-2.5-pro', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: '3.5 Flash', from: 'gemini-3.5-flash', to: 'gemini-3.5-flash', color: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400' },
  { label: '3.1 Image', from: 'gemini-3.1-flash-image', to: 'gemini-3.1-flash-image', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' }
]

const grokPresetMappings = [
  { label: 'Grok 4.3', from: 'grok-4.3', to: 'grok-4.3', color: 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800/50 dark:text-slate-300' },
  { label: 'Grok Latest', from: 'grok-latest', to: 'grok-4.3', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'Build 0.1', from: 'grok-build', to: 'grok-build-0.1', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: '4.20 Reasoning', from: 'grok-4.20-reasoning', to: 'grok-4.20-0309-reasoning', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: '4.20 Non Reasoning', from: 'grok-4.20-non-reasoning', to: 'grok-4.20-0309-non-reasoning', color: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400' }
]

// English-only note removed during locale cleanup
const antigravityPresetMappings = [
  // English-only note removed during locale cleanup
  { label: 'Claude→Sonnet', from: 'claude-*', to: 'claude-sonnet-4-5', color: 'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400' },
  { label: 'Fable 5', from: 'claude-fable-5', to: 'claude-fable-5', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400' },
  { label: 'Sonnet→Sonnet', from: 'claude-sonnet-*', to: 'claude-sonnet-4-5', color: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:text-indigo-400' },
  { label: 'Opus→Opus', from: 'claude-opus-*', to: 'claude-opus-4-6-thinking', color: 'bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900/30 dark:text-purple-400' },
  { label: 'Haiku→Sonnet', from: 'claude-haiku-*', to: 'claude-sonnet-4-5', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400' },
  { label: 'Sonnet4→4.6', from: 'claude-sonnet-4-20250514', to: 'claude-sonnet-4-6', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' },
  { label: 'Sonnet4.5→4.6', from: 'claude-sonnet-4-5-20250929', to: 'claude-sonnet-4-6', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: 'Sonnet3.5→4.6', from: 'claude-3-5-sonnet-20241022', to: 'claude-sonnet-4-6', color: 'bg-teal-100 text-teal-700 hover:bg-teal-200 dark:bg-teal-900/30 dark:text-teal-400' },
  { label: 'Opus4.5→4.6', from: 'claude-opus-4-5-20251101', to: 'claude-opus-4-6-thinking', color: 'bg-violet-100 text-violet-700 hover:bg-violet-200 dark:bg-violet-900/30 dark:text-violet-400' },
  // English-only note removed during locale cleanup
  { label: '3-Pro-Preview→3.1-Pro-High', from: 'gemini-3-pro-preview', to: 'gemini-3.1-pro-high', color: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:bg-amber-900/30 dark:text-amber-400' },
  { label: '3-Pro-High→3.1-Pro-High', from: 'gemini-3-pro-high', to: 'gemini-3.1-pro-high', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400' },
  { label: '3-Pro-Low→3.1-Pro-Low', from: 'gemini-3-pro-low', to: 'gemini-3.1-pro-low', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { label: '3.1-Pro-High passthrough', from: 'gemini-3.1-pro-high', to: 'gemini-3.1-pro-high', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400' },
  { label: '3.1-Pro-Low passthrough', from: 'gemini-3.1-pro-low', to: 'gemini-3.1-pro-low', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400' },
  // English-only note removed during locale cleanup
  { label: 'Gemini 3→Flash', from: 'gemini-3*', to: 'gemini-3-flash', color: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400' },
  { label: 'Gemini 2.5→Flash', from: 'gemini-2.5*', to: 'gemini-2.5-flash', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400' },
  { label: '2.5-Flash-Image passthrough', from: 'gemini-2.5-flash-image', to: 'gemini-2.5-flash-image', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' },
  { label: '3.1-Flash-Image passthrough', from: 'gemini-3.1-flash-image', to: 'gemini-3.1-flash-image', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' },
  { label: '3-Pro-Image→3.1', from: 'gemini-3-pro-image', to: 'gemini-3.1-flash-image', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200 dark:bg-sky-900/30 dark:text-sky-400' },
  { label: '3-Flash passthrough', from: 'gemini-3-flash', to: 'gemini-3-flash', color: 'bg-lime-100 text-lime-700 hover:bg-lime-200 dark:bg-lime-900/30 dark:text-lime-400' },
  { label: '2.5-Flash-Lite passthrough', from: 'gemini-2.5-flash-lite', to: 'gemini-2.5-flash-lite', color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' },
  // English-only note removed during locale cleanup
  { label: 'Sonnet 4.6', from: 'claude-sonnet-4-6', to: 'claude-sonnet-4-6', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: 'Sonnet 4.5', from: 'claude-sonnet-4-5', to: 'claude-sonnet-4-5', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: 'Opus 4.6', from: 'claude-opus-4-6', to: 'claude-opus-4-6-thinking', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Opus 4.6-thinking', from: 'claude-opus-4-6-thinking', to: 'claude-opus-4-6-thinking', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Opus 4.7', from: 'claude-opus-4-7', to: 'claude-opus-4-7', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Opus 4.8', from: 'claude-opus-4-8', to: 'claude-opus-4-8', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' }
]

// English-only note removed during locale cleanup
const bedrockPresetMappings = [
  { label: 'Fable 5', from: 'claude-fable-5', to: 'anthropic.claude-fable-5', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/30 dark:text-rose-400' },
  { label: 'Opus 4.6', from: 'claude-opus-4-6', to: 'us.anthropic.claude-opus-4-6-v1', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Opus 4.7', from: 'claude-opus-4-7', to: 'us.anthropic.claude-opus-4-7-v1', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Opus 4.8', from: 'claude-opus-4-8', to: 'us.anthropic.claude-opus-4-8-v1', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Sonnet 4.6', from: 'claude-sonnet-4-6', to: 'us.anthropic.claude-sonnet-4-6', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: 'Opus 4.5', from: 'claude-opus-4-5-thinking', to: 'us.anthropic.claude-opus-4-5-20251101-v1:0', color: 'bg-pink-100 text-pink-700 hover:bg-pink-200 dark:bg-pink-900/30 dark:text-pink-400' },
  { label: 'Sonnet 4.5', from: 'claude-sonnet-4-5', to: 'us.anthropic.claude-sonnet-4-5-20250929-v1:0', color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 dark:bg-cyan-900/30 dark:text-cyan-400' },
  { label: 'Haiku 4.5', from: 'claude-haiku-4-5', to: 'us.anthropic.claude-haiku-4-5-20251001-v1:0', color: 'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400' },
]

// English-only note removed during locale cleanup
// English-only note removed during locale cleanup
import { getAntigravityDefaultModelMapping } from '@/api/admin/accounts'

let _antigravityDefaultMappingsCache: { from: string; to: string }[] | null = null

export async function fetchAntigravityDefaultMappings(): Promise<{ from: string; to: string }[]> {
  if (_antigravityDefaultMappingsCache !== null) {
    return _antigravityDefaultMappingsCache
  }
  try {
    const mapping = await getAntigravityDefaultModelMapping()
    _antigravityDefaultMappingsCache = Object.entries(mapping).map(([from, to]) => ({ from, to }))
  } catch (e) {
    console.warn('[fetchAntigravityDefaultMappings] API failed, using empty fallback', e)
    _antigravityDefaultMappingsCache = []
  }
  return _antigravityDefaultMappingsCache
}

// =====================
// English-only note removed during locale cleanup
// =====================

export const commonErrorCodes = [
  { value: 401, label: 'Unauthorized' },
  { value: 403, label: 'Forbidden' },
  { value: 429, label: 'Rate Limit' },
  { value: 500, label: 'Server Error' },
  { value: 502, label: 'Bad Gateway' },
  { value: 503, label: 'Unavailable' },
  { value: 529, label: 'Overloaded' }
]

// =====================
// English-only note removed during locale cleanup
// =====================

// English-only note removed during locale cleanup
export function getModelsByPlatform(platform: string): string[] {
  switch (platform) {
    case 'openai': return openaiModels
    case 'anthropic':
    case 'claude': return claudeModels
    case 'gemini': return geminiModels
    case 'antigravity': return antigravityModels
    case 'zhipu': return zhipuModels
    case 'qwen': return qwenModels
    case 'deepseek': return deepseekModels
    case 'mistral': return mistralModels
    case 'meta': return metaModels
    case 'xai':
    case 'grok': return xaiModels
    case 'cohere': return cohereModels
    case 'yi': return yiModels
    case 'moonshot': return moonshotModels
    case 'doubao': return doubaoModels
    case 'minimax': return minimaxModels
    case 'baidu': return baiduModels
    case 'spark': return sparkModels
    case 'hunyuan': return hunyuanModels
    case 'perplexity': return perplexityModels
    default: return claudeModels
  }
}

// English-only note removed during locale cleanup
export function getPresetMappingsByPlatform(platform: string) {
  if (platform === 'openai') return openaiPresetMappings
  if (platform === 'gemini') return geminiPresetMappings
  if (platform === 'grok' || platform === 'xai') return grokPresetMappings
  if (platform === 'antigravity') return antigravityPresetMappings
  if (platform === 'bedrock') return bedrockPresetMappings
  return anthropicPresetMappings
}

// =====================
// English-only note removed during locale cleanup
// =====================

// English-only note removed during locale cleanup
// English-only note removed during locale cleanup
export function isValidWildcardPattern(pattern: string): boolean {
  const starIndex = pattern.indexOf('*')
  if (starIndex === -1) return true // English-only note removed during locale cleanup
  // English-only note removed during locale cleanup
  return starIndex === pattern.length - 1 && pattern.lastIndexOf('*') === starIndex
}

export type ModelRestrictionMode = 'whitelist' | 'mapping' | 'combined'

export interface ModelMappingEntry {
  from: string
  to: string
}

export function splitModelMappingObject(
  modelMapping?: Record<string, unknown> | null
): { allowedModels: string[]; modelMappings: ModelMappingEntry[] } {
  const allowedModels: string[] = []
  const modelMappings: ModelMappingEntry[] = []

  if (!modelMapping || typeof modelMapping !== 'object') {
    return { allowedModels, modelMappings }
  }

  for (const [rawFrom, rawTo] of Object.entries(modelMapping)) {
    if (typeof rawTo !== 'string') continue
    const from = rawFrom.trim()
    const to = rawTo.trim()
    if (!from || !to) continue

    if (from === to) {
      allowedModels.push(from)
    } else {
      modelMappings.push({ from, to })
    }
  }

  return { allowedModels, modelMappings }
}

export function buildModelMappingObject(
  mode: ModelRestrictionMode,
  allowedModels: string[],
  modelMappings: ModelMappingEntry[]
): Record<string, string> | null {
  const mapping: Record<string, string> = {}

  if (mode === 'whitelist' || mode === 'combined') {
    for (const model of allowedModels) {
      const normalizedModel = model.trim()
      if (!normalizedModel) continue
      // English-only note removed during locale cleanup
      // English-only note removed during locale cleanup
      // English-only note removed during locale cleanup
      if (!normalizedModel.includes('*')) {
        mapping[normalizedModel] = normalizedModel
      }
    }
  }

  if (mode === 'mapping' || mode === 'combined') {
    for (const m of modelMappings) {
      const from = m.from.trim()
      const to = m.to.trim()
      if (!from || !to) continue
      // English-only note removed during locale cleanup
      if (!isValidWildcardPattern(from)) {
        console.warn(`[buildModelMappingObject] Invalid wildcard pattern, skipped: ${from}`)
        continue
      }
      // English-only note removed during locale cleanup
      if (to.includes('*')) {
        console.warn(`[buildModelMappingObject] Target model cannot contain wildcards, skipped: ${from} -> ${to}`)
        continue
      }
      mapping[from] = to
    }
  }

  return Object.keys(mapping).length > 0 ? mapping : null
}
