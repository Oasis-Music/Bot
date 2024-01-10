import React, { useState, useEffect, useRef, useCallback } from 'react'
import NowPlaying from './NowPlaying'
import ScaleLoader from '@/shared/Loader'
import PlaylistItem from '@/components/PlaylistItem'
import { NoDataPlug, ErrorPlug } from './Plugs'
import { useReactiveVar } from '@apollo/client'
import { UserMutations } from '@/apollo/cache/mutations'
import { userVar, currentTrackVar, userPlaylistVar } from '@/apollo/cache/variables'
import { useUserSoundtracksLazyQuery } from '@/graphql/user/_gen_/userSoundtracks.query'
import { Container, List, MountLoader } from './Home.styled'
import { Playlist } from '@/apollo/cache/types'
import type { Soundtrack } from '@/apollo/cache/types'

const ITEMS_PER_PAGE = 15

const Home: React.FC = () => {
  const currentTrack = useReactiveVar(currentTrackVar)
  const currentUser = useReactiveVar(userVar)
  const userPlaylist = useReactiveVar(userPlaylistVar)

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [totalTracks, setTotalTracks] = useState<number>(0)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const [getTracks, { loading, error }] = useUserSoundtracksLazyQuery({
    variables: {
      id: currentUser.id,
      page: currentPage
    },
    fetchPolicy: 'network-only',
    onCompleted(q) {
      if (q.userSoundtracks.__typename === 'NotFound') {
        return
      }
      const tracks = q.userSoundtracks.soundtracks
      const totalNum = q.userSoundtracks.total

      UserMutations.setUserPlaylist(tracks as Soundtrack[])

      setHasNextPage(tracks.length < totalNum && tracks.length === ITEMS_PER_PAGE)
      setTotalTracks(totalNum)
    }
  })

  useEffect(() => {
    getTracks()
  }, [currentPage])

  useEffect(() => {
    return () => {
      UserMutations.clearUserPlaylist()
    }
  }, [])

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

  const onTrackAttach = () => {
    setTotalTracks((prev) => prev + 1)
  }

  const onUnattachHandler = () => {
    setTotalTracks((prev) => prev - 1)
  }

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

  if (!firstLoad && !totalTracks) {
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
      <NowPlaying
        trackCounter={totalTracks}
        onTrackAttach={onTrackAttach}
        onTrackUnattach={onUnattachHandler}
      />

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
              isPlaying={currentTrack.id === track.id && currentTrack.isPlaying}
              isAttached={track.attached}
              playlist={Playlist.User}
            />
          ))}
        </List>
      )}
      {isIntersectionLoad && <ScaleLoader fallback />}
    </Container>
  )
}

export default Home
