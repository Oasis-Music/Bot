import React from 'react'
import clsx from 'clsx'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/apollo/cache/variables'

import styles from './Details.module.scss'

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
        <ImagePlaceholder
          backgroundColor="rgba(21,25,30, 0.8)"
          src={coverImage || ''}
          altText={title}
        />
      </div>
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.author}>{author}</p>
    </div>
  )
}
