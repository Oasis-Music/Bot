import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'
import {
  SoundtrackByTitleQuery,
  SoundtrackByTitleVariables,
  SoundtrackByTitleDocument
} from '../../graphql/soundtrack/_gen_/soundtrackByTitle.query'

import TracksList from './TracksList/TracksList'
import { Track } from './types'
import Search from '../../components/Search/Search'
import { useTranslation } from 'react-i18next'

const Explore: React.FC = () => {
  const { t } = useTranslation()
  const [tracks, setTracks] = useState<Track[]>([])

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)

  const ITEMS_PER_PAGE = 15

  const [getTracks, { loading }] = useLazyQuery<AllSoundtracksQuery, AllSoundtracksVariables>(
    AllSoundtracksDocument,
    {
      variables: {
        page: currentPage
      },
      onCompleted(q) {
        const newTracks = q.soundtracks.soundtracks

        setTracks((prev) => [...prev, ...newTracks])
        setHasNextPage(q.soundtracks.soundtracks.length === ITEMS_PER_PAGE)
      }
    }
  )

  const [searchTrack] = useLazyQuery<SoundtrackByTitleQuery, SoundtrackByTitleVariables>(
    SoundtrackByTitleDocument,
    {
      onCompleted(queryData) {
        setTracks(queryData.soundtrackByTitle)
      }
    }
  )

  useEffect(() => {
    getTracks()
  }, [currentPage])

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  const handleSearchSubmit = (value: string) => {
    searchTrack({
      variables: {
        title: value
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
        tracks={tracks}
        onNextPage={handleNextPage}
      />
    </div>
  )
}

export default Explore
