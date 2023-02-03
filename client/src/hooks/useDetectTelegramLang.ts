import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

export const useDetectTelegramLang = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    try {
      const tgLang = Telegram.WebApp.initDataUnsafe.user?.language_code || 'en'

      if (['en', 'ru'].includes(tgLang)) {
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
