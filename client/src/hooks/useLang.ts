import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

type availableLangs = 'en' | 'ru'

export const useLang = (): [availableLangs, (lng: availableLangs) => void] => {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  const swithLangHandler = (lng: string) => {
    i18n.changeLanguage(lng)
    setLang(lng)
    // If the user has changed the language at least once
    // it will be considered as preferred regardless of Telegram
    localStorage.setItem('lang', lng)
  }

  const setFallbackLng = useCallback((lng: availableLangs) => {
    swithLangHandler(lng)
  }, [])

  return [lang as availableLangs, setFallbackLng]
}
