import clsx from 'clsx'
import PlayIcon from '@/shared/assets/svg/play.svg?react'
import PauseIcon from '@/shared/assets/svg/pause.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

import styles from './styles.module.scss'

interface PlayPauseButtonProps {
  onClick(): void
  variant?: 'plain' | 'attractive'
  disabled?: boolean
}

export function PlayPauseButton({ onClick, variant = 'plain', disabled }: PlayPauseButtonProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <IconButton
      disabled={disabled}
      onClick={onClick}
      className={clsx(styles.button, variant === 'plain' ? styles.plain : styles.attractive)}
    >
      <SvgIcon className={clsx(styles.icon, !currentTrack.isPlaying && styles.pauseIcon)}>
        {currentTrack.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </SvgIcon>
    </IconButton>
  )
}
