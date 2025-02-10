import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { RedirectButton } from '../common/redirect-button'
import blushEmoji from '@/shared/assets/rastr/blush.png'
import type { InfoValues } from '../../model/validation-schema'

export function Info({ onNextStep, onAlert }: { onNextStep(): void; onAlert(): void }) {
  const { t } = useTranslation()

  const {
    formState: { errors }
  } = useFormContext<InfoValues>()

  return (
    <div className="px-3 pt-6">
      <h2 className="mb-2 flex items-center text-3xl font-medium">
        <span>{t('pages.upload.info.title')}</span>
        <img src={blushEmoji} alt={t('pages.upload.info.emojiAlt')} className="ml-1 w-8" />
      </h2>
      <p className="text-gray-400">{t('pages.upload.info.subTitle')}</p>
      <div className="mt-10 mb-5">
        <Input name="title" placeholder={t('pages.upload.info.titleField')} />
        <Input name="author" placeholder={t('pages.upload.info.authorField')} />
      </div>
      <div className="mb-4 flex justify-center">
        <Button disabled={!!(errors.title || errors.author)} onClick={onNextStep}>
          {t('pages.upload.info.nextButton')}
        </Button>
      </div>
      <RedirectButton onAlert={onAlert}>{t('pages.upload.info.link')}</RedirectButton>
    </div>
  )
}
