import { LangSwitcher } from '@/entities/user'
import { Dropdown, type Option } from '@/shared/ui/dropdown'

import styles from './Settings.module.scss'

export default function Settings() {
  const optios: Option[] = [
    {
      title: 'English',
      value: 'en'
    },
    {
      title: 'Русский',
      value: 'ru'
    },
    {
      title: 'Українська',
      value: 'ua'
    }
  ]

  const handleLangChange = (value: string) => {
    console.log('lang changed to', value)
  }

  return (
    <div className={styles.container}>
      <LangSwitcher />
      <div style={{ paddingTop: '30px' }}>
        <Dropdown
          selected={optios[0]}
          placeholder="Choose lang"
          options={optios}
          onChange={handleLangChange}
        />
      </div>
    </div>
  )
}
