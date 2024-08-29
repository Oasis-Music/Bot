import { ReactNode } from 'react'
import { toast } from 'sonner'
import styles from './styles.module.scss'

type soundtrackExistsProps = {
  soundtrack: ReactNode
}

export const soundtrackExists = ({ soundtrack }: soundtrackExistsProps) => {
  toast.custom(
    (t) => (
      <div className={styles.base} onClick={() => toast.dismiss(t)}>
        <p>Трек уже существует</p>
        <div className={styles.track}>{soundtrack}</div>
      </div>
    ),
    {
      duration: Infinity
    }
  )
}
