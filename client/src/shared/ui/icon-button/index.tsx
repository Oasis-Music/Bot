import React from 'react'
import clsx from 'clsx'
import { Loader } from '@/shared/ui/loader'

import styles from './iconButton.module.scss'

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
      {loading ? <Loader dark={darkLoader} /> : <div className={styles.inner}>{children}</div>}
    </button>
  )
}
