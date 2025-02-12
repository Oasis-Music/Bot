import { useState } from 'react'
import { md5 } from 'js-md5'
import { cva } from 'cva'
import { Icon } from '@/shared/ui/icon'
import { useDropzone, FileRejection } from 'react-dropzone'
import { useTranslation } from 'react-i18next'
import { ErrorMessage } from '@/shared/ui/error-message'
import AudioPlayer from '@/player'
import { dropzoneFeedbackColor } from '../../common/utils'

interface DropzoneProps {
  audio: File | null
  player: AudioPlayer | undefined
  onStop(): void
  onSetAudio(f: File | null): void
  onSetHash(hash: string): void
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

const mp3Icon = cva('text-[61px]', {
  variants: {
    state: {
      accepted: 'text-[#00e676]',
      default: 'text-gray-400'
    }
  }
})

export function Dropzone({
  audio,
  player,
  onStop,
  onSetAudio,
  onFormValue,
  onSetHash
}: DropzoneProps) {
  const { t } = useTranslation()

  const [dropError, setDropError] = useState<string | null>('')

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (audio) {
      if (player?.isPlaying()) onStop()
    }

    if (acceptedFiles.length) {
      if (dropError) setDropError(null)
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

      // for check

      const arrayBufferReader = new FileReader()

      arrayBufferReader.onload = function (evt) {
        if (evt.target) {
          const data = new Uint8Array(evt.target.result as ArrayBuffer)
          const audioHash = md5(data)
          onSetHash(audioHash)
        }
      }

      arrayBufferReader.readAsArrayBuffer(file)
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
        className="relative m-auto w-[96%] rounded-xl bg-[#1c1c1e] px-4 py-6"
      >
        <input {...getInputProps()} />
        <div className="flex items-center justify-around">
          <div className="flex basis-1/3 justify-center">
            <Icon
              name="other/file-mp3"
              className={mp3Icon({ state: audio?.size ? 'accepted' : 'default' })}
              style={{
                color: dropzoneFeedbackColor({
                  isDragAccept,
                  isDragReject,
                  isError: !!dropError
                })
              }}
            />
          </div>
          <div className="basis-2/3">
            <p className="mb-2 text-center">{t('pages.upload.audio.dropzone.title')}</p>
            <ul className="flex list-disc flex-col items-center text-sm text-gray-400">
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
      <div className="my-4">
        <ErrorMessage align="center" show={!!dropError}>
          {t(dropError as string, {
            size: MAX_AUDIO_SIZE
          })}
        </ErrorMessage>
      </div>
    </>
  )
}
