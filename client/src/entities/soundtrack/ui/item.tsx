import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { BarLoader } from '@/shared/ui/bar-loader'
import { timeFormater } from '@/shared/lib/helpers'

export interface PlaylistItemProps {
  title: string
  author: string
  duration: number
  coverURL: string
  isPlaying: boolean
  onClick(): void
}

export function SoundtrackItem({
  title,
  author,
  duration,
  coverURL,
  isPlaying,
  onClick
}: PlaylistItemProps) {
  return (
    <div className="mb-2.5 flex items-center pr-2" onClick={onClick}>
      <div className="mr-2 size-12">
        <ImagePlaceholder src={coverURL} altText={title} />
      </div>
      <div className="w-[74%]">
        <p className="mb-1 overflow-hidden font-medium text-ellipsis whitespace-nowrap text-white">
          {title}
        </p>
        <p className="text-[11px] text-gray-400">{author}</p>
      </div>
      <div className="ml-auto text-gray-400">
        {isPlaying ? <BarLoader /> : <span>{timeFormater(duration)}</span>}
      </div>
    </div>
  )
}
