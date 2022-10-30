import React, { useState } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDropzone, FileRejection } from 'react-dropzone'
import { ReactComponent as AudioPlaceholderIcon } from '../../../../assets/svg/audio_placeholder.svg'
import { ReactComponent as CheckIcon } from '../../../../assets/svg/check-circle.svg'

import { ContainerUpload, Plug, PlugIcon, PlugInfo, ErrorMessage } from './Dropzone.styled'

interface DropzoneProps {
  audio: File | null
  wavesurfer: WaveSurfer | null
  onStop(): void
  onSetAudio(f: File | null): void
  onFormValue(f: File): void
}

const MAX_AUDIO_SIZE = 10

function dropzoneCodeToMsg(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return '* тип файла только mp3'
    case 'file-too-large':
      return `* файл весит больше ${MAX_AUDIO_SIZE} mb`
    default:
      return '* что-то пошло не так'
  }
}

const Dropzone: React.FC<DropzoneProps> = ({
  audio,
  wavesurfer,
  onStop,
  onSetAudio,
  onFormValue
}) => {
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
      if (wavesurfer?.isPlaying) onStop()
      wavesurfer?.empty()
    }

    if (acceptedFiles.length) {
      if (dropError) setDropError('')
      const file = acceptedFiles[0] as File

      onSetAudio(file)

      const reader = new FileReader()

      reader.onload = function (evt) {
        if (evt.target) {
          if (wavesurfer) {
            const r = evt.target.result as ArrayBuffer

            const blob = new window.Blob([new Uint8Array(r)])
            wavesurfer.loadBlob(blob)
            onFormValue(file)
          }
        }
      }

      reader.onerror = function (evt) {
        console.error('An error ocurred reading the file: ', evt)
        setDropError('Ошибка чтения файла')
      }

      // Read File as an ArrayBuffer
      reader.readAsArrayBuffer(file)
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
            <p>Перетащи mp3 сюда или нажми на область</p>
            <ul>
              <li>Не более 10 MB</li>
              <li>Формат MP3</li>
            </ul>
          </PlugInfo>
        </Plug>
      </ContainerUpload>
      <animated.div style={fadeStyles}>
        <ErrorMessage>{dropError}</ErrorMessage>
      </animated.div>
    </>
  )
}

export default Dropzone
