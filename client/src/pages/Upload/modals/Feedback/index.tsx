import React from 'react'
import sunglassesEmoji from '@/assets/rastr/tada.png'
import thinkingEmoji from '@/assets/rastr/thinking.png'
import Button from '@/components/ui/Button'
import { Modal } from '@/components/Modal'
import { useTranslation } from 'react-i18next'

import styles from './Feedback.module.scss'

interface FeedbackProps {
  isOpen: boolean
  type: 'success' | 'fail'
  onSubmit(): void
  onRetry(): void
}

export function Feedback({ type, isOpen, onSubmit, onRetry }: FeedbackProps) {
  const { t } = useTranslation()

  const handleActionClick = () => {
    if (type === 'success') {
      onSubmit()
    } else {
      onRetry()
    }
  }

  return (
    <Modal open={isOpen}>
      <div className={styles.container}>
        <img src={type === 'success' ? sunglassesEmoji : thinkingEmoji} className={styles.image} />
        <h4 className={styles.title}>
          {t(
            type === 'success'
              ? 'pages.upload.modals.feedback.successUpload'
              : 'pages.upload.modals.feedback.uploadFail'
          )}
        </h4>
        <Button
          fullWidth
          color="secondary"
          onClick={handleActionClick}
          className={styles.actionButton}
        >
          {t(
            type === 'success'
              ? 'pages.upload.modals.feedback.fine'
              : 'pages.upload.modals.feedback.close'
          )}
        </Button>
      </div>
    </Modal>
  )
}

// interface styledReactModalProps {
//   theme: ITheme
// }

// const StyledModal = Modal.styled`
//   width: 70vh;
//   aspect-ratio: 1 / 1;
//   color: #fff;
//   border-radius: 10px;
//   background-color:#343434;
//   transition : all 0.3s ease-in-out;
//   @media ${(props: styledReactModalProps) => props.theme.media.hsm} {
//     width: 90%;
//   }
// `
