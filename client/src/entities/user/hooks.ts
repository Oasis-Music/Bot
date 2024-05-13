import { useState, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import type { AvailableLang } from './model/types'

export const useLang = (): [AvailableLang, (language: AvailableLang) => void] => {
  const { i18n } = useTranslation()

  const { language, changeLanguage } = i18n

  const [lang, setLang] = useState<AvailableLang>(language as AvailableLang)

  const setCurrentLang = useCallback(
    (lng: AvailableLang) => {
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
