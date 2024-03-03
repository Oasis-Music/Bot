import { createContext } from 'react'
import { useStrictContext } from './react'

export type SnackbarEvent = {
  type: 'error' | 'success'
  message: string
}

export type SnackBarContext = {
  openSnackbar: (e: SnackbarEvent) => void
}

export const snackbarContext = createContext<SnackBarContext | null>(null)

export const useSnackbar = () => {
  const { openSnackbar } = useStrictContext(snackbarContext)

  return openSnackbar
}
