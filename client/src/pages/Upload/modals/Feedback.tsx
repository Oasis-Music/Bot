import React from 'react'
import styled from 'styled-components'
import Modal from 'styled-react-modal'
import sunglassesEmoji from '@/assets/rastr/tada.png'
import thinkingEmoji from '@/assets/rastr/thinking.png'
import Button from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { ITheme } from '@/utils/theme'

interface FeedbackProps {
  isOpen: boolean
  type: 'success' | 'fail'
  onSubmit(): void
  onRetry(): void
}

const Image = styled.img`
  display: block;
  width: 37%;
  margin: 0 auto;
  margin-top: 7vh;
  @media ${({ theme }) => theme.media.hsm} {
    margin-top: 4vh;
  }
`

const Title = styled.h4`
  font-size: 4.5vh;
  text-align: center;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 3.5vh;
  }
`

export const ActionButton = styled(Button)`
  display: block;
  margin: 0 auto;
  max-width: 50%;
  font-size: 3.5vh;
  padding: 2.5vh 3.5vh;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 2.7vh;
    padding: 2vh 3vh;
  }
`

export function Feedback({ type, isOpen, onSubmit, onRetry }: FeedbackProps) {
  const { t } = useTranslation()

  const handleActionClick = () => {
    if (type === 'success') {
      onSubmit()
    } else {
      onRetry()
    }
  }

  return (
    <StyledModal isOpen={isOpen}>
      <Image src={type === 'success' ? sunglassesEmoji : thinkingEmoji} />
      <Title>
        {t(
          type === 'success'
            ? 'pages.upload.modals.feedback.successUpload'
            : 'pages.upload.modals.feedback.uploadFail'
        )}
      </Title>
      <ActionButton fullWidth color="secondary" onClick={handleActionClick}>
        {t(
          type === 'success'
            ? 'pages.upload.modals.feedback.fine'
            : 'pages.upload.modals.feedback.close'
        )}
      </ActionButton>
    </StyledModal>
  )
}

interface styledReactModalProps {
  theme: ITheme
}

const StyledModal = Modal.styled`
  width: 70vh;
  aspect-ratio: 1 / 1;
  color: #fff;
  border-radius: 10px;
  background-color:#343434;
  transition : all 0.3s ease-in-out;
  @media ${(props: styledReactModalProps) => props.theme.media.hsm} {
    width: 90%;
  }
`
