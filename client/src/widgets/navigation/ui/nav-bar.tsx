import { cva } from 'cva'
import { Icon } from '@/shared/ui/icon'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import styles from './navbar.module.css'

const navLink = cva(
  'inline-flex p-4 text-[24px] text-gray-400 transition-colors [&.active]:text-white'
)

export function NavBar() {
  const { t } = useTranslation()

  return (
    <nav className="relative z-40 flex items-center justify-center bg-black/50 backdrop-blur-xs">
      <Link to="/explore" className={navLink()}>
        <Icon name="common/search" />
      </Link>
      <Link to="/" className={navLink()}>
        <Icon name="common/list-music" />
      </Link>
      <Link to="/settings" className={navLink()}>
        <Icon name="common/settings" />
      </Link>
      <Link
        to="/upload"
        className="flex w-32 items-center justify-center rounded-xl border-2 border-[#2fc7bf] py-1.5"
      >
        <div className={styles.shine}>
          <span>{t('layout.upload')}</span>
        </div>
      </Link>
    </nav>
  )
}
