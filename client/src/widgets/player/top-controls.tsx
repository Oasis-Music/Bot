import { cva } from 'cva'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { useTranslation } from 'react-i18next'

interface TopControlsProps {
  id: string
  onClose(): void
}

const control = cva('text-[22px] text-gray-400')

export function TopControls({ onClose }: TopControlsProps) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center justify-between px-1 pt-1">
      <IconButton onClick={onClose} className={control()}>
        <Icon name="common/angle-arrow" className="text-[27px]" />
      </IconButton>
      <span className="text-xl font-medium text-gray-300">{t('player.header')}</span>
      <IconButton className={control()}>
        <Icon name="common/list-music" />
      </IconButton>
    </div>
  )
}
