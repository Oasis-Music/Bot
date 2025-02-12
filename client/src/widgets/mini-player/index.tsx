import { cva } from 'cva'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { PlayPauseButton } from '@/features/soundtrack/play-pause'

interface MiniPlayerProps {
  onPlayerOpen(): void
  onPlayPause(): void
}

const container = cva('z-40 flex rounded-t-2xl bg-white px-1.5 py-1.5 pr-4 transition-transform', {
  variants: {
    visible: {
      true: 'visible translate-y-px',
      false: 'invisible translate-y-full'
    }
  }
})

export function MiniPlayer({ onPlayerOpen, onPlayPause }: MiniPlayerProps) {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <div className={container({ visible: !!currentTrack.id })}>
      <div className="flex min-w-0 flex-[1_1_100%]" onClick={onPlayerOpen}>
        <div className="mr-2 size-16 min-w-16 self-center">
          <ImagePlaceholder src={currentTrack.coverURL} altText={currentTrack.title} />
        </div>
        <div className="min-w-0 flex-[1_1_100%] pt-1 pr-2">
          <h3 className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap text-black">
            {currentTrack.title}
          </h3>
          <p className="mb-0.5 overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-black">
            {currentTrack.author}
          </p>
        </div>
      </div>
      <div className="ml-auto self-center">
        <PlayPauseButton variant="plain" onClick={onPlayPause} />
      </div>
    </div>
  )
}
