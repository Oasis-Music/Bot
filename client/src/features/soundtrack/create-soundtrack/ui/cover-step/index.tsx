import { useState, useEffect, MouseEvent } from 'react'
import clsx from 'clsx'
import { SvgIcon } from '@/shared/ui/svg-icon'
import DeleteIcon from '@/shared/assets/svg/trash.svg?react'
import { StepControls } from '../common/step-controls'
import CoverPlaceholderIcon from '@/shared/assets/svg/cover_placeholder.svg?react'
import { useTranslation } from 'react-i18next'
import { useDropzone, FileRejection } from 'react-dropzone'
import { IconButton } from '@/shared/ui/icon-button'
import { useFormContext } from 'react-hook-form'

import styles from './styles.module.scss'

interface CoverProps {
  onNextStep(): void
  onPrevStep(): void
  onAlert(): void
}

interface containerStyles {
  isError: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

const getColor = (props: containerStyles) => {
  if (props.isDragReject) {
    return '#ff1744'
  }

  if (props.isDragAccept) {
    return '#00e676'
  }

  if (props.isError) {
    return '#ff1744'
  }
}

const MAX_COVER_SIZE = 700

interface UploadedFile extends File {
  preview: string
}

function dropzoneCodeToMsg(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return 'pages.upload.cover.errors.invalidType'
    case 'file-too-large':
      return 'pages.upload.cover.errors.tooLarge'
    default:
      return 'pages.upload.cover.errors.shared'
  }
}

export function Cover({ onNextStep, onPrevStep, onAlert }: CoverProps) {
  const { t } = useTranslation()

  const { setValue } = useFormContext()

  const [mainPhoto, setMainPhoto] = useState<UploadedFile>()
  const [dropError, setDropError] = useState<string>('')

  useEffect(() => {
    const cleanupTimer = setTimeout(() => {
      if (dropError && !mainPhoto) {
        setDropError('')
      }
    }, 2000)

    return () => {
      clearInterval(cleanupTimer)

      if (mainPhoto) {
        URL.revokeObjectURL(mainPhoto.preview)
      }
    }
  }, [dropError])

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (mainPhoto) URL.revokeObjectURL(mainPhoto.preview)

    if (acceptedFiles.length) {
      if (dropError) setDropError('')

      const file = acceptedFiles[0] as UploadedFile
      file.preview = URL.createObjectURL(file)

      const image = new Image()
      image.src = file.preview
      image.onload = () => {
        const w = image.width,
          h = image.height

        if (w !== h) {
          setDropError(t('pages.upload.cover.errors.dimensionEquals'))
          return
        }

        if (w > 1000) {
          setDropError(t('pages.upload.cover.errors.dimensionMax'))
        }
      }

      setMainPhoto(file)
      setValue('coverImage', file)
    }
  }

  const handleDropReject = (fileRejections: FileRejection[]) => {
    const { errors } = fileRejections[0]
    const { code } = errors[0]
    setDropError(dropzoneCodeToMsg(code))
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg']
    },
    maxSize: 716800,
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  const handleRemoveClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    setDropError('')

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(mainPhoto!.preview)
    setMainPhoto(undefined)
    setValue('coverImage', null)
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.stepTitle}>{t('pages.upload.cover.title')}</h2>
      <p className={styles.subTitle}>{t('pages.upload.cover.subTitle')}</p>
      <div
        {...getRootProps()}
        className={styles.dropzone}
        style={{
          borderStyle: mainPhoto?.size ? 'solid' : 'dashed',
          borderColor: getColor({
            isDragAccept,
            isDragReject,
            isError: !!dropError
          })
        }}
      >
        <input {...getInputProps()} />
        {mainPhoto ? (
          <img
            src={mainPhoto.preview}
            alt={t('pages.upload.cover.previewAlt')}
            onLoad={() => URL.revokeObjectURL(mainPhoto.preview)}
            className={styles.preview}
          />
        ) : (
          <div className={styles.plug}>
            <SvgIcon className={styles.plugIcon}>
              <CoverPlaceholderIcon />
            </SvgIcon>
            <div className={styles.plugInfo}>
              <p>{t('pages.upload.cover.dropzone.title')}</p>
              <ul>
                <li>
                  {t('pages.upload.cover.dropzone.size', {
                    size: MAX_COVER_SIZE
                  })}
                </li>
                <li>{t('pages.upload.cover.dropzone.ext')}</li>
                <li>{t('pages.upload.cover.dropzone.dimension')}</li>
              </ul>
            </div>
          </div>
        )}
        {mainPhoto && (
          <IconButton onClick={handleRemoveClick} className={styles.deleteButton}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </IconButton>
        )}
      </div>
      <p className={clsx(styles.errorMessage, !!dropError && styles.showError)}>
        {t(dropError, {
          size: MAX_COVER_SIZE
        })}
      </p>
      <StepControls
        disabled={!!dropError}
        nextText={t(
          !!dropError || !mainPhoto ? 'pages.upload.cover.skip' : 'pages.upload.cover.continue'
        )}
        onBack={onPrevStep}
        onNext={onNextStep}
        onAlert={onAlert}
      />
    </div>
  )
}
