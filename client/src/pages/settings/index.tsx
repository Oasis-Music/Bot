import { LangSelector } from '@/features/user/change-lang'
import styles from './Settings.module.scss'

export default function Settings() {
  return (
    <div className={styles.container}>
      <LangSelector />
    </div>
  )
}
