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
import handv_img from '../../assets/rastr/hand-v.png'
import { Link } from 'react-router-dom'

const buttonText = 'Войти'

const Auth: React.FC = () => {
  const handleSubmitClick = () => {
    console.log('submit')
  }

  return (
    <Container>
      <MainBox>
        <HeadTitle>
          <span>Добро пожаловать</span>
          <EmojiImg src={handv_img} alt="смайлик - мир" />
        </HeadTitle>
        <SubmitBotton color="secondary" onClick={handleSubmitClick}>
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
