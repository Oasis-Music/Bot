import { useTranslation } from 'react-i18next'
import { Modal } from '@/widgets/modal'

export function Alert({
  isOpen,
  onLeave,
  onStay
}: {
  isOpen: boolean
  onLeave(): void
  onStay(): void
}) {
  const { t } = useTranslation()

  return (
    <Modal
      open={isOpen}
      controlActionText={t('pages.upload.modals.alert.stay')}
      controlCloseText={t('pages.upload.modals.alert.exit')}
      onSubmit={onStay}
      onClose={onLeave}
    >
      <div className="pb-10 text-center">
        <h4 className="text-2xl text-gray-100">{t('pages.upload.modals.alert.title')}</h4>
        <p className="text-gray-400">{t('pages.upload.modals.alert.message')}</p>
      </div>
    </Modal>
  )
}
