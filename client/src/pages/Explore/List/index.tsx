import React from 'react'
import { Playlist } from '@/components/Playlist'
import { ScaleLoader } from '@/components/ui/Loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { explorePlaylistVar } from '@/apollo/cache/variables'

import { Container } from './List.styled'

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
      <Container>
        <ScaleLoader fallback />
      </Container>
    )
  }

  if (error) {
    return <Container>Error</Container>
  }

  if (!isLoad && explorePlaylist.length === 0) {
    return <Container>nothing found</Container>
  }

  return (
    <div style={{ display: 'flex', flexGrow: '1' }}>
      <Playlist
        relatedTo="Explore"
        data={explorePlaylist}
        hasNextPage={hasNextPage}
        isFetchingNextPage={currentPage > 1 && isLoad}
        onFetchNextPage={onFetchNextPage}
      />
    </div>
  )
}
