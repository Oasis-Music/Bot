import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReactiveVar } from '@apollo/client'
import { Link, Navigate } from 'react-router-dom'
import { UserMutations } from '@/apollo/cache/mutations'
import { isAuthenticatedVar } from '@/apollo/cache/variables'
import { useAuthorizeUserLazyQuery } from '@/graphql/user/_gen_/authorizeUser.query'
import history, { routeNames } from '@/utils/history'
import handv_img from '@/assets/rastr/hand-v.png'

import {
  Container,
  MainBox,
  HeadTitle,
  EmojiImg,
  SubmitBotton,
  ErrorMessage,
  ReportLink,
  TermsTitle
} from './Auth.styled'

export default function Auth() {
  const isAuth = useReactiveVar(isAuthenticatedVar)
  if (isAuth) {
    return <Navigate to={routeNames.root} />
  }

  const { t } = useTranslation()

  const [error, setError] = useState<string>('')

  const [authorize, { loading }] = useAuthorizeUserLazyQuery({
    onCompleted(data) {
      const ok = UserMutations.processAccessToken(data.authorizeUser.token)
      if (ok) {
        localStorage.setItem('rt', data.authorizeUser.refreshToken)
        history.push(routeNames.root)
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
    <Container>
      <MainBox>
        <HeadTitle>
          <span>{t('pages.auth.welcome')}</span>
          <EmojiImg src={handv_img} alt="смайлик - мир" />
        </HeadTitle>
        <SubmitBotton color="secondary" loading={loading} onClick={handleSubmitClick}>
          {t('pages.auth.enterBtn')}
        </SubmitBotton>
        <ErrorMessage $err={!!error}>{error}</ErrorMessage>
        <TermsTitle>
          {t('pages.auth.terms', {
            btn: t('pages.auth.enterBtn')
          })}
          <Link to={'#'}>{t('pages.auth.termsLink')}</Link>
          &nbsp;Oasis
        </TermsTitle>
        <ReportLink to={'#'}>{t('pages.auth.report')}</ReportLink>
      </MainBox>
    </Container>
  )
}
