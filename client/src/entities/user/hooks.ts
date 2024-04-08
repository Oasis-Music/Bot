import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { LocalizationLang } from './model/types'

export const useLang = (): [LocalizationLang, (language: LocalizationLang) => void] => {
  const { i18n } = useTranslation()

  const { language, changeLanguage } = i18n

  const [lang, setLang] = useState<LocalizationLang>(language as LocalizationLang)

  const setCurrentLang = useCallback(
    (lng: LocalizationLang) => {
      changeLanguage(lng)
      setLang(lng)
      // If the user has changed the language at least once
      // it will be considered as preferred regardless of Telegram
      localStorage.setItem('lang', lng)
    },
    [changeLanguage]
  )

  return [lang, setCurrentLang]
}
