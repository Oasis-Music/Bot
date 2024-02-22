import React from 'react'
import { Loader } from '@/shared/ui/loader'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { timeFormater } from '@/utils/helpers'
import { PlaylistMutations, SoundtrackMutations } from '@/apollo/cache/mutations'
import type { PlaylistType } from '@/apollo/cache/types'

import styles from './PlaylistItem.module.scss'

interface PlaylistItemProps {
  id: string
  title: string
  author: string
  duration: number
  coverURL: string
  audioURL: string
  isPlaying: boolean
  isAttached: boolean
  playlist: keyof typeof PlaylistType
}

export function PlaylistItem({
  id,
  title,
  author,
  duration,
  coverURL,
  audioURL,
  isPlaying,
  isAttached,
  playlist
}: PlaylistItemProps) {
  const trackClickHandler = () => {
    PlaylistMutations.bindMainPlaylist(playlist)
    SoundtrackMutations.setCurrentTrack({
      id,
      title,
      author,
      duration,
      coverURL,
      audioURL,
      isPlaying,
      attached: isAttached
    })
  }

  return (
    <div className={styles.container} onClick={trackClickHandler}>
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
