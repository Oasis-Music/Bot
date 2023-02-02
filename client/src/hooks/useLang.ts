import { useState, useCallback } from 'react'

import { useTranslation } from 'react-i18next'

export const useLang = (): [string, (lng: string) => void] => {
  const { i18n } = useTranslation()

  const [lang, setLang] = useState(i18n.resolvedLanguage)

  const swithLangHandler = (lng: string) => {
    i18n.changeLanguage(lng)
    setLang(lng)
  }

  const setFallbackLng = useCallback((lng: string) => {
    swithLangHandler(lng)
  }, [])

  return [lang, setFallbackLng]
}
