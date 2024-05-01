import { ChangeEvent } from 'react'
import clsx from 'clsx'
import { UseFormRegister, Path, FieldValues } from 'react-hook-form'

import styles from './styles.module.scss'

interface CheckboxProps<T extends FieldValues> {
  name: Path<T>
  value?: string
  label?: string
  register: UseFormRegister<T>
}

export function Checkbox<T extends FieldValues>({
  name,
  value,
  label,
  register
}: CheckboxProps<T>) {
  const { onChange, ...other } = register(name)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event)
  }

  return (
    <label className={styles.labelEL}>
      <input
        type="checkbox"
        onChange={handleChange}
        className={clsx('hide', styles.input)}
        value={value}
        {...other}
      />
      <span className={clsx(styles.uiEl)}>
        <svg width="14px" height="12px" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>
      {label && <span className={styles.label}>{label}</span>}
    </label>
  )
}
