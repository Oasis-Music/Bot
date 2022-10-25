import React from 'react'
import styled from 'styled-components'
import Button from '../../../shared/Button'
import TextInput from '../../../shared/FormFields/TextInput'
import { useFormikContext } from 'formik'

const Container = styled.div`
  color: #fff;
  padding: 20px 10px 0 10px;
`

const StepTitle = styled.h2`
  margin: 0;
  margin-bottom: 30px;
  margin-left: 10px;
  text-align: start;
`

const Title = styled.p`
  color: #aaaaaa;
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
    display: block;
    margin: 0 auto;
  }
`

interface InfoProps {
  onNextStep(): void
}

const Info: React.FC<InfoProps> = ({ onNextStep }) => {
  const { isValid, errors } = useFormikContext()

  return (
    <Container>
      <StepTitle>Шаг #1</StepTitle>
      <Title>Добавить немного информации о треке</Title>
      <InputWrapper>
        <TextInput name="title" placeholder="Название" />
        <TextInput name="author" placeholder="Автор" />
      </InputWrapper>
      <NextBotton disabled={!isValid} color="secondary" disableShadow onClick={onNextStep}>
        Продолжить
      </NextBotton>
      <div color="white">{JSON.stringify(errors)}</div>
    </Container>
  )
}

export default Info
