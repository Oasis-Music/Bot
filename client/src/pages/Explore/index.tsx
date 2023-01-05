import React, { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'

import TracksList from './TracksList/TracksList'
import { Track } from './types'

const Explore: React.FC = () => {
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

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1)
  }

  useEffect(() => {
    getTracks()
  }, [currentPage])

  return (
    <div>
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
