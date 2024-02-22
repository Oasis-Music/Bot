import React, { useState } from 'react'
import clsx from 'clsx'
import Button from '@/shared/ui/button'
import handv_img from '@/assets/rastr/hand-v.png'
import { useTranslation } from 'react-i18next'
import { Link, redirect } from 'react-router-dom'
import { UserMutations } from '@/apollo/cache/mutations'
import { useAuthorizeUserLazyQuery } from '@/graphql/user/_gen_/authorizeUser.query'
import { routeNames } from '@/utils/history'

import styles from './Auth.module.scss'

export default function Auth() {
  const { t } = useTranslation()

  const [error, setError] = useState<string>('')

  const [authorize, { loading }] = useAuthorizeUserLazyQuery({
    onCompleted(data) {
      const ok = UserMutations.processAccessToken(data.authorizeUser.token)
      if (ok) {
        localStorage.setItem('rt', data.authorizeUser.refreshToken)
        redirect(routeNames.root)
      }
    },
    onError(error) {
      if (error.networkError) {
        const msg = t('errors.serverAccessErr')
        setError(msg)
        return
      }

      const msg = t('errors.telegramUserDataErr')
      setError(msg)
    }
  })

  const handleSubmitClick = () => {
    setError('')
    authorize({
      variables: {
        initData: Telegram.WebApp.initData
      }
    })
  }

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        <h1 className={styles.title}>
          <span>{t('pages.auth.welcome')}</span>
          <img src={handv_img} alt="смайлик - мир" className={styles.emojiImg} />
        </h1>
        <Button
          color="secondary"
          loading={loading}
          onClick={handleSubmitClick}
          className={styles.submitButton}
        >
          {t('pages.auth.enterBtn')}
        </Button>
        <p className={clsx(styles.errorMessage, !!error && styles.showError)}>{error}</p>
        <p className={styles.terms}>
          {t('pages.auth.terms', {
            btn: t('pages.auth.enterBtn')
          })}
          <Link to={'#'}>{t('pages.auth.termsLink')}</Link>
          &nbsp;Oasis
        </p>
        <Link to={'#'} className={styles.report}>
          {t('pages.auth.report')}
        </Link>
      </div>
    </div>
  )
}
