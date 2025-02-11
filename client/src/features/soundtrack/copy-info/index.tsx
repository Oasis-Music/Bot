import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { CopyToClipboard } from '@/shared/ui/copy-to-clipboard'

export interface CopyInfoButtonProps {}

export function CopyInfoButton({}: CopyInfoButtonProps) {
  const track = useReactiveVar(currentTrackVar)

  return (
    <div className="text-[24px] text-black">
      <CopyToClipboard what={track.title} />
    </div>
  )
}
