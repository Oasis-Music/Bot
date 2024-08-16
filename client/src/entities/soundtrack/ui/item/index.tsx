import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { timeFormater } from '@/shared/lib/helpers'

import styles from './styles.module.scss'

interface PlaylistItemProps {
  title: string
  author: string
  duration: number
  coverURL: string
  isPlaying: boolean
  onClick(): void
}

export function SoundtrackItem({
  title,
  author,
  duration,
  coverURL,
  isPlaying,
  onClick
}: PlaylistItemProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.image}>
        <ImagePlaceholder src={coverURL} altText={title} />
      </div>
      <div className={styles.info}>
        <p className={styles.title}>{title}</p>
        <p className={styles.author}>{author}</p>
      </div>
      <div className={styles.sideBox}>
        {isPlaying ? <div className={styles.loader} /> : <span>{timeFormater(duration)}</span>}
      </div>
    </div>
  )
}
