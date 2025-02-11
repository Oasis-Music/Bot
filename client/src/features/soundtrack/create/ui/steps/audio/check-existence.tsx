import { useEffect } from 'react'
import { cva } from 'cva'
import { Loader } from '@/shared/ui/loader'
import { useCheckAudioHashLazyQuery } from '../../../api'
import { soundtrackExists } from '@/shared/ui/toaster'
import { Soundtrack, SoundtrackItem } from '@/entities/soundtrack'
import { usePlaySoundtrack } from '@/entities/soundtrack'
import { useNavigate } from 'react-router-dom'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { toast } from 'sonner'

const container = cva('mb-2 ml-2.5 flex items-center justify-end pr-4', {
  variants: {
    show: {
      true: 'visible',
      false: 'invisible'
    }
  }
})

export function CheckExistence({
  hash,
  setExistance
}: {
  hash: string
  setExistance(exists: boolean): void
}) {
  const navigate = useNavigate()
  const playSoundtrack = usePlaySoundtrack()

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

  const handleTrackClick = (track: Soundtrack) => {
    toast.dismiss()
    playSoundtrack(track)
    navigate(ROUTER_NAMES.root)
  }

  return (
    <div className={container({ show: loading })}>
      <p>Проверка</p>
      <div className="ml-1 size-4">
        <Loader adaptive />
      </div>
    </div>
  )
}
