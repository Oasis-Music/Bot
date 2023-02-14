import i18n from 'i18next'
import Backend, { HttpBackendOptions } from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init<HttpBackendOptions>({
    debug: false,
    fallbackLng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    initImmediate: false,
    backend: {
      allowMultiLoading: false,
      loadPath: '/locales/{{lng}}/{{ns}}.json'
    }
  })

i18n.languages = ['en', 'ru']

export default i18n
