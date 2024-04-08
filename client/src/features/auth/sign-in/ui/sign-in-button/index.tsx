import { useState } from 'react'
import clsx from 'clsx'
import Button from '@/shared/ui/button'
import { useSignIn } from '../../model'
import { useTranslation } from 'react-i18next'
import { useAuthorizeUserLazyQuery } from '../../api'

import styles from './styles.module.scss'

export function SignInButton() {
  const { t } = useTranslation()
  const { signIn, setUser } = useSignIn()

  const [error, setError] = useState('')

  const [authorize, { loading }] = useAuthorizeUserLazyQuery({
    onCompleted(data) {
      const { token, refreshToken } = data.authorizeUser

      const tokenData = signIn(token, refreshToken)
      if (!tokenData) {
        setError(t('errors.serverAccessErr'))
        return
      }

      setUser({
        id: tokenData.userId
      })

      console.log('-----', tokenData)
    },
    onError(error) {
      if (error.networkError) {
        setError(t('errors.serverAccessErr'))
        return
      }

      setError(t('errors.telegramUserDataErr'))
    }
  })

  const handleButtonClick = () => {
    setError('')
    authorize({
      variables: {
        initData: Telegram.WebApp.initData
      }
    })
  }

  return (
    <>
      <Button
        color="primary"
        loading={loading}
        onClick={handleButtonClick}
        className={styles.submitButton}
      >
        {t('pages.auth.enterBtn')}
      </Button>
      <p className={clsx(styles.errorMessage, !!error && styles.showError)}>{error}</p>
    </>
  )
}
