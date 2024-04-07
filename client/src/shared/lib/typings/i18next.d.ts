import 'i18next'

// WARN: author temp fix
// Seems for TypeScript users (in combination with react) it would be better to set the returnNull value to false by default.
// Issue: https://github.com/i18next/i18next/issues/1884

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false
  }
}
