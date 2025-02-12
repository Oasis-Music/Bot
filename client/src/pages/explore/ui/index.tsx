import { useState, useEffect } from 'react'
import { List } from './list'
import { Search } from '@/widgets/search'
import { useAllSoundtracksQuery, useSearchSoundtrackLazyQuery } from '../api'
import { useTranslation } from 'react-i18next'
import { useExplorePlaylist } from '@/features/soundtrack/set-explore-playlist'
import type { Soundtrack } from '@/entities/soundtrack'

export function ExplorePage() {
  const { t } = useTranslation()
  const [_, setTracks] = useState<Soundtrack[]>([])

  const { setExplorePlaylist } = useExplorePlaylist()

  const [firstLoad, setFirstLoad] = useState(true)
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const ITEMS_PER_PAGE = 15

  const { loading, error } = useAllSoundtracksQuery({
    variables: {
      page: currentPage
    },
    fetchPolicy: 'network-only', // TODO: when cache first duplicate values
    onCompleted(q) {
      const newTracks = q.soundtracks.soundtracks as Soundtrack[]

      setExplorePlaylist(newTracks)
      setHasNextPage(q.soundtracks.soundtracks.length === ITEMS_PER_PAGE)
      setFirstLoad(false)
    },
    onError() {
      setFirstLoad(false)
    }
  })

  const [searchTrack] = useSearchSoundtrackLazyQuery({
    onCompleted(queryData) {
      setTracks(queryData.searchSoundtrack)
    }
  })

  // INFO: Because we have a cumulative effect of getting tracks
  // when currentPage changes, we should not clean up already saved original data
  useEffect(() => {
    return () => {
      setExplorePlaylist([])
    }
  }, [])

  const fetchNextPage = () => {
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
      <List
        currentPage={currentPage}
        isLoad={loading}
        hasNextPage={hasNextPage}
        isFirstLoad={firstLoad}
        error={error}
        onFetchNextPage={fetchNextPage}
      />
    </div>
  )
}
