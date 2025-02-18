import { useState, useEffect, useCallback } from 'react'
import { Search } from '@/widgets/search'
import { useSoundtracksQuery, type SoundtracksQueryVariables, type SoundtracksQuery } from '../api'
import { VirtualizedPlaylist } from './virtualized-playlist'
import { useTranslation } from 'react-i18next'
import { Loader } from '@/shared/ui/loader'

type soundtrackEdges = SoundtracksQuery['soundtracks']['edges']

export function ExplorePage() {
  const { t } = useTranslation()

  const [variables, setVariables] = useState<SoundtracksQueryVariables>({
    first: 30,
    after: null
  })

  const [wasFirstLoad, setWasFirstLoad] = useState(false)

  const [soundtracks, setSoundtracks] = useState<soundtrackEdges>([])
  const [hasNextPage, setHasNextPage] = useState(false)
  const [isFetchingNextPage, setFetchingNextPage] = useState(false)

  const [result, refetchQuery] = useSoundtracksQuery({
    variables
  })

  const { data, fetching, error } = result

  useEffect(() => {
    if (data?.soundtracks) {
      setSoundtracks((prev) => [...prev, ...data.soundtracks.edges])
      setHasNextPage(data.soundtracks.pageInfo.hasNextPage)
      setFetchingNextPage(false)
    } else {
      if (error) {
        setFetchingNextPage(false)
        setHasNextPage(false)
      }
    }
  }, [data])

  useEffect(() => {
    if (!fetching && !wasFirstLoad) {
      setWasFirstLoad(true)
    }
  }, [fetching, wasFirstLoad])

  const loadMore = useCallback(() => {
    if (!fetching && hasNextPage && !isFetchingNextPage) {
      setFetchingNextPage(true)
      setVariables((prev) => ({
        ...prev,
        after: data?.soundtracks.pageInfo.endCursor
      }))
    }
  }, [fetching, hasNextPage, isFetchingNextPage, data])

  const handleSearchSubmit = (value: string) => {
    console.log('search track', value)
  }

  const searchPlaceholder = t('pages.explore.searchInput')

  return (
    <div className="flex h-full flex-col pb-14">
      <Search onSubmit={handleSearchSubmit} placeholder={searchPlaceholder} />

      {!wasFirstLoad ? (
        <div className="flex grow items-center justify-center">
          <Loader />
        </div>
      ) : (
        <VirtualizedPlaylist
          fetching={fetching}
          soundtracks={soundtracks}
          onFetchMore={loadMore}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
          error={!!error}
          onRetry={refetchQuery}
        />
      )}
    </div>
  )
}
