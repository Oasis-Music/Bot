import { useEffect } from 'react'
import clsx from 'clsx'
import { Loader } from '@/shared/ui/loader'
import { useCheckAudioHashLazyQuery } from '../../../api'
import { soundtrackExists } from '@/shared/ui/toaster'
import { Soundtrack, SoundtrackItem } from '@/entities/soundtrack'
import { usePlaySoundtrack } from '@/entities/soundtrack'
import { useNavigate } from 'react-router-dom'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { toast } from 'sonner'

import styles from './styles.module.scss'

interface CheckExistenceProps {
  hash: string
  setExistance(exists: boolean): void
}

export function CheckExistence({ hash, setExistance }: CheckExistenceProps) {
  const navigate = useNavigate()
  const playSoundtrack = usePlaySoundtrack()

  const handleTrackClick = (track: Soundtrack) => {
    toast.dismiss()
    playSoundtrack(track)
    navigate(ROUTER_NAMES.root)
  }

  const [checkAudio, { loading }] = useCheckAudioHashLazyQuery({
    onError() {
      setExistance(false)
    },
    onCompleted(data) {
      if (data.checkAudioHash.__typename === 'Soundtrack') {
        const track = data.checkAudioHash
        setExistance(true)
        soundtrackExists({
          soundtrack: (
            <SoundtrackItem
              title={track.title}
              author={track.author}
              duration={track.duration}
              coverURL={track.coverURL || ''}
              isPlaying={false}
              onClick={() => handleTrackClick(track)}
            />
          )
        })
      }

      if (data.checkAudioHash.__typename === 'NotFound') {
        setExistance(false)
      }
    }
  })

  useEffect(() => {
    if (hash) {
      toast.dismiss()
      checkAudio({
        variables: { hash }
      })
    }
  }, [hash])

  return (
    <div className={clsx(styles.contaier, loading && styles.show)}>
      <p className={styles.title}>Проверка</p>
      <div className={styles.loaderWrapper}>
        <Loader adaptive />
      </div>
    </div>
  )
}
