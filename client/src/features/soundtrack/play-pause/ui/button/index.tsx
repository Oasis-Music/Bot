import clsx from 'clsx'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

import styles from './styles.module.scss'

interface PlayPauseButtonProps {
  onClick(): void
}

export function PlayPauseButton({ onClick }: PlayPauseButtonProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <IconButton onClick={onClick} className={styles.playBotton}>
      <SvgIcon className={clsx(styles.icon, !currentTrack.isPlaying && styles.pauseIcon)}>
        {currentTrack.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </SvgIcon>
    </IconButton>
  )
}
