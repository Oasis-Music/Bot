import { type MouseEvent } from 'react'
import { Icon } from '@/shared/ui/icon'
import { cva } from 'cva'
import { useTranslation } from 'react-i18next'
import { useDropzone } from 'react-dropzone'
import { IconButton } from '@/shared/ui/icon-button'
import { ErrorMessage } from '@/shared/ui/error-message'
import { useFormContext } from 'react-hook-form'
import { dropzoneFeedbackColor } from '../../common/utils'

import styles from './styles.module.css'

const MAX_COVER_SIZE = 700

const delButton = cva('absolute -top-5 -right-5', {
  variants: {
    show: {
      true: 'animate-in fade-in visible duration-200',
      false: 'invisible'
    }
  }
})

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

interface UploadedFile extends File {
  preview: string
}

export function CoverDropzone({
  coverFile,
  dropError,
  onDropError,
  onFileSet
}: {
  coverFile: UploadedFile | null
  dropError: string | null
  onDropError(err: null | string): void
  onFileSet(file: UploadedFile | null): void
}) {
  const { t } = useTranslation()

  const { setValue } = useFormContext()

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (coverFile) URL.revokeObjectURL(coverFile.preview)

    if (acceptedFiles.length) {
      if (dropError) onDropError(null)

      const file = acceptedFiles[0] as UploadedFile
      file.preview = URL.createObjectURL(file)

      const image = new Image()
      image.src = file.preview
      image.onload = () => {
        const w = image.width,
          h = image.height

        if (w !== h) {
          onDropError(t('pages.upload.cover.errors.dimensionEquals'))
          return
        }

        if (w > 1000) {
          onDropError(t('pages.upload.cover.errors.dimensionMax'))
        }
      }

      onFileSet(file)
      setValue('coverImage', file)
    }
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg'] // if ext != ".jpg" && ext != ".jpeg" && ext != ".png" {
    },
    maxSize: 716800,
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected(fileRejections) {
      const { errors } = fileRejections[0]
      const { code } = errors[0]
      onDropError(dropzoneCodeToMsg(code))
    }
  })

  const handleRemoveClick = (event: MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    onDropError(null)

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(coverFile!.preview)
    onFileSet(null)
    setValue('coverImage', null)
  }

  return (
    <>
      <div
        {...getRootProps()}
        className="relative m-auto mt-6 aspect-square w-[86%] rounded-xl border-2 border-gray-300"
        style={{
          borderStyle: coverFile?.size ? 'none' : 'dashed',
          borderColor: dropzoneFeedbackColor({
            isDragAccept,
            isDragReject,
            isError: !!dropError
          })
        }}
      >
        <input {...getInputProps()} />
        {coverFile ? (
          <img
            src={coverFile.preview}
            alt={t('pages.upload.cover.previewAlt')}
            onLoad={() => URL.revokeObjectURL(coverFile.preview)}
            className="size-full rounded-xl"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center">
            <div className={styles.animated} />
            <div className="">
              <p className="my-2 px-2 text-center text-gray-300">
                {t('pages.upload.cover.dropzone.title')}
              </p>
              <ul className="flex list-disc flex-col items-center text-sm text-gray-400">
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
        <div className={delButton({ show: !!coverFile })}>
          <IconButton onClick={handleRemoveClick} className="bg-white p-2.5! text-xl text-black">
            <Icon name="action/trash" />
          </IconButton>
        </div>
      </div>
      <div className="mt-4">
        <ErrorMessage align="center" show={!!dropError}>
          {t(dropError as string, {
            size: MAX_COVER_SIZE
          })}
        </ErrorMessage>
      </div>
    </>
  )
}
