import React from 'react'
import Button from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { Modal } from '@/components/Modal'

import styles from './Alert.module.scss'
import clsx from 'clsx'

interface AlertProps {
  isOpen: boolean
  onLeave(): void
  onStay(): void
}

export function Alert({ isOpen, onLeave, onStay }: AlertProps) {
  const { t } = useTranslation()

  return (
    <Modal open={isOpen}>
      <div className={styles.container}>
        <h4 className={styles.title}>{t('pages.upload.modals.alert.title')}</h4>
        <p className={styles.subTitle}>{t('pages.upload.modals.alert.message')}</p>
        <div className={styles.inner}>
          <Button onClick={onLeave} className={clsx(styles.actionButton, styles.leaveButton)}>
            {t('pages.upload.modals.alert.yes')}
          </Button>
          <Button fullWidth color="secondary" onClick={onStay} className={styles.actionButton}>
            {t('pages.upload.modals.alert.stay')}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
