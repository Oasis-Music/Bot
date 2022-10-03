import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import { useLazyQuery, useReactiveVar } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'
import { currentTrackIdVar } from '../../apollo/cache/variables'

const Container = styled.div`
  height: 100vh;
  background-color: #101318;
`

interface listStyleProps {
  $isPlay: boolean
}

const List = styled.ul<listStyleProps>`
  height: ${({ $isPlay }) => ($isPlay ? 'calc(60vh - 52px)' : '60vh')};
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: #9f9f9f !important;
  }
  @media ${({ theme }) => theme.media.hxs} {
    max-height: calc(100% - 265px);
  }
`

interface Track {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  fileURL: string
}

const Home: React.FC = () => {
  const nowPlayingID = useReactiveVar<string>(currentTrackIdVar)

  const ITEMS_PER_PAGE = 15

  const [tracks, setTracks] = useState<Track[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [hasNextPage, setHasNextPage] = useState<boolean>(false)
  const [firstLoading, setFirstLoading] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const [getTracks, { loading }] = useLazyQuery<AllSoundtracksQuery, AllSoundtracksVariables>(
    AllSoundtracksDocument,
    {
      variables: {
        page: currentPage
      },
      onCompleted: (data) => {
        setTracks((prev) => [...prev, ...data.soundtracks.soundtracks])
        setHasNextPage(data.soundtracks.soundtracks.length === ITEMS_PER_PAGE)
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
          console.log('We are near the last post')
          setFirstLoading(false)
          setCurrentPage((prev) => prev + 1)
        }
      })

      if (track) intersectionObserver.current.observe(track)
    },
    [loading, hasNextPage]
  )

  console.log(tracks)

  if (firstLoading && loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <NowPlaying />
      <List $isPlay={!!nowPlayingID}>
        {tracks.map((track, index) => {
          if (tracks.length === index + 1) {
            return (
              <PlaylistItem
                ref={lastTrackRef}
                key={track.id}
                id={track.id}
                title={track.title}
                author={track.author}
                duration={track.duration}
                coverImage={track.coverImage}
                fileURL={track.fileURL}
                isPlaying={nowPlayingID === track.id}
              />
            )
          }

          return (
            <PlaylistItem
              key={track.id}
              id={track.id}
              title={track.title}
              author={track.author}
              duration={track.duration}
              coverImage={track.coverImage}
              fileURL={track.fileURL}
              isPlaying={nowPlayingID === track.id}
            />
          )
        })}
      </List>
    </Container>
  )
}

export default Home
