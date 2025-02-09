import ShareIcon from '@/shared/assets/svg/share.svg?react'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'

export interface ShareTrackButtonProps {}

export function ShareTrackButton({}: ShareTrackButtonProps) {
  const handleButtonClick = () => {
    console.log('share track')
  }

  return (
    <IconButton onClick={handleButtonClick} className="text-black">
      <SvgIcon>
        <ShareIcon />
      </SvgIcon>
    </IconButton>
  )
}
