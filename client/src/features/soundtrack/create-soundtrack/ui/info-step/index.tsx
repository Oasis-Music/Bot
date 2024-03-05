import Button from '@/shared/ui/button'
import blushEmoji from '@/assets/rastr/blush.png'
import { TextInput } from '@/shared/ui/text-input'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RedirectButton } from '../common/redirect-button'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router-dom'

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
    formState: { isDirty, errors }
  } = useFormContext<FieldData>()

  console.log('e', errors)

  const navigate = useNavigate()

  // const handleContinueClick = async () => {
  //   if (errors.title || errors.author) return
  //   console.log(Boolean(errors.title || errors.author))

  //   // onNextStep()
  // }

  const handlePageLeave = () => {
    if (isDirty) {
      onAlert()
      return
    }

    navigate(ROUTER_NAMES.root)
  }

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
        // type="submit"
        disabled={!!(errors.title || errors.author)}
        color="secondary"
        onClick={onNextStep}
        className={styles.nextButton}
      >
        {t('pages.upload.info.nextBotton')}
      </Button>
      <RedirectButton onClick={handlePageLeave}>{t('pages.upload.info.link')}</RedirectButton>
    </div>
  )
}
