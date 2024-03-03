import { ReactiveVar, makeVar } from '@apollo/client'
import type { SnackbarEvent } from '@/shared/lib/snackbar'

export const isSnackbarOpenVar = makeVar(false)

export const snackbarEventVar = makeVar<SnackbarEvent>({
  type: 'success',
  message: ''
})

export const SnackbarStore = {
  openSnackbar: openSnackbar(isSnackbarOpenVar, snackbarEventVar),
  closeSnackbar: closeSnackbar(isSnackbarOpenVar, snackbarEventVar)
}

function openSnackbar(
  isSnackbarOpenVar: ReactiveVar<boolean>,
  snackbarEventVar: ReactiveVar<SnackbarEvent>
): (e: SnackbarEvent) => void {
  return (newEvent) => {
    isSnackbarOpenVar(true)
    snackbarEventVar({ ...newEvent })
  }
}

function closeSnackbar(
  isSnackbarOpenVar: ReactiveVar<boolean>,
  snackbarEventVar: ReactiveVar<SnackbarEvent>
): (delay?: number) => void {
  return (delay) => {
    isSnackbarOpenVar(false)

    const timeoutDelay = delay ? delay : 205

    setTimeout(() => {
      snackbarEventVar({
        message: '',
        type: 'success'
      })
    }, timeoutDelay)
  }
}
