import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js'
import Button from '../../../shared/Button'
import SvgIcon from '../../../shared/SvgIcon'
import { ReactComponent as PlayIcon } from '../../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../../assets/svg/pause.svg'
import { timeFormater } from '../../../utils/helpers'
import { WaveWrapper, PlayBotton } from './Audio.styled'
import { useFormikContext } from 'formik'

import Dropzone from './Dropzone/Dropzone'

const Container = styled.div``

interface AudioProps {
  onPrevStep(): void
}

const Audio: React.FC<AudioProps> = ({ onPrevStep }) => {
  const waveContainerRef = useRef(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const [audio, setAudio] = useState<File | null>(null)
  // const [wavesurfer, setWavesurfer] = useState<WaveSurfer>()
  const { setFieldValue } = useFormikContext()

  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [isPlay, setPlay] = useState<boolean>(false)
  const [loop, setLoop] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  useEffect(() => {
    if (waveContainerRef.current) {
      wavesurfer.current = WaveSurfer.create({
        mediaType: 'audio',
        container: waveContainerRef.current,
        barWidth: 2,
        barRadius: 4,
        cursorWidth: 1,
        backend: 'WebAudio',
        height: 30,
        progressColor: '#dbdbdb',
        waveColor: '#575763',
        cursorColor: 'transparent'
      })
    }

    if (wavesurfer.current) {
      wavesurfer.current.on('ready', function () {
        setDuration(timeFormater(wavesurfer.current?.getDuration() || 0))
        setReadyForPlay(true)
        // obj.play()
      })

      wavesurfer.current.on('audioprocess', function () {
        setCurrentTime(timeFormater(wavesurfer.current?.getCurrentTime() || 0))
      })
    }

    return () => {
      if (wavesurfer.current) {
        wavesurfer.current.destroy()
      }
    }
  }, [])

  const handleSetAudioFormValue = (file: File) => {
    setFieldValue('audiofile', file)
  }

  const playHandler = () => {
    setPlay((prev) => !prev)
    if (wavesurfer.current) {
      wavesurfer.current.playPause()
    }
  }

  return (
    <Container>
      <Dropzone
        audio={audio}
        wavesurfer={wavesurfer.current}
        onSetAudio={setAudio}
        onFormValue={handleSetAudioFormValue}
      />
      <WaveWrapper>
        <PlayBotton disabled={!readyForPlay} withoutShadow onClick={playHandler}>
          <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayBotton>
        <div ref={waveContainerRef} />
      </WaveWrapper>
      <Button type="submit" disabled={!readyForPlay} disableShadow fullWidth>
        Upload
      </Button>
      <Button disableShadow fullWidth onClick={onPrevStep}>
        Prev
      </Button>
    </Container>
  )
}

export default Audio