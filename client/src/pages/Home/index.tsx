import React, { useState, useEffect, useRef, useCallback } from 'react'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import ScaleLoader from '../../shared/Loader'
import thinkEmojiImage from '../../assets/rastr/thinking.png'
import { currentTrackIdVar } from '../../apollo/cache/variables'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'
import {
  Container,
  List,
  MountLoader,
  ErrorPlugWrapper,
  ErrorPlugBox,
  ErrorImg
} from './Home.styled'

// TODO: share
interface Track {
  id: string
  title: string
  author: string
  duration: number
  coverURL?: string | null
  audioURL: string
}

function ErrorPlug() {
  return (
    <ErrorPlugWrapper>
      <ErrorPlugBox>
        <ErrorImg src={thinkEmojiImage} />
        <div>
          <h1>Ой!</h1>
          <p>Похоже произошла ошибка, попробуйте повторить попытку</p>
        </div>
      </ErrorPlugBox>
    </ErrorPlugWrapper>
  )
}

const Home: React.FC = () => {
  const nowPlayingID = useReactiveVar<string>(currentTrackIdVar)

  const ITEMS_PER_PAGE = 15

  const [tracks, setTracks] = useState<Track[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const [getTracks, { loading, error }] = useLazyQuery<
    AllSoundtracksQuery,
    AllSoundtracksVariables
  >(AllSoundtracksDocument, {
    variables: {
      page: currentPage
    },
    onCompleted: (data) => {
      setTracks((prev) => [...prev, ...data.soundtracks.soundtracks])
      setHasNextPage(data.soundtracks.soundtracks.length === ITEMS_PER_PAGE)
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
