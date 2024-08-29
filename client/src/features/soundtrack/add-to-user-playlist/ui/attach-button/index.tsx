import { currentTrackVar } from '@/entities/soundtrack'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import PlusIcon from '@/shared/assets/svg/plus.svg?react'
import { useAddToUserPlaylist } from '../../model'
import { useAttachSoundtrackMutation } from '../../api'
import { type User, userVar } from '@/entities/user'
import { toast } from 'sonner'

import styles from './styles.module.scss'

interface MainButtonProps {
  onTrackAttached?(): void
}

export function AttachButton({ onTrackAttached }: MainButtonProps) {
  const user = useReactiveVar(userVar) as User

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
      toast.error(t('snackbar.trackSaveFail'), { duration: 3000 })
    }
  })

  const handleAttachClick = () => {
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
      onClick={handleAttachClick}
      startIcon={
        <SvgIcon className={styles.addIcon}>
          <PlusIcon />
        </SvgIcon>
      }
    >
      {t('common.save')}
    </Button>
  )
}
