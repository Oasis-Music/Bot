import React from 'react'
import clsx from 'clsx'
import CheckIcon from '@/assets/svg/check-circle.svg?react'
import TimesIcon from '@/assets/svg/times-circle.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useReactiveVar } from '@apollo/client'
import { snackbarContext } from '@/shared/lib/snackbar'
import { SnackbarStore, isSnackbarOpenVar, snackbarEventVar } from '../model/store'

import styles from './snackbar.module.scss'

const NOTIFICATION_ICON = {
  success: CheckIcon,
  error: TimesIcon
}

export function Snackbar({ children }: { children: React.ReactNode }) {
  const isOpen = useReactiveVar(isSnackbarOpenVar)
  const event = useReactiveVar(snackbarEventVar)

  const { openSnackbar, closeSnackbar } = SnackbarStore

  // React.useEffect(() => {
  //   const t = setTimeout(() => {
  //     closeSnackbar()
  //   }, 5000)

  //   return () => {
  //     clearTimeout(t)
  //   }
  // }, [isOpen])

  const Icon = NOTIFICATION_ICON[event.type]

  const handleSnackbarClick = () => {
    closeSnackbar()
  }

  let iconStyleClass = styles.default

  switch (event.type) {
    case 'success':
      iconStyleClass = styles.success
      break
    case 'error':
      iconStyleClass = styles.error
      break
  }

  return (
    <snackbarContext.Provider
      value={{
        openSnackbar
      }}
    >
      {/*  */}
      {children}
      {/*  */}
      <div className={clsx(styles.container, isOpen && styles.open)} onClick={handleSnackbarClick}>
        <div>
          <div className={clsx(styles.iconWrapper, iconStyleClass)}>
            <SvgIcon className={styles.icon}>
              <Icon />
            </SvgIcon>
          </div>
        </div>
        <p>{event.message}</p>
      </div>
    </snackbarContext.Provider>
  )
}
