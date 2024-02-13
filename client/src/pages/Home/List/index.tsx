import React, { useCallback, useRef } from 'react'
import { Playlist } from '@/apollo/cache/types'
import { ItemsList } from './List.styled'
import { NoDataPlug } from '../plugs'
import { ScaleLoader } from '@/components/ui/Loader'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar, userPlaylistVar } from '@/apollo/cache/variables'
import PlaylistItem from '@/components/PlaylistItem'

interface ListProps {
  isLoad: boolean
  hasNextPage: boolean
  isFirstLoad: boolean
  onPageChange(): void
  onIntersectionLoad(): void
}

export function List({
  isLoad,
  isFirstLoad,
  hasNextPage,
  onPageChange,
  onIntersectionLoad
}: ListProps) {
  const currentTrack = useReactiveVar(currentTrackVar)
  const userPlaylist = useReactiveVar(userPlaylistVar)

  const intersectionObserver = useRef<IntersectionObserver>()

  const lastTrackRef = useCallback(
    (track: any) => {
      if (isLoad) return
      if (intersectionObserver.current) intersectionObserver.current.disconnect()

      intersectionObserver.current = new IntersectionObserver((tracks) => {
        if (tracks[0].isIntersecting && hasNextPage) {
          onIntersectionLoad()
          onPageChange()
        }
      })

      if (track) intersectionObserver.current.observe(track)
    },
    [isLoad, hasNextPage, onPageChange, onIntersectionLoad]
  )

  const playlistLen = userPlaylist.length

  if (isFirstLoad && !userPlaylist.length) {
    return <NoDataPlug />
  }

  return (
    <div>
      <ItemsList $isPlay={!!currentTrack.id}>
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
      </ItemsList>
      {!isFirstLoad && isLoad && <ScaleLoader fallback />}
    </div>
  )
}
