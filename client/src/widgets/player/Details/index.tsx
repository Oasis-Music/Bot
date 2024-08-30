import clsx from 'clsx'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

import styles from './styles.module.scss'

interface DetailsProps {
  title: string
  author: string
  coverImage?: string | null
}

export function Details({ coverImage, title, author }: DetailsProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  const pause = !currentTrack.isPlaying

  return (
    <div className={clsx(styles.container, pause && styles.pause)}>
      <div className={clsx(styles.imageWrapper)}>
        <ImagePlaceholder src={coverImage} altText={title} backgroundColor="rgba(21,25,30, 0.8)" />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>{author}</p>
    </div>
  )
}
