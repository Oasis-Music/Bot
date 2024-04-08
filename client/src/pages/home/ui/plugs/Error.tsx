import thinkEmojiImage from '@/shared/assets/rastr/thinking.png'
import { useTranslation } from 'react-i18next'

import styles from './Styles.module.scss'

export function ErrorPlug() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <img src={thinkEmojiImage} className={styles.image} />
        <div>
          <h1>{t('pages.home.plugs.fetchErr.title')}</h1>
          <p>{t('pages.home.plugs.fetchErr.subtitle')}</p>
        </div>
      </div>
    </div>
  )
}
