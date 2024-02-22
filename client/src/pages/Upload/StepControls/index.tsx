import React from 'react'
import Button from '@/shared/ui/button'
import ArrowIcon from '@/assets/svg/angle-arrow.svg?react'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/components/ui/SvgIcon'
import { RedirectButton } from '../common/RedirectButton'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import styles from './StepControls.module.scss'

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

  const { dirty } = useFormikContext()

  const handleLinkButtonClick = () => {
    if (dirty) {
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
