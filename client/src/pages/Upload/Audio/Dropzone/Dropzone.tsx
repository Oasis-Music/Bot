import React from 'react'
import { useDropzone } from 'react-dropzone'
import { ReactComponent as AudioPlaceholderIcon } from '../../../../assets/svg/audio_placeholder.svg'

import { ContainerUpload, Plug, PlugIcon, PlugInfo } from './Dropzone.styled'

interface DropzoneProps {
  audio: File | null
  wavesurfer: WaveSurfer | null
  onSetAudio(f: File): void
  onFormValue(f: File): void
}

const Dropzone: React.FC<DropzoneProps> = ({ audio, wavesurfer, onSetAudio, onFormValue }) => {
  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (audio) wavesurfer?.destroy()

    if (acceptedFiles.length) {
      const uploaded: unknown = acceptedFiles[0]
      const file = uploaded as File

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
      }

      // Read File as an ArrayBuffer
      reader.readAsArrayBuffer(file)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDropReject = (rejectedFiles: any) => {
    console.log(rejectedFiles)
    const { errors } = rejectedFiles[0]
    const { code } = errors[0]
    // code: "file-too-large"
    console.log(code)
    // TODO custom error on drop rejected
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
    <ContainerUpload
      {...{
        isDragActive,
        isDragAccept,
        isDragReject
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Plug>
        <PlugIcon>
          <AudioPlaceholderIcon />
        </PlugIcon>
        <PlugInfo>
          <p>Перетащи аудио сюда или нажмите на область</p>
          <ul>
            <li>Не более 8 mb</li>
            <li>MP3</li>
          </ul>
        </PlugInfo>
      </Plug>

      {isDragReject && <span>Типом файла может быть только: .mp3</span>}
    </ContainerUpload>
  )
}

export default Dropzone
