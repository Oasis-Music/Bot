import { Input } from '@/shared/ui/input'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { StepControls } from '../common/step-controls'
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
      <StepControls
        disabled={!!(errors.title || errors.author)}
        actionText={t('pages.upload.info.nextButton')}
        onActionClick={onNextStep}
        onAlert={onAlert}
      />
    </div>
  )
}
