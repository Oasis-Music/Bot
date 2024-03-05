import React from 'react'
import Button from '@/shared/ui/button'
import styles from './styles.module.scss'

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
