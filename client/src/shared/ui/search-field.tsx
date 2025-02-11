import { IconButton } from './icon-button'
import { Icon } from './icon'
import { Path, FieldValues, useFormContext } from 'react-hook-form'

export interface InputProps<T extends FieldValues> {
  name: Path<T>
  disabled?: boolean
  placeholder?: string
}

export function SearchField<T extends FieldValues>({ name, ...otherProps }: InputProps<T>) {
  const { register } = useFormContext()

  return (
    <div className="flex h-12 w-full">
      <input
        type="text"
        autoComplete="off"
        className="w-full rounded-l-xl bg-[#2c2c2e] px-3 py-2 pl-3 font-medium text-white ring-offset-white placeholder:text-gray-400 focus-visible:outline-hidden"
        {...register(name)}
        {...otherProps}
      />
      {/* todo: cross if value netered */}
      <IconButton type="submit" className="rounded-none rounded-r-xl bg-[#2c2c2e] pr-5">
        <Icon name="common/search" className="text-[23px] text-gray-300" />
      </IconButton>
    </div>
  )
}
