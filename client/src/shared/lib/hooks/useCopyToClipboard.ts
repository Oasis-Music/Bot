import { useCallback, useState, useEffect } from 'react'

export type CopiedValue = string | null
export type CopyFn = (text: string) => Promise<void>

export const useCopyToClipboard = (): [CopiedValue, CopyFn] => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  useEffect(() => {
    const t = setTimeout(() => {
      if (copiedText) setCopiedText(null)
    }, 3000)

    return () => {
      clearTimeout(t)
    }
  }, [copiedText])

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator.clipboard) {
      console.warn('Clipboard not supported')
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
    } catch (error) {
      console.warn('Copy failed', error)
      setCopiedText(null)
    }
  }, [])

  return [copiedText, copy]
}
