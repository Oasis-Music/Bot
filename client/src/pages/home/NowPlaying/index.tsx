import { useEffect, useState } from 'react'
import ShareIcon from '@/shared/assets/svg/share.svg?react'
import CopyIcon from '@/shared/assets/svg/copy.svg?react'
import CheckIcon from '@/shared/assets/svg/check-circle.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { AttachButton } from '@/features/soundtrack/add-to-user-playlist'
import { UnattachButton } from '@/features/soundtrack/remove-from-user-playlist'

import styles from './NowPlaying.module.scss'

interface NowPlayingProps {
  trackCounter?: number
  onTrackAttach?(): void
  onTrackUnattach?(): void
}

export function NowPlaying({ onTrackAttach, onTrackUnattach }: NowPlayingProps) {
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
    <div>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <div>
            <ImagePlaceholder src={track.coverURL} altText={track.title} />
          </div>
        </div>
        <div className={styles.details}>
          <h1 className={styles.title}>{track.title}</h1>
          <p className={styles.author}>{track.author}</p>
          {track.attached ? (
            <div className={styles.controls}>
              {/*  */}
              <UnattachButton onTrackUnattached={onTrackUnattach} />
              {/*  */}
              <IconButton onClick={onCopyTrackInfo} className={styles.button}>
                <SvgIcon>{wasCopied ? <CheckIcon /> : <CopyIcon />}</SvgIcon>
              </IconButton>
              <IconButton className={styles.button}>
                <SvgIcon>
                  <ShareIcon />
                </SvgIcon>
              </IconButton>
            </div>
          ) : (
            <AttachButton onTrackAttached={onTrackAttach} />
          )}
        </div>
      </div>
    </div>
  )
}
