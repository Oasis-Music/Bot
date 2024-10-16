import { ReactNode } from 'react'
import clsx from 'clsx'
import styles from './svgIcon.module.scss'

interface SvgIconProps {
  className?: string
  children: ReactNode
}

export function SvgIcon({ className, children }: SvgIconProps) {
  return <div className={clsx(className, styles.container)}>{children}</div>
}
