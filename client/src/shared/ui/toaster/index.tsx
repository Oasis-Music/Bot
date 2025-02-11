import { ReactNode } from 'react'
import { toast } from 'sonner'
import { IconButton } from '../icon-button'

import styles from './styles.module.scss'
import { Icon } from '../icon'

type soundtrackExistsProps = {
  soundtrack: ReactNode
}

export const soundtrackExists = ({ soundtrack }: soundtrackExistsProps) => {
  toast.custom(
    (t) => (
      <div className={styles.base}>
        <p>Трек уже существует</p>
        <div className={styles.track}>{soundtrack}</div>
        <IconButton onClick={() => toast.dismiss(t)} className={styles.closeButton}>
          <Icon name="common/play" />
        </IconButton>
      </div>
    ),
    {
      duration: Infinity
    }
  )
}
