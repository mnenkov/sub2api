import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { i18n } from '@/i18n'

const { t } = i18n.global

/**
 * English-only note removed during locale cleanup.
 */
function isClipboardSupported(): boolean {
  return !!(navigator.clipboard && window.isSecureContext)
}

/**
 * English-only note removed during locale cleanup.
 * English-only note removed during locale cleanup.
 */
function fallbackCopy(text: string): boolean {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.cssText = 'position:fixed;left:-9999px;top:-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  try {
    return document.execCommand('copy')
  } finally {
    document.body.removeChild(textarea)
  }
}

export function useClipboard() {
  const appStore = useAppStore()
  const copied = ref(false)

  const copyToClipboard = async (
    text: string,
    successMessage?: string
  ): Promise<boolean> => {
    if (!text) return false

    let success = false

    if (isClipboardSupported()) {
      try {
        await navigator.clipboard.writeText(text)
        success = true
      } catch {
        success = fallbackCopy(text)
      }
    } else {
      success = fallbackCopy(text)
    }

    if (success) {
      copied.value = true
      appStore.showSuccess(successMessage || t('common.copiedToClipboard'))
      setTimeout(() => {
        copied.value = false
      }, 2000)
    } else {
      appStore.showError(t('common.copyFailed'))
    }

    return success
  }

  return { copied, copyToClipboard }
}
