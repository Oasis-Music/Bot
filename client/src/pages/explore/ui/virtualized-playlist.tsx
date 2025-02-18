import { useEffect, useRef } from 'react'
import { SoundtrackItem } from '@/entities/soundtrack'
import { Loader } from '@/shared/ui/loader'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Button } from '@/shared/ui/button'

export type edge = {
  cursor: string
  node: {
    id: string
    title: string
    author: string
    duration: number
    coverURL?: string | null
    audioURL: string
    attached: boolean
  }
}

export interface VirtualizedPlaylistProps {
  hasNextPage: boolean
  soundtracks: edge[]
  isFetchingNextPage: boolean
  error: boolean
  fetching: boolean
  onFetchMore(): void
  onRetry(): void
}

export function VirtualizedPlaylist({
  soundtracks,
  hasNextPage,
  isFetchingNextPage,
  error,
  onFetchMore,
  onRetry,
  fetching
}: VirtualizedPlaylistProps) {
  const parentRef = useRef<HTMLDivElement>(null)

  const rowVirtualizer = useVirtualizer({
    count: hasNextPage ? soundtracks.length + 1 : soundtracks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 58,
    overscan: 5
  })

  useEffect(() => {
    const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

    if (!lastItem) return

    if (lastItem.index >= soundtracks.length - 1 && hasNextPage && !isFetchingNextPage) {
      onFetchMore()
    }
  }, [hasNextPage, soundtracks.length, isFetchingNextPage, rowVirtualizer.getVirtualItems()])

  if (error) {
    return (
      <div className="flex grow flex-col items-center justify-center">
        <h1 className="mb-4 text-xl text-gray-400">Ошибка получения данных</h1>
        <Button
          color="secondary"
          loading={fetching}
          fullWidth
          className="max-w-44"
          onClick={onRetry}
        >
          Повторить
        </Button>
      </div>
    )
  }

  return (
    <div
      ref={parentRef}
      className="overflow-y-auto px-1"
      style={{
        flexGrow: 1
      }}
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: 'relative'

          // height: `${
          //   (rowVirtualizer.getTotalSize() * 100) / (parentRef.current?.offsetHeight || 1)
          // }%`
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualItem) => {
          const isLoaderRow = virtualItem.index > soundtracks.length - 1
          const soundtrack = soundtracks[virtualItem.index]

          return (
            <div
              key={virtualItem.key}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`
              }}
            >
              {isLoaderRow ? (
                hasNextPage && (
                  <div className="flex justify-center">
                    <Loader />
                  </div>
                )
              ) : (
                <div>
                  <SoundtrackItem
                    title={soundtrack.node.title}
                    author={soundtrack.node.author}
                    duration={soundtrack.node.duration}
                    coverURL={soundtrack.node.coverURL || ''}
                    // isPlaying={currentTrack.id === track.id && currentTrack.isPlaying}
                    isPlaying={false}
                    onClick={console.log}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
