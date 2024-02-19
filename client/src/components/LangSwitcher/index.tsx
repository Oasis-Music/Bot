import React from 'react'
import { useLang } from '@/hooks'

import styles from './LangSwitcher.module.scss'

export function LangSwitcher() {
  const [lng, changeLang] = useLang()

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLang(e.target.checked ? 'ru' : 'en')
  }

  return (
    <div className={styles.switch}>
      <input
        id="lng-swithc"
        type="checkbox"
        onChange={checkHandler}
        className={styles.input}
        defaultChecked={lng === 'ru'}
      />
      <label htmlFor="lng-swithc" className={styles.label} />
    </div>
  )
}
