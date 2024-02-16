import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { ScaleLoader } from '@/components/ui/Loader'

import styles from './Button.module.scss'

const enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  accept = 'accept',
  danger = 'danger'
}

interface BottonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  color?: keyof typeof ButtonColor
  children: React.ReactNode
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  withShadow?: boolean
  tabIndex?: number
  className?: string
  ref?: React.RefObject<HTMLButtonElement> | null
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

const Button: React.ForwardRefRenderFunction<HTMLButtonElement, BottonProps> = (
  {
    loading,
    children,
    color = ButtonColor.primary,
    withShadow = false,
    startIcon,
    endIcon,
    type = 'button',
    fullWidth,
    className,
    ...otherProps
  },
  ref
) => {
  let colorClass: string

  switch (color) {
    case ButtonColor.secondary:
      colorClass = styles.secondary
      break
    case ButtonColor.accept:
      colorClass = styles.accept
      break
    case ButtonColor.danger:
      colorClass = styles.danger
      break

    default:
      colorClass = styles.primary
      break
  }

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        {
          [styles.base]: true,
          [styles.fullWidth]: fullWidth,
          [styles.shadow]: withShadow
        },
        className,
        colorClass
      )}
      {...otherProps}
    >
      {!loading && startIcon}
      {loading ? (
        <div className={styles.loader}>
          <ScaleLoader dark={color !== ButtonColor.primary} />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
}

export default forwardRef(Button)
