import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export const useDetectLang = () => {
  const { i18n } = useTranslation()
  const localLang = localStorage.getItem('lang')

  function checkLang(lang: string): boolean {
    return lang === 'en' || lang === 'ru'
  }

  useEffect(() => {
    // the saved language is preferred and doesn't need to be overridden
    if (localLang) {
      if (checkLang(localLang)) {
        i18n.changeLanguage(localLang)
        return
      }
    }

    try {
      const tgLang = Telegram.WebApp.initDataUnsafe.user?.language_code || 'en'

      if (checkLang(tgLang)) {
        i18n.changeLanguage(tgLang)
        return
      }

      i18n.changeLanguage('en')
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
      }
    }
  }, [])
}
