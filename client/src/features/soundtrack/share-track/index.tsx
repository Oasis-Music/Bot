import ShareIcon from '@/shared/assets/svg/share.svg?react'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'

interface ShareTrackButtonProps {
  className: string
}

export function ShareTrackButton({ className }: ShareTrackButtonProps) {
  const handleButtonClick = () => {
    console.log('share track')
  }

  return (
    <IconButton onClick={handleButtonClick} className={className}>
      <SvgIcon>
        <ShareIcon />
      </SvgIcon>
    </IconButton>
  )
}
