import React from 'react'
import styled from 'styled-components'
import { SvgIcon } from '@/components/ui/SvgIcon'
import Button from '@/components/ui/Button'
import ArrowIcon from '@/assets/svg/angle-arrow.svg?react'
import { IconButton } from '@/components/ui/IconButton'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

interface StepControlsProps {
  disabled: boolean
  nextText: string
  loading?: boolean
  actionButtonType?: 'button' | 'submit'
  onBack(): void
  onNext?(): void
  onAlert(): void
}

export const BackLinkButton = styled(Button)`
  display: block;
  outline: none;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  margin: 0 auto;
  margin-bottom: 10px;
  text-decoration: underline;
  padding: 0;
  border: none;
  background: none;
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

export function StepControls({
  nextText,
  loading,
  disabled,
  actionButtonType = 'button',
  onBack,
  onNext,
  onAlert
}: StepControlsProps) {
  const { t } = useTranslation()

  const { dirty } = useFormikContext()

  const handleLinkButtonClick = () => {
    if (dirty) {
      onAlert()
    }
  }

  return (
    <>
      <ButtonWrapper>
        <BackButton onClick={onBack}>
          <SvgIcon>
            <ArrowIcon />
          </SvgIcon>
        </BackButton>
        <NextButton
          loading={loading}
          type={actionButtonType}
          color="secondary"
          tabIndex={-1}
          disabled={disabled}
          fullWidth
          onClick={onNext}
        >
          {nextText}
        </NextButton>
      </ButtonWrapper>
      <BackLinkButton onClick={handleLinkButtonClick}>
        {t('pages.upload.shared.toMain')}
      </BackLinkButton>
    </>
  )
}
