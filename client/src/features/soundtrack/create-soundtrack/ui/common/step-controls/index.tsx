import Button from '@/shared/ui/button'
import ArrowIcon from '@/assets/svg/angle-arrow.svg?react'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { RedirectButton } from '../redirect-button'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface StepControlsProps {
  disabled: boolean
  nextText: string
  loading?: boolean
  actionButtonType?: 'button' | 'submit'
  onBack(): void
  onNext?(): void
  onAlert(): void
}

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

  const {
    formState: { isDirty }
  } = useFormContext()

  const handleLinkButtonClick = () => {
    if (isDirty) {
      onAlert()
    }
  }

  return (
    <>
      <div className={styles.buttonWrapper}>
        <IconButton onClick={onBack} className={styles.backButton}>
          <SvgIcon>
            <ArrowIcon />
          </SvgIcon>
        </IconButton>
        <Button
          loading={loading}
          type={actionButtonType}
          color="secondary"
          tabIndex={-1}
          disabled={disabled}
          fullWidth
          onClick={onNext}
          className={styles.nextButton}
        >
          {nextText}
        </Button>
      </div>
      <RedirectButton onClick={handleLinkButtonClick}>
        {t('pages.upload.shared.toMain')}
      </RedirectButton>
    </>
  )
}
