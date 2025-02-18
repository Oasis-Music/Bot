import { cva } from 'cva'

const loader = cva('aspect-square animate-spin rounded-full border-solid border-r-transparent', {
  variants: {
    adaptive: {
      true: 'size-auto border-2',
      false: 'w-8 border-4'
    }
  },
  defaultVariants: {
    adaptive: false
  }
})

export interface LoaderProps {
  adaptive?: boolean
  className?: string
}

export function Loader({ adaptive, className }: LoaderProps) {
  return <div className={loader({ adaptive, className })} />
}
