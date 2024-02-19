import React from 'react'
import clsx from 'clsx'
import styles from './SvgIcon.module.scss'

interface SvgIconProps {
  className?: string
  children: React.ReactNode
}

export function SvgIcon({ className, children }: SvgIconProps) {
  return <div className={clsx(className, styles.container)}>{children}</div>
}
