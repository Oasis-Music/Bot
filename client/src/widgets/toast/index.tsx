import { Toaster } from 'sonner'
import { SvgIcon } from '@/shared/ui/svg-icon'
import CheckIcon from '@/shared/assets/svg/check-circle.svg?react'
import TimesIcon from '@/shared/assets/svg/times-circle.svg?react'

import styles from './styles.module.scss'

export function Toast() {
  return (
    <Toaster
      position="bottom-center"
      visibleToasts={2}
      icons={{
        error: (
          <SvgIcon>
            <TimesIcon />
          </SvgIcon>
        ),
        success: (
          <SvgIcon>
            <CheckIcon />
          </SvgIcon>
        )
      }}
      toastOptions={{
        unstyled: false,
        classNames: {
          error: styles.errorToast,
          success: styles.successToast
        }
      }}
    />
  )
}
