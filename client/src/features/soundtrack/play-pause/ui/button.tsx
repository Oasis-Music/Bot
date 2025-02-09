import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { PlayPauseButtonUI } from '@/shared/ui/play-pause-button'

export interface PlayPauseButtonProps {
  variant: 'plain' | 'attractive'
  disabled?: boolean
  onClick(): void
}

export function PlayPauseButton(props: PlayPauseButtonProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  return <PlayPauseButtonUI isPlaying={currentTrack.isPlaying} {...props} />
}
