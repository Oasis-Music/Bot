import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'
import TrashIcon from '@/shared/assets/svg/trash.svg?react'
import { useUnattachSoundtrackMutation } from '../../api'
import { useTranslation } from 'react-i18next'
import { currentTrackVar } from '@/entities/soundtrack'
import { useReactiveVar } from '@apollo/client'
import { useRemoveFromUserPlaylist } from '../../model'
import { type User, userVar } from '@/entities/user'
import { toast } from 'sonner'

export interface UnattachButtonProps {
  onTrackUnattached?(): void
}

export function UnattachButton({ onTrackUnattached }: UnattachButtonProps) {
  const { t } = useTranslation()
  const track = useReactiveVar(currentTrackVar)
  const user = useReactiveVar(userVar) as User

  const unattachSoundtrack = useRemoveFromUserPlaylist()

  const [onUnattachSoundtrack, { loading }] = useUnattachSoundtrackMutation({
    onCompleted: () => {
      unattachSoundtrack()
      if (onTrackUnattached) {
        onTrackUnattached()
      }
    },
    onError: () => {
      toast.error(t('snackbar.trackDeleteFail'), { duration: 3000 })
    }
  })

  const handleClick = () => {
    onUnattachSoundtrack({
      variables: {
        trackId: track.id,
        userId: user.id
      }
    })
  }

  return (
    <IconButton loading={loading} onClick={handleClick} className="text-black">
      <SvgIcon>
        <TrashIcon />
      </SvgIcon>
    </IconButton>
  )
}
