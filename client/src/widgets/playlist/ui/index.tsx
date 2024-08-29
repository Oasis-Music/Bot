import { useEffect, useRef } from 'react'
import { SoundtrackItem } from '@/entities/soundtrack'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { Loader } from '@/shared/ui/loader'
import { useVirtualizer } from '@tanstack/react-virtual'
import type { PlaylistType, Soundtrack } from '@/entities/soundtrack'
import { usePlaySoundtrack } from '@/entities/soundtrack'
import { useMainPlaylist } from '@/features/soundtrack/bind-main-playlist'

import styles from './styles.module.scss'

interface PlaylistProps {
  relatedTo: PlaylistType
  data: Soundtrack[]
  height: string
  hasNextPage: boolean
  isFetchingNextPage: boolean
  onFetchNextPage(): void
}

export function Playlist({
  relatedTo,
  data,
  height,
  hasNextPage,
  isFetchingNextPage,
  onFetchNextPage
}: PlaylistProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  const { bindMainPlaylist } = useMainPlaylist()

  const playSoundtrack = usePlaySoundtrack()

  const parentRef = useRef<HTMLDivElement>(null)

  const allRows = [...data]

  const rowVirtualizer = useVirtualizer({
    overscan: 3,
    count: hasNextPage ? allRows.length + 1 : allRows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 58,
    paddingEnd: 10
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) {
      return
    }

    // console.log(lastItem.index, allRows.length - 1)

    if (lastItem.index >= allRows.length - 1 && hasNextPage && !isFetchingNextPage) {
      // console.log('fetch next')
      onFetchNextPage()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, onFetchNextPage, allRows, isFetchingNextPage, rowVirtualizer.getVirtualItems()])

  const trackClickHandler = (track: Soundtrack) => {
    playSoundtrack(track)
    bindMainPlaylist(relatedTo)
  }

  return (
    <div style={{ display: 'flex', flexGrow: '1' }}>
      <div
        ref={parentRef}
        className={styles.view}
        style={{
          height: currentTrack.id ? `calc(${height} - 67px)` : height,
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
                    <div className={styles.loader}>
                      <Loader />
                    </div>
                  ) : (
                    'Nothing more to load'
                  )
                ) : (
                  <SoundtrackItem
                    title={track.title}
                    author={track.author}
                    duration={track.duration}
                    coverURL={track.coverURL || ''}
                    isPlaying={currentTrack.id === track.id && currentTrack.isPlaying}
                    onClick={() => trackClickHandler(track)}
                  />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
