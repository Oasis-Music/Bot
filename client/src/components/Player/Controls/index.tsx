import React from 'react'
import clsx from 'clsx'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import ArrowAltIcon from '@/assets/svg/arrow-alt.svg?react'
import RepeatIcon from '@/assets/svg/repeat.svg?react'
import RandomIcon from '@/assets/svg/random.svg?react'
import { SvgIcon } from '@/components/ui/SvgIcon'
import { IconButton } from '@/shared/ui/icon-button'

import styles from './Controls.module.scss'

interface ControlsProps {
  isPlay: boolean
  readyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onPlayPause?(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
}

export function Controls({
  isPlay,
  withLoop,
  withRandom,
  readyForPlay,
  onPlayPause,
  onPlayNext,
  onPlayPrev,
  onLoop,
  onRandom
}: ControlsProps) {
  return (
    <div className={styles.container}>
      <IconButton
        onClick={onRandom}
        className={clsx(styles.subControl, withRandom && styles.subControlActive)}
      >
        <SvgIcon>
          <RandomIcon />
        </SvgIcon>
      </IconButton>
      {/*  */}
      <IconButton onClick={onPlayPrev} className={styles.control}>
        <SvgIcon className={styles.prevArrowIcon}>
          <ArrowAltIcon />
        </SvgIcon>
      </IconButton>
      {/*  */}
      <div className={styles.playButtonWrapper}>
        <IconButton
          disabled={!readyForPlay}
          onClick={onPlayPause}
          className={clsx(styles.playButton)}
        >
          <SvgIcon className={clsx(styles.playIcon, !isPlay && styles.playIconPaused)}>
            {isPlay ? <PauseIcon /> : <PlayIcon />}
          </SvgIcon>
        </IconButton>
      </div>
      {/*  */}
      <IconButton onClick={onPlayNext} className={styles.control}>
        <SvgIcon>
          <ArrowAltIcon />
        </SvgIcon>
      </IconButton>
      {/*  */}
      <IconButton
        onClick={onLoop}
        className={clsx(styles.subControl, withLoop && styles.subControlActive)}
      >
        <SvgIcon>
          <RepeatIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
