import React, { useState, useEffect, useRef } from 'react'
import WaveSurfer from 'wavesurfer.js'
import SvgIcon from '../../../shared/SvgIcon'
import { ReactComponent as PlayIcon } from '../../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../../assets/svg/pause.svg'
import { timeFormater } from '../../../utils/helpers'
import {
  Container,
  Title,
  StepTitle,
  WaveWrapper,
  Waves,
  TimeBox,
  PlayBottonWrapper,
  PlayBotton
} from './Audio.styled'
import { useFormikContext } from 'formik'
import Dropzone from './Dropzone/Dropzone'
import StepControls from '../StepControls'

interface AudioProps {
  loading: boolean
  onPrevStep(): void
}

const Audio: React.FC<AudioProps> = ({ loading, onPrevStep }) => {
  const waveContainerRef = useRef(null)
  const wavesurfer = useRef<WaveSurfer | null>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const { setFieldValue } = useFormikContext()

  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [isPlay, setPlay] = useState<boolean>(false)
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
      })

      wavesurfer.current.on('audioprocess', function () {
        setCurrentTime(timeFormater(wavesurfer.current?.getCurrentTime() || 0))
      })

      wavesurfer.current.on('finish', function () {
        setPlay(false)
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

  const handleStopPlaying = () => {
    setPlay(false)
    setReadyForPlay(false)
    if (wavesurfer.current) {
      wavesurfer.current.pause()
    }
  }

  return (
    <Container>
      <StepTitle>Шаг #3</StepTitle>
      <Title>Добавь аудиофайл</Title>
      <Dropzone
        audio={audio}
        wavesurfer={wavesurfer.current}
        onStop={handleStopPlaying}
        onSetAudio={setAudio}
        onFormValue={handleSetAudioFormValue}
      />
      <WaveWrapper>
        <Waves $isFile={readyForPlay} ref={waveContainerRef} />
        <TimeBox>
          <span>{currentTime}</span>
          <span>{duration}</span>
        </TimeBox>
        <PlayBottonWrapper>
          <PlayBotton disabled={!readyForPlay} withoutShadow onClick={playHandler}>
            <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
          </PlayBotton>
        </PlayBottonWrapper>
      </WaveWrapper>
      <StepControls
        actionButtonType="submit"
        disabled={!readyForPlay}
        loading={loading}
        nextText="Загрузить"
        onBack={onPrevStep}
      />
    </Container>
  )
}

export default Audio
