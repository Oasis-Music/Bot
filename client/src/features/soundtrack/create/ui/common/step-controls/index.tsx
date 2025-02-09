import { Icon } from '@/shared/ui/icon'
import { Button } from '@/shared/ui/button'
import { IconButton } from '@/shared/ui/icon-button'
import { RedirectButton } from '../redirect-button'
import { useTranslation } from 'react-i18next'

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

  return (
    <>
      <div className={styles.buttonWrapper}>
        <IconButton onClick={onBack} className={styles.backButton}>
          <Icon name="common/angle-arrow" className="text-[27px]" />
        </IconButton>
        <Button
          loading={loading}
          type={actionButtonType}
          tabIndex={-1}
          disabled={disabled}
          fullWidth
          onClick={onNext}
          className={styles.nextButton}
        >
          {nextText}
        </Button>
      </div>
      <RedirectButton onAlert={onAlert}>{t('pages.upload.shared.toMain')}</RedirectButton>
    </>
  )
}
