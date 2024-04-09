import clsx from 'clsx'
import { ImagePlaceholder } from '@/shared/ui/image-placeholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'
import { AttachButton } from '@/features/soundtrack/add-to-user-playlist'
import { UnattachButton } from '@/features/soundtrack/remove-from-user-playlist'
import { CopyInfoButton } from '@/features/soundtrack/copy-info'
import { ShareTrackButton } from '@/features/soundtrack/share-track'

import styles from './styles.module.scss'

interface HeadProps {
  trackCounter?: number
  onTrackAttach?(): void
  onTrackUnattach?(): void
}

export function Head({ onTrackAttach, onTrackUnattach }: HeadProps) {
  const track = useReactiveVar(currentTrackVar)

  return (
    <div>
      <div className={styles.inner}>
        <div className={styles.imageWrapper}>
          <div>
            <ImagePlaceholder src={track.coverURL} altText={track.title} />
          </div>
        </div>
        <div className={clsx(styles.detailsEmpty, track.id && styles.details)}>
          <h1 className={styles.title}>{track.title}</h1>
          <p className={styles.author}>{track.author}</p>
          {track.attached ? (
            <div className={styles.controls}>
              {/*  */}
              <UnattachButton className={styles.button} onTrackUnattached={onTrackUnattach} />
              {/*  */}
              <CopyInfoButton className={styles.button} />
              {/*  */}
              <ShareTrackButton className={styles.button} />
            </div>
          ) : (
            <div className={clsx(track.id && styles.attach)}>
              <AttachButton onTrackAttached={onTrackAttach} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
