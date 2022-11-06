import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '../../../shared/Button'
import TextInput from '../../../shared/FormFields/TextInput'
import blushEmoji from '../../../assets/rastr/blush.png'
import { useFormikContext } from 'formik'
import { BackLinkButton } from '../StepControls'
import history, { routeNames } from '../../../utils/history'

interface InfoProps {
  onNextStep(): void
  onAlert(): void
}

const Container = styled.div`
  color: #fff;
  padding: 20px 10px 0 10px;
`

const StepTitle = styled.h2`
  margin: 0;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 10px;
  text-align: start;
`

const EmojiImg = styled.img`
  width: 30px;
  margin-left: 5px;
`

const Title = styled.p`
  color: #ababab;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 40px;
`

const InputWrapper = styled.div`
  padding: 0 5px;
  margin-bottom: 20px;
`

const NextBotton = styled(Button)`
  && {
    width: 100%;
    max-width: 210px;
    outline: none;
    display: block;
    margin: 0 auto;
    margin-bottom: 17px;
  }
`

interface FieldProps {
  title: string
  author: string
}

const Info: React.FC<InfoProps> = ({ onNextStep, onAlert }) => {
  const { errors, dirty, submitCount } = useFormikContext<FieldProps>()
  const ref = useRef<HTMLButtonElement>(null)

  const handleContinueClick = () => {
    if (ref.current) {
      ref.current.blur()
    }
    onNextStep()
  }

  const handlePageLeave = () => {
    if (dirty && submitCount === 0) {
      onAlert()
      return
    }

    history.push(routeNames.root)
  }

  return (
    <Container>
      <StepTitle>
        <span>Шаг #1</span>
        <EmojiImg src={blushEmoji} alt="смайлик -улыбка" />
      </StepTitle>
      <Title>Добавь немного информации о треке</Title>
      <InputWrapper>
        <TextInput name="title" placeholder="Название" />
        <TextInput name="author" placeholder="Автор" />
      </InputWrapper>
      <NextBotton
        ref={ref}
        disabled={!!(errors.title || errors.author)}
        color="secondary"
        disableShadow
        onClick={handleContinueClick}
      >
        Продолжить
      </NextBotton>
      <BackLinkButton onClick={handlePageLeave}>На главную</BackLinkButton>
    </Container>
  )
}

export default Info
