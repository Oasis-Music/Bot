import { ReactNode, useState, useEffect, useRef } from 'react'
import clsx from 'clsx'
import ArrowIcon from '@/shared/assets/svg/angle-arrow.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'

import styles from './styles.module.scss'

export type Option = {
  value: string
  title: string | ReactNode
}

export interface DropdownProps {
  options: Option[]
  placeholder?: string | ReactNode
  selected?: Option
  onClose?: () => void
  onChange?: (value: Option['value']) => void
}

export function Dropdown({ selected, placeholder, options, onClose, onChange }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState<Option | undefined>(selected)

  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        open && onClose?.()
        setOpen(false)
      }
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [open, onClose])

  const handleSelect = (option: Option) => {
    setCurrent({ ...option })
    onChange && onChange(option.value)
  }

  return (
    <div ref={rootRef} className={styles.dropdown} onClick={() => setOpen((v) => !v)}>
      <div className={styles.show}>
        {current?.title || <span className={styles.placeholder}>{placeholder}</span>}
      </div>
      {open && (
        <ul className={styles.list}>
          {options.map((option, ind) => (
            <li
              key={ind}
              className={clsx({
                [styles.option]: true,
                [styles.selected]: option.value === current?.value
              })}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
      <SvgIcon
        className={clsx({
          [styles.expandIcon]: true,
          [styles.collapsed]: open
        })}
      >
        <ArrowIcon />
      </SvgIcon>
    </div>
  )
}
