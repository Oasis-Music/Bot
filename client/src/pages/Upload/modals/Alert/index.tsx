import React from 'react'
import Modal from 'styled-react-modal'
import Button from '@/components/ui/Button'
import { useTranslation } from 'react-i18next'
import { ITheme } from '@/utils/theme'

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
    <StyledModal isOpen={isOpen}>
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
    </StyledModal>
  )
}

interface styledReactModalProps {
  theme: ITheme
}

const StyledModal = Modal.styled`
  width: 70vh;
  padding-bottom: 5vh;
  color: #fff;
  border-radius: 10px;
  background-color:#343434;
  transition : all 0.3s ease-in-out;
  @media ${(props: styledReactModalProps) => props.theme.media.hsm} {
    width: 90%;
  }
`
