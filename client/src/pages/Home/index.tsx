import React, { useState, useEffect, useRef, useCallback } from 'react'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import ScaleLoader from '../../shared/Loader'
import { userVar, currentTrackVar, userPlaylistVar } from '../../apollo/cache/variables'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  UserSoundtracksQuery,
  UserSoundtracksVariables,
  UserSoundtracksDocument
} from '../../graphql/user/_gen_/userSoundtracks.query'
import { UserMutations } from '../../apollo/cache/mutations'
import type { Soundtrack } from '../../apollo/cache/types'
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
  attached: boolean
}

const Home: React.FC = () => {
  const currentTrack = useReactiveVar(currentTrackVar)
  const currentUser = useReactiveVar(userVar)
  const userPlaylist = useReactiveVar(userPlaylistVar)

  const ITEMS_PER_PAGE = 15

  // const [tracks, setTracks] = useState<Track[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [totalTracks, setTotalTracks] = useState<number>(1)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const [getTracks, { loading, error }] = useLazyQuery<
    UserSoundtracksQuery,
    UserSoundtracksVariables
  >(UserSoundtracksDocument, {
    variables: {
      id: currentUser.id,
      page: currentPage
    },
    fetchPolicy: 'network-only',
    onCompleted(q) {
      if (q.userSoundtracks.__typename === 'NotFound') {
        return
      }
      const newTracks = q.userSoundtracks.soundtracks

      UserMutations.setUserPlaylist(newTracks as Soundtrack[])

      // setTracks((prev) => [...prev, ...newTracks])
      setHasNextPage(q.userSoundtracks.soundtracks.length === ITEMS_PER_PAGE)
      setTotalTracks(q.userSoundtracks.total)
    }
  })

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

  const playlistLen = userPlaylist.length

  return (
    <Container>
      <NowPlaying />
      {isMountLoad ? (
        mountPlug
      ) : (
        <List $isPlay={!!currentTrack.id}>
          {userPlaylist.map((track, index) => (
            <PlaylistItem
              ref={playlistLen === index + 1 ? lastTrackRef : undefined}
              key={track.id}
              id={track.id}
              title={track.title}
              author={track.author}
              duration={track.duration}
              coverURL={track.coverURL || ''}
              audioURL={track.audioURL}
              isPlaying={currentTrack.id === track.id}
              isAttached={track.attached}
            />
          ))}
        </List>
      )}
      {isIntersectionLoad && <ScaleLoader fallback />}
    </Container>
  )
}

export default Home
