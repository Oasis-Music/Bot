import { IconButton } from '@/shared/ui/icon-button'
import { SvgIcon } from '@/shared/ui/svg-icon'
import TrashIcon from '@/shared/assets/svg/trash.svg?react'
import { useSnackbar } from '@/shared/lib/snackbar'
import { useUnattachSoundtrackMutation } from '../../api'
import { useTranslation } from 'react-i18next'
import { currentTrackVar } from '@/entities/soundtrack'
import { useReactiveVar } from '@apollo/client'
import { useRemoveFromUserPlaylist } from '../../model'
import { type User, userVar } from '@/entities/user'

interface UnattachButtonProps {
  className: string
  onTrackUnattached?(): void
}

export function UnattachButton({ className, onTrackUnattached }: UnattachButtonProps) {
  const { t } = useTranslation()
  const track = useReactiveVar(currentTrackVar)
  const user = useReactiveVar(userVar) as User

  const openSnackbar = useSnackbar()

  const unattachSoundtrack = useRemoveFromUserPlaylist()

  const [onUnattachSoundtrack, { loading }] = useUnattachSoundtrackMutation({
    onCompleted: () => {
      unattachSoundtrack()
      if (onTrackUnattached) {
        onTrackUnattached()
      }
    },
    onError: () => {
      openSnackbar({
        type: 'error',
        message: t('snackbar.trackDeleteFail')
      })
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
    <IconButton loading={loading} onClick={handleClick} className={className}>
      <SvgIcon>
        <TrashIcon />
      </SvgIcon>
    </IconButton>
  )
}
