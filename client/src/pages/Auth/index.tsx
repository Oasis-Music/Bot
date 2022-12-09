import React from 'react'
import {
  Container,
  MainBox,
  HeadTitle,
  EmojiImg,
  SubmitBotton,
  ReportLink,
  TermsTitle
} from './Auth.styled'
import {
  AuthorizeUserQuery,
  AuthorizeUserQueryVariables,
  AuthorizeUserDocument
} from '../../graphql/user/_gen_/authorizeUser.query'
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
        console.log(error)
      }
    }
  )

  const handleSubmitClick = () => {
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
