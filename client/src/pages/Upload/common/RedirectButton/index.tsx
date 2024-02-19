import React from 'react'
import Button from '@/components/ui/Button'

import styles from './RedirectButton.module.scss'

interface RedirectButtonProps {
  onClick(): void
  children: React.ReactNode
}

export function RedirectButton({ onClick, children }: RedirectButtonProps) {
  return (
    <Button onClick={onClick} className={styles.redirectButton}>
      {children}
    </Button>
  )
}
