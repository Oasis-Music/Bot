import { useState, useEffect } from 'react'
import { StepControls } from '../../common/step-controls'
import { useTranslation } from 'react-i18next'
import { BackButton } from '../../common/back-button'
import { CoverDropzone } from './dropzone'

interface CoverProps {
  onNextStep(): void
  onPrevStep(): void
  onAlert(): void
}

interface UploadedFile extends File {
  preview: string
}

export function Cover({ onNextStep, onPrevStep, onAlert }: CoverProps) {
  const { t } = useTranslation()

  const [coverFile, setCoverFile] = useState<UploadedFile | null>(null)
  const [dropError, setDropError] = useState<string | null>(null)

  useEffect(() => {
    const cleanupTimer = setTimeout(() => {
      if (dropError && !coverFile) {
        setDropError(null)
      }
    }, 2000)

    return () => {
      clearTimeout(cleanupTimer)

      if (coverFile) {
        URL.revokeObjectURL(coverFile.preview)
      }
    }
  }, [dropError])

  return (
    <div className="px-3 pt-6">
      <div className="mb-2 flex justify-between">
        <h2 className="flex items-center text-3xl font-medium">{t('pages.upload.cover.title')}</h2>
        <BackButton onClick={onPrevStep} />
      </div>
      <p className="text-gray-400">{t('pages.upload.cover.subTitle')}</p>
      <CoverDropzone
        coverFile={coverFile}
        dropError={dropError}
        onDropError={setDropError}
        onFileSet={setCoverFile}
      />
      <StepControls
        disabled={!!dropError}
        actionText={t(
          !!dropError || !coverFile ? 'pages.upload.cover.skip' : 'pages.upload.cover.continue'
        )}
        onActionClick={onNextStep}
        onAlert={onAlert}
      />
    </div>
  )
}
