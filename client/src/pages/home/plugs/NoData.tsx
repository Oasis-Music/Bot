import React from 'react'
import { useTranslation } from 'react-i18next'

import styles from './Styles.module.scss'

export function NoDataPlug() {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.noDataTextBox}>
          <h1>{t('pages.home.plugs.nodata.title')}</h1>
          <p>{t('pages.home.plugs.nodata.subtitle')}</p>
        </div>
      </div>
    </div>
  )
}
