import clsx from 'clsx'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { PlayPauseButton } from '@/features/soundtrack/play-pause'

import styles from './styles.module.scss'

interface MiniPlayerProps {
  onPlayerOpen(): void
  onPlayPause(): void // TODO: extract
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
      <div className={styles.buttonWrapper}>
        <PlayPauseButton onClick={onPlayPause} />
      </div>
    </div>
  )
}
