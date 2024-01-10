import React, { useState, useEffect, useRef } from 'react'
import Dropzone from './Dropzone'
import SvgIcon from '@/shared/SvgIcon'
import StepControls from '../StepControls'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import Checkbox from '@/shared/FormFields/Checkbox'
import AudioPlayer from '@/player'
import { timeFormater } from '@/utils/helpers'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import {
  Container,
  Title,
  StepTitle,
  WaveWrapper,
  TimeBox,
  PlayBottonWrapper,
  PlayBotton,
  AttachWrapper
} from './Audio.styled'

interface AudioProps {
  loading: boolean
  onPrevStep(): void
  onAlert(): void
  onAttachChecked(v: boolean): void
}

const Audio: React.FC<AudioProps> = ({ loading, onPrevStep, onAlert, onAttachChecked }) => {
  const { t } = useTranslation()
  const waveContainerRef = useRef<HTMLDivElement>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const { setFieldValue } = useFormikContext()

  const [player, setPlayer] = useState<AudioPlayer>()

  const [readyForPlay, setReadyForPlay] = useState<boolean>(false)
  const [isPlay, setPlay] = useState<boolean>(false)
  const [currentTime, setCurrentTime] = useState<string>('0:00')
  const [duration, setDuration] = useState<string>('0:00')

  useEffect(() => {
    if (waveContainerRef.current) {
      const pl = new AudioPlayer({
        node: waveContainerRef.current as HTMLElement
      })

      pl.onLoad(() => {
        setReadyForPlay(true)
        setCurrentTime(timeFormater(pl.getCurrentTime()))
        setDuration(timeFormater(pl.getDuration()))
        pl.redrawTrackline()
      })

      pl.onAudioProcess(() => {
        setCurrentTime(timeFormater(pl.getCurrentTime()))
      })

      pl.onSeek(() => {
        setCurrentTime(timeFormater(pl.getCurrentTime()))
      })

      pl.onEnd(() => {
        pl.seekTo(0)
        pl.play()
      })

      setPlayer(pl)

      return () => {
        pl.clean()
      }
    }
  }, [])

  const handleSetAudioFormValue = (file: File) => {
    setFieldValue('audiofile', file)
  }

  const playHandler = () => {
    setPlay((prev) => !prev)
    if (player) {
      player.playPause()
    }
  }

  const handleStopPlaying = () => {
    setPlay(false)
    setReadyForPlay(false)
    if (player) {
      player.pause()
    }
  }

  const handleAttachCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAttachChecked(!!event.target.value)
  }

  return (
    <Container>
      <StepTitle>{t('pages.upload.audio.title')}</StepTitle>
      <Title>{t('pages.upload.audio.subTitle')}</Title>
      <Dropzone
        audio={audio}
        player={player}
        onStop={handleStopPlaying}
        onSetAudio={setAudio}
        onFormValue={handleSetAudioFormValue}
      />
      <WaveWrapper>
        <div ref={waveContainerRef} />
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
      <AttachWrapper>
        <Checkbox
          name="attach"
          onChange={handleAttachCheck}
          label={t('pages.upload.audio.attach')}
        />
      </AttachWrapper>
      <StepControls
        actionButtonType="submit"
        disabled={!readyForPlay}
        loading={loading}
        nextText={t('pages.upload.audio.upload')}
        onBack={onPrevStep}
        onAlert={onAlert}
      />
    </Container>
  )
}

export default Audio
