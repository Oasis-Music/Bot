import React from 'react'
import styled, { css } from 'styled-components'
import Modal from 'styled-react-modal'
import Button from '../../../shared/Button'
import { useTranslation } from 'react-i18next'
import { ITheme } from '../../../utils/theme'

interface AlertProps {
  isOpen: boolean
  onLeave(): void
  onStay(): void
}

interface styledReactModalProps {
  theme: ITheme
}

const StyledModal = Modal.styled`
  width: 70vh;
  padding-bottom: 5vh;
  color: #fff;
  border-radius: 10px;
  background-color:#343434;
  transition : all 0.3s ease-in-out;
  @media ${(props: styledReactModalProps) => props.theme.media.hsm} {
    width: 90%;
  }
`

const Title = styled.h4`
  font-size: 4.5vh;
  text-align: center;
  margin-bottom: 1vh;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 3.5vh;
  }
`

const SubTitle = styled.p`
  color: #ababab;
  font-size: 3vh;
  text-align: center;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 2vh;
  }
`

const Wrapper = styled.div`
  display: flex;
  margin-top: 5vh;
  padding: 0 10%;
`

const buttonStyles = css`
  display: block;
  margin: 0 auto;
  font-size: 3.5vh;
  padding: 2.5vh 3.5vh;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 2.7vh;
    padding: 2vh 3vh;
  }
`

export const StayButton = styled(Button)`
  ${buttonStyles}
`

export const LeaveButton = styled(Button)`
  ${buttonStyles}
  margin-right: 10%;
`

const Alert: React.FC<AlertProps> = ({ isOpen, onLeave, onStay }) => {
  const { t } = useTranslation()

  return (
    <StyledModal isOpen={isOpen}>
      <Title>{t('pages.upload.modals.alert.title')}</Title>
      <SubTitle>{t('pages.upload.modals.alert.message')}</SubTitle>
      <Wrapper>
        <LeaveButton onClick={onLeave}>{t('pages.upload.modals.alert.yes')}</LeaveButton>
        <StayButton fullWidth color="secondary" onClick={onStay}>
          {t('pages.upload.modals.alert.stay')}
        </StayButton>
      </Wrapper>
    </StyledModal>
  )
}

export default Alert
