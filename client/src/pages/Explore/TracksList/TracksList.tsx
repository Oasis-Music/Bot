import React, { useState, useCallback, useRef } from 'react'
import { Track } from '../types'
import PlaylistItem from '../../../components/PlaylistItem/PlaylistItem'

import styled from 'styled-components'
import ScaleLoader from '../../../shared/Loader'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../../apollo/cache/variables'

interface listStyleProps {
  $isPlay: boolean
}

const List = styled.ul<listStyleProps>`
  height: ${({ $isPlay }) => ($isPlay ? 'calc(60vh - 60px)' : '60vh')};
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
  @media ${({ theme }) => theme.media.hsd} {
    height: 100%;
    padding-bottom: ${({ $isPlay }) => ($isPlay ? '20vh' : '10vh')};
  }
  @media ${({ theme }) => theme.media.hxs} {
    padding-bottom: ${({ $isPlay }) => ($isPlay ? '17vh' : '7vh')};
  }
`

const MountLoader = styled.div`
  height: 100%;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface TracksList {
  loading: boolean
  tracks: Track[]
  hasNextPage: boolean
  onNextPage(): void
}

const TracksList: React.FC<TracksList> = ({ loading, tracks, hasNextPage, onNextPage }) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const intersectionObserver = useRef<IntersectionObserver>()

  const lastTrackRef = useCallback(
    (track: any) => {
      if (loading) return
      if (intersectionObserver.current) intersectionObserver.current.disconnect()

      intersectionObserver.current = new IntersectionObserver((tracks) => {
        if (tracks[0].isIntersecting && hasNextPage) {
          setFirstLoad(false)
          onNextPage()
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

  return (
    <div>
      {isMountLoad ? (
        mountPlug
      ) : (
        <List $isPlay={!!currentTrack.id}>
          {tracks.map((track, index) => (
            <PlaylistItem
              ref={tracks.length === index + 1 ? lastTrackRef : undefined}
              key={track.id}
              id={track.id}
              title={track.title}
              author={track.author}
              duration={track.duration}
              coverURL={track.coverURL || ''}
              audioURL={track.audioURL}
              isPlaying={currentTrack.id === track.id && currentTrack.isPlaying}
              isAttached={track.attached}
            />
          ))}
        </List>
      )}
      {isIntersectionLoad && <ScaleLoader fallback />}
    </div>
  )
}

export default TracksList
