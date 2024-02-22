import React, { useEffect } from 'react'
import clsx from 'clsx'
import CheckIcon from '@/assets/svg/check-circle.svg?react'
import TimesIcon from '@/assets/svg/times-circle.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useReactiveVar } from '@apollo/client'
import { UiMutations } from '@/apollo/cache/mutations'
import { isSnackbarOpenVar, snackbarEventVar } from '@/apollo/cache/variables'

import styles from './Snackbar.module.scss'

const NOTIFICATION_ICON = {
  success: CheckIcon,
  error: TimesIcon
}

export function Snackbar() {
  const isOpen = useReactiveVar(isSnackbarOpenVar)
  const event = useReactiveVar(snackbarEventVar)

  useEffect(() => {
    const t = setTimeout(() => {
      // UiMutations.closeSnackbar()
    }, 5000)

    return () => {
      clearTimeout(t)
    }
  }, [isOpen])

  const Icon = NOTIFICATION_ICON[event.type]

  const handleSnackbarClick = () => {
    UiMutations.closeSnackbar()
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
  )
}
