import React from 'react'
import styled from 'styled-components'
import SvgIcon from '../../shared/SvgIcon'
import Button from '../../shared/Button'
import IconButton from '../../shared/IconButton'
import { ReactComponent as ArrowIcon } from '../../assets/svg/angle-arrow.svg'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import history, { routeNames } from '../../utils/history'

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

const StepControls: React.FC<StepControlsProps> = ({
  nextText,
  loading,
  disabled,
  actionButtonType = 'button',
  onBack,
  onNext,
  onAlert
}) => {
  const { t } = useTranslation()

  const { dirty, submitCount } = useFormikContext()

  const handleLinkButtonClick = () => {
    if (dirty && submitCount === 0) {
      onAlert()
      return
    }

    history.push(routeNames.root)
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
          disableShadow
          disabled={disabled}
          fullWidth
          onClick={onNext}
        >
          {nextText}
        </NextButton>
      </ButtonWrapper>
      <BackLinkButton disableShadow onClick={handleLinkButtonClick}>
        {t('pages.upload.shared.toMain')}
      </BackLinkButton>
    </>
  )
}

export default StepControls
