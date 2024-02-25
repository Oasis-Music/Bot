import React from 'react'
import { Loader } from '@/shared/ui/loader'

import styles from './Fallback.module.scss'

export function Fallback() {
  return (
    <div className={styles.container}>
      <Loader fallback />
    </div>
  )
}
