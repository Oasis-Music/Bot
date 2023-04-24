import { ReactiveVar } from '@apollo/client'
import type { snackbarEvent } from '../../types'

export default (
  isSnackbarOpenVar: ReactiveVar<boolean>,
  snackbarEventVar: ReactiveVar<snackbarEvent>
): (() => void) => {
  return (delay?: number): void => {
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
