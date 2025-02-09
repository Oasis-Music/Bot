import { Icon } from '@/shared/ui/icon'
import { useState, useEffect, useRef } from 'react'
import AudioPlayer from '@/player'
import { Dropzone } from './dropzone'
import { IconButton } from '@/shared/ui/icon-button'
import { StepControls } from '../common/step-controls'
import { Checkbox } from '@/shared/ui/checkbox'
import { timeFormater } from '@/shared/lib/helpers'
import { useTranslation } from 'react-i18next'
import { useFormContext } from 'react-hook-form'
import { CheckExistence } from '../common/check-existence'

import styles from './styles.module.scss'

interface AudioProps {
  loading: boolean
  onPrevStep(): void
  onAlert(): void
}

export function Audio({ loading, onPrevStep, onAlert }: AudioProps) {
  const { t } = useTranslation()
  const waveContainerRef = useRef<HTMLDivElement>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const [hash, setHash] = useState({
    hash: '',
    exists: false
  })

  const { setValue, register } = useFormContext()

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
    setValue('audioFile', file)
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

  const handleExistanceSet = (exists: boolean) => {
    setHash((prev) => ({ ...prev, exists }))
  }

  const handleHashSet = (hash: string) => {
    setHash((prev) => ({ ...prev, hash }))
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.stepTitle}>{t('pages.upload.audio.title')}</h2>
      <p className={styles.subTitle}>{t('pages.upload.audio.subTitle')}</p>
      <CheckExistence hash={hash.hash} setExistance={handleExistanceSet} />
      <Dropzone
        audio={audio}
        player={player}
        onSetHash={handleHashSet}
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
            <Icon name={`common/${isPlay ? 'pause' : 'play'}`} />
          </IconButton>
        </div>
      </div>
      <div className={styles.attach}>
        <Checkbox name="attach" label={t('pages.upload.audio.attach')} register={register} />
      </div>
      <StepControls
        actionButtonType="submit"
        disabled={!readyForPlay || hash.exists}
        loading={loading}
        nextText={t('pages.upload.audio.upload')}
        onBack={onPrevStep}
        onAlert={onAlert}
      />
    </div>
  )
}
