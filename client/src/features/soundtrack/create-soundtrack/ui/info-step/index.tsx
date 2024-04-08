import Button from '@/shared/ui/button'
import blushEmoji from '@/shared/assets/rastr/blush.png'
import { TextInput } from '@/shared/ui/text-input'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RedirectButton } from '../common/redirect-button'

import styles from './styles.module.scss'

interface InfoProps {
  onNextStep(): void
  onAlert(): void
}

interface FieldData {
  title: string
  author: string
}

export function Info({ onNextStep, onAlert }: InfoProps) {
  const { t } = useTranslation()

  const {
    register,
    formState: { errors }
  } = useFormContext<FieldData>()

  return (
    <div className={styles.container}>
      <h2 className={styles.stepTitle}>
        <span>{t('pages.upload.info.title')}</span>
        <img src={blushEmoji} alt={t('pages.upload.info.emojiAlt')} className={styles.emojiImg} />
      </h2>
      <p className={styles.subTitle}>{t('pages.upload.info.subTitle')}</p>
      <div className={styles.inner}>
        <TextInput
          name="title"
          errors={errors}
          register={register}
          placeholder={t('pages.upload.info.titleField')}
        />
        <TextInput
          name="author"
          errors={errors}
          register={register}
          placeholder={t('pages.upload.info.authorField')}
        />
      </div>
      <Button
        disabled={!!(errors.title || errors.author)}
        color="secondary"
        onClick={onNextStep}
        className={styles.nextButton}
      >
        {t('pages.upload.info.nextBotton')}
      </Button>
      <RedirectButton onAlert={onAlert}>{t('pages.upload.info.link')}</RedirectButton>
    </div>
  )
}
