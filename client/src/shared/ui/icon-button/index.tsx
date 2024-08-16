import { ReactNode, MouseEvent } from 'react'
import clsx from 'clsx'
import { Loader } from '@/shared/ui/loader'

import styles from './iconButton.module.scss'

interface IconButtonProps {
  type?: 'button' | 'reset' | 'submit'
  children: ReactNode
  loading?: boolean
  disabled?: boolean // TODO: disabled styles
  className?: string
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

export function IconButton({
  loading,
  children,
  type = 'button',
  className,
  ...otherProps
}: IconButtonProps) {
  return (
    <button type={type} className={clsx(className, styles.button)} {...otherProps}>
      {loading ? <Loader adaptive /> : <div className={styles.inner}>{children}</div>}
    </button>
  )
}
