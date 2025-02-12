import { cva } from 'cva'
import { ErrorMessage } from './error-message'
import { Path, FieldValues, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  type?: 'text' | 'password' | 'file' | 'number'
  label?: string
  disabled?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
}

const inpEl = cva(
  'mb-1 flex h-12 w-full rounded-md border bg-[#1c1c1e] px-3 py-2 text-base ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-400 focus-visible:border-gray-400 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-60',
  {
    variants: {
      error: {
        true: 'border-red-600',
        false: 'border-transparent'
      }
    }
  }
)

export function Input<T extends FieldValues>({
  name,
  label,
  type = 'text',
  autoComplete = 'off',
  ...restProps
}: InputProps<T>) {
  const { t } = useTranslation()

  const {
    register,
    formState: { errors }
  } = useFormContext()

  const isErr = !!(errors && errors[name])
  const message = isErr && t(errors[name]?.message as string)

  return (
    <div>
      {label && (
        <span className="mb-1 pl-1 text-[15px] font-medium text-gray-300 select-none">{label}</span>
      )}
      <input
        type={type}
        autoComplete={autoComplete}
        className={inpEl({ error: isErr })}
        {...register(name)}
        {...restProps}
      />
      <ErrorMessage show={isErr}>{message}</ErrorMessage>
    </div>
  )
}
