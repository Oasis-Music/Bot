import { useContext, Context } from 'react'

export function useStrictContext<T>(context: Context<T | null>) {
  const value = useContext(context)

  if (value === null) throw new Error('strict context not provided')
  return value as T
}
