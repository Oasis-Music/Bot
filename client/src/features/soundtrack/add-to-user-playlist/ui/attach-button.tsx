import { currentTrackVar } from '@/entities/soundtrack'
import { useReactiveVar } from '@apollo/client'
import { useTranslation } from 'react-i18next'
import { Button } from '@/shared/ui/button'
import { useAddToUserPlaylist } from '../model'
import { useAttachSoundtrackMutation } from '../api'
import { toast } from 'sonner'
import { type User, userVar } from '@/entities/user'

export function AttachButton({ onTrackAttached }: { onTrackAttached?(): void }) {
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
    <Button disabled={!track.id} loading={loading} onClick={handleAttachClick}>
      {t('common.save')}
    </Button>
  )
}
