import { cva } from 'cva'
import { Loader } from './loader'
import type { ReactNode, MouseEvent } from 'react'

export interface IconButtonProps {
  to?: string
  type?: 'button' | 'submit'
  children: ReactNode
  loading?: boolean
  disabled?: boolean // todo: disabled styles
  className?: string
  onClick?(event: MouseEvent<HTMLButtonElement>): void
}

const button = cva(
  'relative inline-flex flex-initial items-center justify-center overflow-visible rounded-full bg-transparent p-3 text-center align-middle no-underline outline-0 select-none'
)

export function IconButton({
  loading,
  children,
  className,
  onClick,
  type = 'button',
  ...otherProps
}: IconButtonProps) {
  return (
    <button className={button({ className })} onClick={onClick} type={type} {...otherProps}>
      {loading ? (
        <div className="size-1e flex justify-center">
          <Loader adaptive className="border-gray-300" />
        </div>
      ) : (
        <span className="flex w-full">{children}</span>
      )}
    </button>
  )
}
