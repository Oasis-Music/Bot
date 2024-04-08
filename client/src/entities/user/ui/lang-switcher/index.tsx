import React from 'react'
import { useLang } from '../../hooks'
import styles from './styles.module.scss'

export function LangSwitcher() {
  const [language, changeLang] = useLang()

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLang(e.target.checked ? 'ru' : 'en')
  }

  return (
    <div className={styles.switch}>
      <input
        id="lng-switcher"
        type="checkbox"
        onChange={checkHandler}
        className={styles.input}
        defaultChecked={language !== 'en'}
      />
      <label htmlFor="lng-switcher" className={styles.label} />
    </div>
  )
}
