import React from 'react'
import clsx from 'clsx'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

import styles from './styles.module.scss'

interface MiniPlayerProps {
  onPlayerOpen(): void
  onPlayPause(): void
}

export function MiniPlayer({ onPlayerOpen, onPlayPause }: MiniPlayerProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <div className={clsx(styles.container, !!currentTrack.id && styles.playing)}>
      <div className={styles.inner} onClick={onPlayerOpen}>
        <div className={styles.imageWrapper}>
          <ImagePlaceholder src={currentTrack.coverURL} altText={currentTrack.title} />
        </div>
        <div className={styles.info}>
          <h3 className={styles.title}>{currentTrack.title}</h3>
          <p className={styles.author}>{currentTrack.author}</p>
        </div>
      </div>
      <div className={styles.playBottonWrapper}>
        <IconButton onClick={onPlayPause} className={styles.playBotton}>
          <SvgIcon className={clsx(styles.icon, !currentTrack.isPlaying && styles.pauseIcon)}>
            {currentTrack.isPlaying ? <PauseIcon /> : <PlayIcon />}
          </SvgIcon>
        </IconButton>
      </div>
    </div>
  )
}
