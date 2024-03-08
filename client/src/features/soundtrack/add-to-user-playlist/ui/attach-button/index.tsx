import { currentTrackVar } from '@/entities/soundtrack'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import Button from '@/shared/ui/button'
import PlusIcon from '@/assets/svg/plus.svg?react'
import { useSnackbar } from '@/shared/lib/snackbar'
import { useAddToUserPlaylist } from '../../model'
import { useAttachSoundtrackMutation } from '../../api'
import { type User, userVar } from '@/entities/user'

import styles from './styles.module.scss'

interface MainButtonProps {
  onTrackAttached?(): void
}

export function AttachButton({ onTrackAttached }: MainButtonProps) {
  const user = useReactiveVar(userVar) as User

  const openSnackbar = useSnackbar()
  const { t } = useTranslation()

  const attachSoundtrack = useAddToUserPlaylist()
  const track = useReactiveVar(currentTrackVar)

  const [onAttachSoundtrack, { loading }] = useAttachSoundtrackMutation({
    onCompleted: () => {
      attachSoundtrack()

      if (onTrackAttached) {
        onTrackAttached()
      }
    },
    onError: () => {
      openSnackbar({
        type: 'error',
        message: t('snackbar.trackSaveFail')
      })
    }
  })

  const handleClick = () => {
    onAttachSoundtrack({
      variables: {
        trackId: track.id,
        userId: user.id
      }
    })
  }

  return (
    <Button
      disabled={!track.id}
      loading={loading}
      color="secondary"
      onClick={handleClick}
      className={styles.button}
      startIcon={
        <SvgIcon className={styles.addIcon}>
          <PlusIcon />
        </SvgIcon>
      }
    >
      {t('common.add')}
    </Button>
  )
}
