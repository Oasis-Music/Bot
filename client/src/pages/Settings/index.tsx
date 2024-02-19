import React from 'react'
import { LangSwitcher } from '@/components/LangSwitcher'

import styles from './Settings.module.scss'

export default function Settings() {
  return (
    <div className={styles.container}>
      <LangSwitcher />
    </div>
  )
}
