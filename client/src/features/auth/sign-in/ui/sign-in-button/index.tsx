import { useState } from 'react'
import clsx from 'clsx'
import { Button } from '@/shared/ui/button'
import { useSignIn } from '../../model'
import { useTranslation } from 'react-i18next'
import { useAuthQuery } from '../../api'
import type { AuthData } from '../../model/types'

import styles from './styles.module.scss'

export function SignInButton() {
  const { t } = useTranslation()
  const { signIn, setUser } = useSignIn()
  const [error, setError] = useState('')

  const [authorize, { loading }] = useAuthQuery<AuthData>({
    onSuccess(data) {
      const { accessToken } = data

      const tokenData = signIn(accessToken)
      if (!tokenData) {
        setError(t('errors.serverAccessErr'))
        return
      }

      setUser({
        id: tokenData.userId
      })
    },
    onError() {
      setError(t('errors.serverAccessErr'))
    }
  })

  const handleButtonClick = () => {
    setError('')
    authorize({
      initData: Telegram.WebApp.initData
    })
  }

  return (
    <>
      <Button glow loading={loading} onClick={handleButtonClick} className={styles.submitButton}>
        {t('pages.auth.enterBtn')}
      </Button>
      <p className={clsx(styles.errorMessage, !!error && styles.showError)}>{error}</p>
    </>
  )
}
