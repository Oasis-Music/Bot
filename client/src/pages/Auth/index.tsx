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
import history, { routeNames } from '../../utils/history'
import handv_img from '../../assets/rastr/hand-v.png'

const buttonText = 'Войти'

const Auth: React.FC = () => {
  const isAuth = useReactiveVar(isAuthenticatedVar)
  if (isAuth) {
    return <Navigate to={routeNames.root} />
  }

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
          setError('* сервер не доступен повторите попытку позже')
          return
        }
        setError('* ошибка данных пользователя Telegram ')
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
          <span>Добро пожаловать</span>
          <EmojiImg src={handv_img} alt="смайлик - мир" />
        </HeadTitle>
        <SubmitBotton color="secondary" loading={loading} onClick={handleSubmitClick}>
          {buttonText}
        </SubmitBotton>
        <animated.div style={fadeStyles}>
          <ErrorMessage>{error}</ErrorMessage>
        </animated.div>
        <TermsTitle>
          Нажав кнопку «{buttonText}», вы соглашаетесь с &nbsp;
          <Link to={'#'}>Условиями использования</Link>
          &nbsp;Oasis
        </TermsTitle>
        <ReportLink to={'#'}>Проблемы со входом?</ReportLink>
      </MainBox>
    </Container>
  )
}

export default Auth
