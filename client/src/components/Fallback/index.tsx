import React from 'react'
import { ScaleLoader } from '@/components/ui/Loader'

import styles from './Fallback.module.scss'

export function Fallback() {
  return (
    <div className={styles.container}>
      <ScaleLoader fallback />
    </div>
  )
}
