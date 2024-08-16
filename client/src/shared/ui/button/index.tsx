import { ReactNode, forwardRef, RefObject, MouseEvent } from 'react'
import clsx from 'clsx'
import { Loader } from '@/shared/ui/loader'

import styles from './styles.module.scss'

const enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  accept = 'accept',
  danger = 'danger'
}

interface ButtonProps {
  to?: string
  type?: 'button' | 'reset' | 'submit'
  color?: keyof typeof ButtonColor
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  glow?: boolean
  tabIndex?: number
  className?: string
  ref?: RefObject<HTMLButtonElement> | null
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    loading,
    children,
    color = ButtonColor.primary,
    glow = false,
    startIcon,
    endIcon,
    type = 'button',
    fullWidth,
    className,
    ...otherProps
  },
  ref
) {
  let colorClass = styles.primary

  switch (color) {
    case ButtonColor.primary:
      colorClass = clsx(colorClass, glow && styles.glow)
      break
    case ButtonColor.secondary:
      colorClass = styles.secondary
      break
    case ButtonColor.accept:
      colorClass = styles.accept
      break
    case ButtonColor.danger:
      colorClass = styles.danger
      break
  }

  return (
    <button
      ref={ref}
      type={type}
      className={clsx(
        {
          [styles.base]: true,
          [styles.fullWidth]: fullWidth
        },
        className,
        colorClass
      )}
      {...otherProps}
    >
      {!loading && startIcon}
      {loading ? (
        <div className={styles.loader}>
          <div className={styles.loader}>
            <Loader adaptive />
          </div>
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && endIcon}
    </button>
  )
})

// export default forwardRef(Button)
