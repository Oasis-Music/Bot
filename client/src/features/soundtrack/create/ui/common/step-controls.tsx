import { Button } from '@/shared/ui/button'
import { RedirectButton } from './redirect-button'
import { useTranslation } from 'react-i18next'

export interface StepControlsProps {
  disabled: boolean
  actionText: string
  loading?: boolean
  actionButtonType?: 'button' | 'submit'
  onActionClick?(): void
  onAlert(): void
}

export function StepControls({
  actionText,
  loading,
  disabled,
  actionButtonType = 'button',
  onActionClick,
  onAlert
}: StepControlsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col items-center">
      <Button
        loading={loading}
        type={actionButtonType}
        disabled={disabled}
        onClick={onActionClick}
        fullWidth
        className="mb-2 max-w-56"
      >
        {actionText}
      </Button>
      <RedirectButton onAlert={onAlert}>{t('pages.upload.shared.toMain')}</RedirectButton>
    </div>
  )
}
