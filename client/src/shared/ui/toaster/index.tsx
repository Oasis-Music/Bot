import { ReactNode } from 'react'
import { toast } from 'sonner'
import { IconButton } from '../icon-button'
import { SvgIcon } from '../svg-icon'
import PlusIcon from '@/shared/assets/svg/plus.svg?react'

import styles from './styles.module.scss'

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
          <SvgIcon>
            <PlusIcon />
          </SvgIcon>
        </IconButton>
      </div>
    ),
    {
      duration: Infinity
    }
  )
}
