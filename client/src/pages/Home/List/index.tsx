import React from 'react'
import { Playlist } from '@/components/Playlist'
import { NoDataPlug, ErrorPlug } from '../plugs'
import { ScaleLoader } from '@/components/ui/Loader'
import { ApolloError, useReactiveVar } from '@apollo/client'
import { userPlaylistVar } from '@/apollo/cache/variables'

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
  const userPlaylist = useReactiveVar(userPlaylistVar)

  if (isFirstLoad) {
    return (
      <Container>
        <ScaleLoader fallback />
      </Container>
    )
  }

  if (error) {
    return (
      <Container>
        <ErrorPlug />
      </Container>
    )
  }

  if (!isLoad && userPlaylist.length === 0) {
    return (
      <Container>
        <NoDataPlug />
      </Container>
    )
  }

  return (
    <div style={{ display: 'flex', flexGrow: '1' }}>
      <Playlist
        relatedTo="User"
        data={userPlaylist}
        hasNextPage={hasNextPage}
        isFetchingNextPage={currentPage > 1 && isLoad}
        onFetchNextPage={onFetchNextPage}
      />
    </div>
  )
}
