import { useState, useEffect } from 'react'
import CopyIcon from '@/shared/assets/svg/copy.svg?react'
import CheckIcon from '@/shared/assets/svg/check-circle.svg?react'
import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

export interface CopyInfoButtonProps {}

export function CopyInfoButton({}: CopyInfoButtonProps) {
  const [wasCopied, setCopied] = useState(false)

  const track = useReactiveVar(currentTrackVar)

  useEffect(() => {
    setCopied(false)
  }, [track.id])

  const onCopyTrackInfo = () => {
    // INFO: it is a query permission for Blink only engines
    // Is there a need to check permissions?

    // navigator.permissions.query({ name: 'clipboard-write' as PermissionName }).then((result) => {
    //   if (result.state == 'granted' || result.state == 'prompt') {
    //     console.log('Write access granted!')
    //   }
    // })

    navigator.clipboard.writeText(`${track.title} - ${track.author}`).then(
      () => {
        setCopied(true)
      },
      () => {
        console.log('falied')
      }
    )
  }

  return (
    <IconButton onClick={onCopyTrackInfo} className="text-black">
      <SvgIcon>{wasCopied ? <CheckIcon /> : <CopyIcon />}</SvgIcon>
    </IconButton>
  )
}
