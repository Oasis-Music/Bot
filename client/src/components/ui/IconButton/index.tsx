import React from 'react'
import clsx from 'clsx'
import { ScaleLoader } from '@/components/ui/Loader'

import styles from './IconButton.module.scss'

interface IconButtonProps {
  type?: 'button' | 'reset' | 'submit'
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean // TODO: disabled styles
  darkLoader?: boolean
  className?: string
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

export function IconButton({
  loading,
  children,
  darkLoader,
  type = 'button',
  className,
  ...otherProps
}: IconButtonProps) {
  return (
    <button type={type} className={clsx(className, styles.button)} {...otherProps}>
      {loading ? <ScaleLoader dark={darkLoader} /> : <div className={styles.inner}>{children}</div>}
    </button>
  )
}
