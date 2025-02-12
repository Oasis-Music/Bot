import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'

export interface ShareTrackButtonProps {}

export function ShareTrackButton({}: ShareTrackButtonProps) {
  const handleButtonClick = () => {
    console.log('share track')
  }

  return (
    <IconButton onClick={handleButtonClick} className="text-black">
      <Icon name="common/share" className="text-[24px]" />
    </IconButton>
  )
}
