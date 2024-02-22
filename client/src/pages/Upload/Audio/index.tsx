import React, { useState, useEffect, useRef } from 'react'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import AudioPlayer from '@/player'
import { Dropzone } from './Dropzone'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/components/ui/SvgIcon'
import { StepControls } from '../StepControls'
import { Checkbox } from '@/shared/ui/checkbox'
import { timeFormater } from '@/utils/helpers'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'

import styles from './Audio.module.scss'

interface AudioProps {
  loading: boolean
  onPrevStep(): void
  onAlert(): void
  onAttachChecked(v: boolean): void
}

export function Audio({ loading, onPrevStep, onAlert, onAttachChecked }: AudioProps) {
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
    <div className={styles.container}>
      <h2 className={styles.stepTitle}>{t('pages.upload.audio.title')}</h2>
      <p className={styles.subTitle}>{t('pages.upload.audio.subTitle')}</p>
      <Dropzone
        audio={audio}
        player={player}
        onStop={handleStopPlaying}
        onSetAudio={setAudio}
        onFormValue={handleSetAudioFormValue}
      />
      <div className={styles.waveWrapper}>
        <div ref={waveContainerRef} />
        <div className={styles.timings}>
          <span>{currentTime}</span>
          <span>{duration}</span>
        </div>
        <div className={styles.playButtonWrapper}>
          <IconButton disabled={!readyForPlay} onClick={playHandler} className={styles.playButton}>
            <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
          </IconButton>
        </div>
      </div>
      <div className={styles.attach}>
        <Checkbox
          name="attach"
          onChange={handleAttachCheck}
          label={t('pages.upload.audio.attach')}
        />
      </div>
      <StepControls
        actionButtonType="submit"
        disabled={!readyForPlay}
        loading={loading}
        nextText={t('pages.upload.audio.upload')}
        onBack={onPrevStep}
        onAlert={onAlert}
      />
    </div>
  )
}
