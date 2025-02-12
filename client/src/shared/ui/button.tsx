import { type ReactNode, type MouseEvent, type RefObject, forwardRef } from 'react'
import { cva } from 'cva'
import { Loader } from './loader'

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
  glow?: boolean
  children: ReactNode
  startIcon?: ReactNode
  endIcon?: ReactNode
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  tabIndex?: number
  ref?: RefObject<HTMLButtonElement> | null
  onClick?(event: MouseEvent<HTMLButtonElement>): void
  className?: string
}

const button = cva(
  'inline-flex items-center justify-center rounded-xl px-7 py-3 leading-none font-medium transition-all select-none disabled:pointer-events-none',
  {
    variants: {
      color: {
        primary: 'bg-white text-black active:bg-gray-300',
        secondary: 'bg-[#1c1c1e] text-gray-300',
        accept: 'bg-accept text-stone-800 active:bg-[#3dc975]',
        danger: 'bg-red-500 text-white active:bg-red-700' // todo: pick color
      },
      disabled: {
        true: 'cursor-not-allowed opacity-75'
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto'
      },
      glow: {
        true: 'shadow-white-glow'
      }
    },
    defaultVariants: {
      color: 'primary',
      fullWidth: false,
      glow: false
    },
    compoundVariants: [
      {
        color: 'accept',
        disabled: true,
        className: 'text-stone-600!'
      }
    ]
  }
)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    loading,
    children,
    color,
    glow,
    startIcon,
    endIcon,
    type = 'button',
    fullWidth,
    className,
    disabled,
    ...otherProps
  },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      className={button({ color, disabled, fullWidth, glow, class: className })}
      disabled={loading || disabled}
      {...otherProps}
    >
      {!loading && <div className="mr-1">{startIcon}</div>}
      {loading ? (
        <div className="flex size-[1lh] justify-center">
          <Loader adaptive />
        </div>
      ) : (
        <span>{children}</span>
      )}
      {!loading && <div className="ml-1">{endIcon}</div>}
    </button>
  )
})
