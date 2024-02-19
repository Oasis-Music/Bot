import React from 'react'
import clsx from 'clsx'
import { useField } from 'formik'

import styles from './TextInput.module.scss'

export interface TextInputProps {
  name: string
  type?: string
  rows?: number
  label?: string
  disabled?: boolean
  multiline?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
  hiddenLabel?: boolean
  hideErrorMessage?: boolean
  onChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

export function TextInput({
  autoComplete = 'off',
  hideErrorMessage = false,
  type = 'text',
  multiline = false,
  label,
  ...restProps
}: TextInputProps) {
  const [field, meta] = useField(restProps)

  const isErr = meta.touched && !!meta.error

  return (
    <div>
      {label && <span className={styles.label}>{label}</span>}
      {multiline ? (
        <textarea
          {...field}
          {...restProps}
          autoComplete={autoComplete}
          className={clsx(styles.multiline, isErr && styles.baseError)}
        />
      ) : (
        <input
          {...field}
          {...restProps}
          type={type}
          autoComplete={autoComplete}
          className={clsx(styles.base, isErr && styles.baseError)}
        />
      )}
      {!hideErrorMessage && (
        <p className={clsx(styles.errorMessage, isErr && styles.showMessage)}>
          {meta.touched && meta.error}
        </p>
      )}
    </div>
  )
}
