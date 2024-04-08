import { useState } from 'react'
import clsx from 'clsx'
import AudioPlayer from '@/player'
import CheckIcon from '@/shared/assets/svg/check-circle.svg?react'
import AudioPlaceholderIcon from '@/shared/assets/svg/audio_placeholder.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useDropzone, FileRejection } from 'react-dropzone'
import { useTranslation } from 'react-i18next'

import styles from './styles.module.scss'

interface DropzoneProps {
  audio: File | null
  player: AudioPlayer | undefined
  onStop(): void
  onSetAudio(f: File | null): void
  onFormValue(f: File): void
}

const MAX_AUDIO_SIZE = 10

function dropzoneCodeToMsg(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return 'pages.upload.audio.errors.invalidType'
    case 'file-too-large':
      return 'pages.upload.audio.errors.tooLarge'
    default:
      return 'pages.upload.audio.errors.shared'
  }
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

export function Dropzone({ audio, player, onStop, onSetAudio, onFormValue }: DropzoneProps) {
  const { t } = useTranslation()

  const [dropError, setDropError] = useState<string>('')

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (audio) {
      if (player?.isPlaying()) onStop()
    }

    if (acceptedFiles.length) {
      if (dropError) setDropError('')
      const file = acceptedFiles[0] as File
      onSetAudio(file)

      const reader = new FileReader()

      reader.onload = function (evt) {
        if (evt.target) {
          if (player) {
            const r = evt.target.result as string
            onFormValue(file)
            player.load(r)
          }
        }
      }

      reader.onerror = function (evt) {
        console.error('An error ocurred reading the file: ', evt)
        setDropError(t('pages.upload.audio.errors.read'))
      }

      reader.readAsDataURL(file)
    }
  }

  const handleDropReject = (fileRejections: FileRejection[]) => {
    console.log(fileRejections)
    const { errors } = fileRejections[0]
    console.log('e', errors)
    const { code } = errors[0]
    console.log(code)
    setDropError(dropzoneCodeToMsg(code))
    onSetAudio(null)
  }

  const { getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxSize: 15_728_640, // 15 MB
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  return (
    <>
      <div
        {...getRootProps()}
        className={styles.dropzone}
        style={{
          borderColor: getColor({
            isDragAccept,
            isDragReject,
            isError: !!dropError
          })
        }}
      >
        <input {...getInputProps()} />
        <div className={styles.plug}>
          <div className={styles.plugIconBox}>
            <SvgIcon className={styles.plugIcon}>
              {audio?.size ? <CheckIcon /> : <AudioPlaceholderIcon />}
            </SvgIcon>
          </div>
          <div className={styles.plugInfo}>
            <p>{t('pages.upload.audio.dropzone.title')}</p>
            <ul>
              <li>
                {t('pages.upload.audio.dropzone.size', {
                  size: MAX_AUDIO_SIZE
                })}
              </li>
              <li>{t('pages.upload.audio.dropzone.ext')}</li>
            </ul>
          </div>
        </div>
      </div>
      <p className={clsx(styles.errorMessage, !!dropError && styles.showError)}>
        {t(dropError, {
          size: MAX_AUDIO_SIZE
        })}
      </p>
    </>
  )
}
