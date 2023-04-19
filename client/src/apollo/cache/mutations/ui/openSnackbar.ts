import { ReactiveVar } from '@apollo/client'
import type { snackbarEvent } from '../../types'
import closeSnackbar from './closeSnackbar'

export default (
  isSnackbarOpenVar: ReactiveVar<boolean>,
  snackbarEventVar: ReactiveVar<snackbarEvent>
): ((e: snackbarEvent) => void) => {
  return (newEvent: snackbarEvent): void => {
    isSnackbarOpenVar(true)
    snackbarEventVar({ ...newEvent })
  }
}
