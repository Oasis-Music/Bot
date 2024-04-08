import { LangSwitcher } from '@/entities/user'
import styles from './Settings.module.scss'

export default function Settings() {
  return (
    <div className={styles.container}>
      <LangSwitcher />
    </div>
  )
}
