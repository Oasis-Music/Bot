import React, { useState, useEffect } from 'react'
import Search from '@/components/Search'
import TracksList from './TracksList'
import { useReactiveVar } from '@apollo/client'
import { useAllSoundtracksLazyQuery } from '@/graphql/soundtrack/_gen_/soundtracks.query'
import { SoundtrackMutations } from '@/apollo/cache/mutations'
import { useSearchSoundtrackLazyQuery } from '@/graphql/soundtrack/_gen_/searchSoundtrack.query'
import { useTranslation } from 'react-i18next'
import { explorePlaylistVar } from '@/apollo/cache/variables'
import type { Track } from './types'
import type { Soundtrack } from '@/apollo/cache/types'

const Explore: React.FC = () => {
  const { t } = useTranslation()
  const [_, setTracks] = useState<Track[]>([])

  const exploreTracks = useReactiveVar(explorePlaylistVar)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const ITEMS_PER_PAGE = 15

  const [getTracks, { loading }] = useAllSoundtracksLazyQuery({
    variables: {
      page: currentPage
    },
    fetchPolicy: 'network-only', // TODO: when cache first duplicate values
    onCompleted(q) {
      const newTracks = q.soundtracks.soundtracks as Soundtrack[]

      SoundtrackMutations.setExplorePlaylist(newTracks)
      setHasNextPage(q.soundtracks.soundtracks.length === ITEMS_PER_PAGE)
    }
  })

  const [searchTrack] = useSearchSoundtrackLazyQuery({
    onCompleted(queryData) {
      setTracks(queryData.searchSoundtrack)
    }
  })

  useEffect(() => {
    getTracks()
  }, [currentPage])

  // INFO: Because we have a cumulative effect of getting tracks
  // when currentPage changes, we should not clean up already saved original data
  useEffect(() => {
    return () => {
      SoundtrackMutations.clearExplorePlaylist()
    }
  }, [])

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleSearchSubmit = (value: string) => {
    searchTrack({
      variables: {
        value
      }
    })
  }

  const searchPlaceholder = t('pages.explore.searchInput')

  return (
    <div>
      <Search onSubmit={handleSearchSubmit} placeholder={searchPlaceholder} />
      <TracksList
        loading={loading}
        hasNextPage={hasNextPage}
        tracks={exploreTracks}
        onNextPage={handleNextPage}
      />
    </div>
  )
}

export default Explore
