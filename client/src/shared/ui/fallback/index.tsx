import { Loader } from '@/shared/ui/loader'
import styles from './fallback.module.scss'

export function Fallback() {
  return (
    <div className={styles.container}>
      <Loader fallback />
    </div>
  )
}
