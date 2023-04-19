import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDropzone, FileRejection } from 'react-dropzone'
import { ReactComponent as AudioPlaceholderIcon } from '../../../../assets/svg/audio_placeholder.svg'
import { ReactComponent as CheckIcon } from '../../../../assets/svg/check-circle.svg'
import { ContainerUpload, Plug, PlugIcon, PlugInfo, ErrorMessage } from './Dropzone.styled'
import { useTranslation } from 'react-i18next'
import AudioPlayer from '../../../../player'
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

const Dropzone: React.FC<DropzoneProps> = ({ audio, player, onStop, onSetAudio, onFormValue }) => {
  const { t } = useTranslation()

  const [dropError, setDropError] = useState<string>('')

  const fadeStyles = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: {
      opacity: dropError ? 1 : 0
    }
  })

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

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'audio/mpeg': ['.mp3']
    },
    maxSize: 10485760, // 10 MB
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  return (
    <>
      <ContainerUpload
        {...{
          isDragActive,
          isDragAccept,
          isDragReject
        }}
        {...getRootProps()}
        isError={dropError}
      >
        <input {...getInputProps()} />
        <Plug>
          <PlugIcon>{audio?.size ? <CheckIcon /> : <AudioPlaceholderIcon />}</PlugIcon>
          <PlugInfo>
            <p>{t('pages.upload.audio.dropzone.title')}</p>
            <ul>
              <li>
                {t('pages.upload.audio.dropzone.size', {
                  size: MAX_AUDIO_SIZE
                })}
              </li>
              <li>{t('pages.upload.audio.dropzone.ext')}</li>
            </ul>
          </PlugInfo>
        </Plug>
      </ContainerUpload>
      <animated.div style={fadeStyles}>
        <ErrorMessage>
          {t(dropError, {
            size: MAX_AUDIO_SIZE
          })}
        </ErrorMessage>
      </animated.div>
    </>
  )
}

export default Dropzone
