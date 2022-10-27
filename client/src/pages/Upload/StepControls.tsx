import React from 'react'
import styled from 'styled-components'
import SvgIcon from '../../shared/SvgIcon'
import Button from '../../shared/Button'
import IconButton from '../../shared/IconButton'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowIcon } from '../../assets/svg/angle-arrow.svg'

interface StepControlsProps {
  nextText: string
  disabled: boolean
  onBack(): void
  onNext?(): void
}

export const BackLink = styled(Link)`
  display: block;
  outline: none;
  color: #fff;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 10px;
  margin: 0 auto;
  margin-bottom: 15px;
  max-width: 390px;
`

export const BackButton = styled(IconButton)`
  font-size: 20px;
  border-radius: 0;
  padding: 10px;
  flex-basis: 30%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  & > div {
    transform: rotate(90deg);
  }
`

export const NextButton = styled(Button)`
  box-sizing: border-box;
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  flex-basis: 70%;
`

const StepControls: React.FC<StepControlsProps> = ({ nextText, disabled, onBack, onNext }) => {
  return (
    <>
      <ButtonWrapper>
        <BackButton onClick={onBack}>
          <SvgIcon>
            <ArrowIcon />
          </SvgIcon>
        </BackButton>
        <NextButton
          color="secondary"
          tabIndex={-1}
          disableShadow
          disabled={disabled}
          fullWidth
          onClick={onNext}
        >
          {nextText}
        </NextButton>
      </ButtonWrapper>
      <BackLink to={'/'}>На главную</BackLink>
    </>
  )
}

export default StepControls
