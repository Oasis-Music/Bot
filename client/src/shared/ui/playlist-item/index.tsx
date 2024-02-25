import React from 'react'
import { Loader } from '@/shared/ui/loader'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { timeFormater } from '@/shared/lib/helpers'

import styles from './playlistItem.module.scss'

interface PlaylistItemProps {
  title: string
  author: string
  duration: number
  coverURL: string
  isPlaying: boolean
  onClick(): void
}

export function PlaylistItem({
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
        {isPlaying ? <Loader fallback /> : <span>{timeFormater(duration)}</span>}
      </div>
    </div>
  )
}
