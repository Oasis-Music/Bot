import { cva } from 'cva'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { AttachButton } from '@/features/soundtrack/add-to-user-playlist'
import { UnattachButton } from '@/features/soundtrack/remove-from-user-playlist'
import { CopyInfoButton } from '@/features/soundtrack/copy-info'
import { ShareTrackButton } from '@/features/soundtrack/share-track'

export interface HeadProps {
  trackCounter?: number
  onTrackAttach?(): void
  onTrackUnattach?(): void
}

const details = cva('flex grow flex-col justify-center', {
  variants: {
    withTrack: {
      true: 'justify-start pt-3',
      false: 'justify-center'
    }
  }
})

export function Head({ onTrackAttach, onTrackUnattach }: HeadProps) {
  const track = useReactiveVar(currentTrackVar)

  return (
    <>
      <div className="relative flex pt-4 pb-4 pl-1">
        <div className="mr-4 size-28 rounded-2xl bg-gray-300 p-0.5">
          <ImagePlaceholder src={track.coverURL} altText={track.title} />
        </div>
        <div className={details({ withTrack: !!track.id })}>
          <h1 className="font-semibold">{track.title}</h1>
          <p className="text-sm font-medium text-gray-400">{track.author}</p>
          {track.attached ? (
            <div className="shadow-white-glow mt-auto flex items-center justify-around rounded-lg bg-white">
              {/*  */}
              <UnattachButton onTrackUnattached={onTrackUnattach} />
              {/*  */}
              <CopyInfoButton />
              {/*  */}
              <ShareTrackButton />
            </div>
          ) : (
            <AttachButton onTrackAttached={onTrackAttach} />
          )}
        </div>
      </div>
    </>
  )
}
