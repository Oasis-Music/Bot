import React, { useRef } from 'react'
import Button from '@/shared/ui/button'
import blushEmoji from '@/assets/rastr/blush.png'
import { TextInput } from '@/shared/ui/text-input'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import { RedirectButton } from '../common/RedirectButton'
import { routeNames } from '@/utils/history'
import { useNavigate } from 'react-router-dom'

import styles from './Info.module.scss'

interface InfoProps {
  onNextStep(): void
  onAlert(): void
}

interface FieldProps {
  title: string
  author: string
}

export function Info({ onNextStep, onAlert }: InfoProps) {
  const { t } = useTranslation()
  const { errors, dirty, submitCount } = useFormikContext<FieldProps>()
  const ref = useRef<HTMLButtonElement>(null)
  const navigate = useNavigate()

  const handleContinueClick = () => {
    if (ref.current) {
      ref.current.blur()
    }
    onNextStep()
  }

  const handlePageLeave = () => {
    if (dirty && submitCount === 0) {
      onAlert()
      return
    }

    navigate(routeNames.root)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.stepTitle}>
        <span>{t('pages.upload.info.title')}</span>
        <img src={blushEmoji} alt={t('pages.upload.info.emojiAlt')} className={styles.emojiImg} />
      </h2>
      <p className={styles.subTitle}>{t('pages.upload.info.subTitle')}</p>
      <div className={styles.inner}>
        <TextInput name="title" placeholder={t('pages.upload.info.titleField')} />
        <TextInput name="author" placeholder={t('pages.upload.info.authorField')} />
      </div>
      <Button
        ref={ref}
        disabled={!!(errors.title || errors.author)}
        color="secondary"
        onClick={handleContinueClick}
        className={styles.nextButton}
      >
        {t('pages.upload.info.nextBotton')}
      </Button>
      <RedirectButton onClick={handlePageLeave}>{t('pages.upload.info.link')}</RedirectButton>
    </div>
  )
}
