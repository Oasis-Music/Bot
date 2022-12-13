import React, { useState, useEffect, useRef, useCallback } from 'react'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import ScaleLoader from '../../shared/Loader'
import { currentTrackIdVar, userVar } from '../../apollo/cache/variables'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  UserTracksQuery,
  UserTracksVariables,
  UserTracksDocument
} from '../../graphql/user/_gen_/userTracks.query'
import { Container, List, MountLoader } from './Home.styled'
import { NoDataPlug, ErrorPlug } from './Plugs'

// TODO: share
interface Track {
  id: string
  title: string
  author: string
  duration: number
  coverURL?: string | null
  audioURL: string
}

const Home: React.FC = () => {
  const nowPlayingID = useReactiveVar(currentTrackIdVar)
  const currentUser = useReactiveVar(userVar)

  const ITEMS_PER_PAGE = 15

  const [tracks, setTracks] = useState<Track[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [totalTracks, setTotalTracks] = useState<number>(1)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const [getTracks, { loading, error }] = useLazyQuery<UserTracksQuery, UserTracksVariables>(
    UserTracksDocument,
    {
      variables: {
        id: currentUser.id,
        page: currentPage
      },
      onCompleted(q) {
        if (q.userTracks.__typename === 'NotFound') {
          return
        }
        const newTracks = q.userTracks.soundtracks

        setTracks((prev) => [...prev, ...newTracks])
        setHasNextPage(q.userTracks.soundtracks.length === ITEMS_PER_PAGE)
        setTotalTracks(q.userTracks.total)
      }
    }
  )

  useEffect(() => {
    getTracks()
  }, [currentPage])

  const lastTrackRef = useCallback(
    (track: any) => {
      if (loading) return
      if (intersectionObserver.current) intersectionObserver.current.disconnect()

      intersectionObserver.current = new IntersectionObserver((tracks) => {
        if (tracks[0].isIntersecting && hasNextPage) {
          setFirstLoad(false)
          setCurrentPage((prev) => prev + 1)
        }
      })

      if (track) intersectionObserver.current.observe(track)
    },
    [loading, hasNextPage]
  )

  const isMountLoad = firstLoad && loading
  const isIntersectionLoad = !firstLoad && loading

  const mountPlug = (
    <MountLoader>
      <ScaleLoader fallback />
    </MountLoader>
  )

  if (error) {
    return (
      <Container>
        <NowPlaying />
        <ErrorPlug />
      </Container>
    )
  }

  if (!totalTracks) {
    return (
      <Container>
        <NowPlaying />
        <NoDataPlug />
      </Container>
    )
  }

  return (
    <Container>
      <NowPlaying />
      {isMountLoad ? (
        mountPlug
      ) : (
        <List $isPlay={!!nowPlayingID}>
          {tracks.map((track, index) => (
            <PlaylistItem
              ref={tracks.length === index + 1 ? lastTrackRef : undefined}
              key={track.id}
              id={track.id}
              title={track.title}
              author={track.author}
              duration={track.duration}
              coverImage={track.coverURL || ''}
              fileURL={track.audioURL}
              isPlaying={nowPlayingID === track.id}
            />
          ))}
        </List>
      )}
      {isIntersectionLoad && <ScaleLoader fallback />}
    </Container>
  )
}

export default Home
