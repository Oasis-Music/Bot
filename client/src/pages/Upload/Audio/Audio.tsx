import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js'
import { useDropzone } from 'react-dropzone'
import Button from '../../../shared/Button'
import { timeFormater } from '../../../utils/helpers'
import { UploadWrapper, WaveWrapper } from './Audio.styled'
import { useFormikContext } from 'formik'

const Container = styled.div`
  /* background-color: #bf00ff; */
  height: 100vh;
`

interface AudioProps {
  onPrevStep(): void
}

const Audio: React.FC<AudioProps> = ({ onPrevStep }) => {
  const { setFieldValue, errors } = useFormikContext()
  const [mainPhoto, setMainPhoto] = useState<File | null>()

  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [loop, setLoop] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()

  useEffect(() => {
    const obj = WaveSurfer.create({
      mediaType: 'audio',
      container: '#waveformupload',
      barWidth: 2,
      barRadius: 4,
      cursorWidth: 1,
      backend: 'WebAudio',
      height: 30,
      progressColor: '#dbdbdb',
      waveColor: '#575763',
      cursorColor: 'transparent'
    })

    obj.on('ready', function () {
      setDuration(timeFormater(obj.getDuration()))
      setReadyForPlay(true)
      obj.play()
    })

    obj.on('audioprocess', function () {
      setCurrentTime(timeFormater(obj.getCurrentTime()))
    })

    setWavesurfer(obj)

    return () => {
      obj.destroy()
    }
  }, [])

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (mainPhoto) wavesurfer?.destroy()

    if (acceptedFiles.length) {
      const uploaded: unknown = acceptedFiles[0] // Type assertions
      const file = uploaded as File

      //   onMainPhotoUpload(file)
      setMainPhoto(file)

      const reader = new FileReader()

      reader.onload = function (evt) {
        // Create a Blob providing as first argument a typed array with the file buffer

        if (evt.target) {
          const r = evt.target.result as ArrayBuffer

          const blob = new window.Blob([new Uint8Array(r)])

          // Load the blob into Wavesurfer
          wavesurfer?.loadBlob(blob)

          setFieldValue('audiofile', file)
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
    <Container>
      <span>Audio</span>
      <UploadWrapper
        {...{
          isDragActive,
          isDragAccept,
          isDragReject
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />

        {isDragReject && <span>Типом файла может быть только: .mp3</span>}
      </UploadWrapper>
      <WaveWrapper>
        <div id="waveformupload" />
      </WaveWrapper>
      <Button type="submit" disableShadow fullWidth>
        Upload
      </Button>
      <Button disableShadow fullWidth onClick={onPrevStep}>
        Prev
      </Button>
    </Container>
  )
}

export default Audio
