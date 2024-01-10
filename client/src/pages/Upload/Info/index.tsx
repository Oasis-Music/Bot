import React, { useRef } from 'react'
import styled from 'styled-components'
import Button from '@/shared/Button'
import TextInput from '@/shared/FormFields/TextInput'
import blushEmoji from '@/assets/rastr/blush.png'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { BackLinkButton } from '../StepControls'
import history, { routeNames } from '@/utils/history'

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
  const { t } = useTranslation()
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
        <span>{t('pages.upload.info.title')}</span>
        <EmojiImg src={blushEmoji} alt={t('pages.upload.info.emojiAlt')} />
      </StepTitle>
      <Title>{t('pages.upload.info.subTitle')}</Title>
      <InputWrapper>
        <TextInput name="title" placeholder={t('pages.upload.info.titleField')} />
        <TextInput name="author" placeholder={t('pages.upload.info.authorField')} />
      </InputWrapper>
      <NextBotton
        ref={ref}
        disabled={!!(errors.title || errors.author)}
        color="secondary"
        onClick={handleContinueClick}
      >
        {t('pages.upload.info.nextBotton')}
      </NextBotton>
      <BackLinkButton onClick={handlePageLeave}>{t('pages.upload.info.link')}</BackLinkButton>
    </Container>
  )
}

export default Info
