import clsx from 'clsx'
import ArrowAltIcon from '@/assets/svg/arrow-alt.svg?react'
import RepeatIcon from '@/assets/svg/repeat.svg?react'
import RandomIcon from '@/assets/svg/random.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { PlayPauseButton } from '@/features/soundtrack/play-pause'

import styles from './Controls.module.scss'

interface ControlsProps {
  readyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
}

export function Controls({
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
        <PlayPauseButton variant="attractive" disabled={!readyForPlay} onClick={onPlayPause} />
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
