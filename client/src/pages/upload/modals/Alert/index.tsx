import React from 'react'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/widgets/modal'

import styles from './Alert.module.scss'

interface AlertProps {
  isOpen: boolean
  onLeave(): void
  onStay(): void
}

export function Alert({ isOpen, onLeave, onStay }: AlertProps) {
  const { t } = useTranslation()

  return (
    <Modal
      open={isOpen}
      controlActionText={t('pages.upload.modals.alert.stay')}
      controlCloseText={t('pages.upload.modals.alert.yes')}
      onSubmit={onStay}
      onClose={onLeave}
    >
      <div className={styles.container}>
        <h4 className={styles.title}>{t('pages.upload.modals.alert.title')}</h4>
        <p className={styles.subTitle}>{t('pages.upload.modals.alert.message')}</p>
      </div>
    </Modal>
  )
}
