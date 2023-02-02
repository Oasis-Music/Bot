import React, { useState } from 'react'
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
import {
  AuthorizeUserQuery,
  AuthorizeUserQueryVariables,
  AuthorizeUserDocument
} from '../../graphql/user/_gen_/authorizeUser.query'
import { useSpring, animated } from 'react-spring'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import { UserMutations } from '../../apollo/cache/mutations'
import { isAuthenticatedVar } from '../../apollo/cache/variables'
import { Link, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import history, { routeNames } from '../../utils/history'
import handv_img from '../../assets/rastr/hand-v.png'

const Auth: React.FC = () => {
  const isAuth = useReactiveVar(isAuthenticatedVar)
  if (isAuth) {
    return <Navigate to={routeNames.root} />
  }

  const { t } = useTranslation()

  const [error, setError] = useState<string>('')

  const [authorize, { loading }] = useLazyQuery<AuthorizeUserQuery, AuthorizeUserQueryVariables>(
    AuthorizeUserDocument,
    {
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
    }
  )

  const fadeStyles = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: {
      opacity: error ? 1 : 0
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
        <animated.div style={fadeStyles}>
          <ErrorMessage>{error}</ErrorMessage>
        </animated.div>
        <TermsTitle>
          {t('pages.auth.terms')}
          <Link to={'#'}>{t('pages.auth.termsLink')}</Link>
          &nbsp;Oasis
        </TermsTitle>
        <ReportLink to={'#'}>{t('pages.auth.report')}</ReportLink>
      </MainBox>
    </Container>
  )
}

export default Auth
