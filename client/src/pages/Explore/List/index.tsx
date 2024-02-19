import React from 'react'
import { Playlist } from '@/components/Playlist'
import { ScaleLoader } from '@/components/ui/Loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { explorePlaylistVar } from '@/apollo/cache/variables'

import styles from './List.module.scss'

interface ListProps {
  currentPage: number
  isLoad: boolean
  isFirstLoad: boolean
  hasNextPage: boolean
  error: ApolloError | undefined
  onFetchNextPage(): void
}

export function List({
  currentPage,
  isLoad,
  error,
  isFirstLoad,
  hasNextPage,
  onFetchNextPage
}: ListProps) {
  const explorePlaylist = useReactiveVar(explorePlaylistVar)

  if (isFirstLoad) {
    return (
      <div className={styles.container}>
        <ScaleLoader fallback />
      </div>
    )
  }

  if (error) {
    return <div className={styles.container}>Error</div>
  }

  if (!isLoad && explorePlaylist.length === 0) {
    return <div className={styles.container}>nothing found</div>
  }

  return (
    <div>
      <Playlist
        relatedTo="Explore"
        height="77vh"
        data={explorePlaylist}
        hasNextPage={hasNextPage}
        isFetchingNextPage={currentPage > 1 && isLoad}
        onFetchNextPage={onFetchNextPage}
      />
    </div>
  )
}
