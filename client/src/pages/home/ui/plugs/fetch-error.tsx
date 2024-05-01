import { useTranslation } from 'react-i18next'
import styles from './styles.module.scss'

export function ErrorPlug() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div>
          <h1>{t('pages.home.plugs.fetchErr.title')}</h1>
          <p>{t('pages.home.plugs.fetchErr.subtitle')}</p>
        </div>
      </div>
    </div>
  )
}
