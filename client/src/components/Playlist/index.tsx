import React, { useState, useEffect, useRef } from 'react'
import PlaylistItem from '../PlaylistItem'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar, userPlaylistVar, userVar } from '@/apollo/cache/variables'
import { Playlist as TPlaylist } from '@/apollo/cache/types'
import type { Soundtrack } from '@/apollo/cache/types'

import { useVirtualizer } from '@tanstack/react-virtual'
import { useUserSoundtracksQuery } from '@/graphql/user/_gen_/userSoundtracks.query'
import { UserMutations } from '@/apollo/cache/mutations'
import { ErrorPlug } from '@/pages/Home/plugs'

interface PlaylistProps {
  // children?: React.ReactNode
  isFetching?: boolean
  soundtracks?: Soundtrack[]
  hasNextPage?: boolean
}

import styles from './Playlist.module.css'

// { soundtracks, isFetching, hasNextPage }: PlaylistProps

export function Playlist(props: PlaylistProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const currentUser = useReactiveVar(userVar)
  const currentTrack = useReactiveVar(currentTrackVar)
  // const userPlaylist = useReactiveVar(userPlaylistVar)

  const [currentPage, setCurrentPage] = useState(1)

  const [hasNextPage, setHasNextPage] = useState(false)
  const [firstLoad, setFirstLoad] = useState<boolean>(true)

  const [data, setData] = useState<Soundtrack[]>([])

  const { loading, error } = useUserSoundtracksQuery({
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

      setData((data) => [...data, ...tracks])
      // UserMutations.setUserPlaylist(tracks as Soundtrack[])

      setHasNextPage(tracks.length < totalNum && tracks.length === 15)
      setFirstLoad(false)
    },
    onError() {
      setData([])
      setFirstLoad(false)
    }
  })

  const allRows = [...data]

  const rowVirtualizer = useVirtualizer({
    overscan: 3,
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 58,
    paddingEnd: 10
  })

  const isFetchingNextPage = currentPage > 1 && loading

  const fetchNextPage = () => {
    setCurrentPage((page) => page + 1)
  }

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    console.log(lastItem.index, allRows.length - 1)

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage && !error) {
      console.log('fetch next')

      fetchNextPage()
    }
  }, [
    error,
    hasNextPage,
    fetchNextPage,
    allRows,
    isFetchingNextPage,
    rowVirtualizer.getVirtualItems()
  ])

  if (error) {
    return (
      <div className={styles.container}>
        <ErrorPlug />
      </div>
    )
  }

  return (
    <div style={{ flex: '1 1 auto' }}>
      {firstLoad ? (
        <p>Loading...</p>
      ) : (
        <div
          ref={parentRef}
          className={styles.view}
          style={{
            height: currentTrack.id ? 'calc(65vh - 67px)' : '65vh',
            width: `100%`,
            overflow: 'auto',
            paddingBottom: 0
          }}
        >
          <ul
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: '100%',
              position: 'relative'
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const isLoaderRow = virtualRow.index > allRows.length - 1
              const track = allRows[virtualRow.index]

              return (
                <li
                  key={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${virtualRow.start}px)`
                  }}
                >
                  {isLoaderRow ? (
                    hasNextPage ? (
                      'Loading more...'
                    ) : (
                      'Nothing more to load'
                    )
                  ) : (
                    <PlaylistItem
                      id={track.id}
                      title={track.title}
                      author={track.author}
                      duration={track.duration}
                      coverURL={track.coverURL || ''}
                      audioURL={track.audioURL}
                      isPlaying={currentTrack.id === track.id && currentTrack.isPlaying}
                      isAttached={track.attached}
                      playlist={TPlaylist.User}
                    />
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      )}
    </div>
  )
}
