import { cva } from 'cva'
import { Icon } from '@/shared/ui/icon'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ROUTER_NAMES } from '@/shared/constants/routes'

import styles from './navbar.module.css'

const navLink = cva('inline-flex p-4 text-[24px] transition-colors', {
  variants: {
    isActive: {
      true: 'text-white',
      false: 'text-slate-300'
    }
  }
})

export function NavBar() {
  const { t } = useTranslation()

  return (
    <nav className="relative z-40 flex items-center justify-center bg-[#070c13]">
      <NavLink to={ROUTER_NAMES.explore} className={({ isActive }) => navLink({ isActive })}>
        <Icon name="common/search" />
      </NavLink>
      <NavLink to={ROUTER_NAMES.root} className={({ isActive }) => navLink({ isActive })}>
        <Icon name="common/list-music" />
      </NavLink>
      <NavLink to={ROUTER_NAMES.settings} className={({ isActive }) => navLink({ isActive })}>
        <Icon name="common/settings" />
      </NavLink>
      <Link
        to={ROUTER_NAMES.upload}
        className="flex w-32 items-center justify-center rounded-xl border-2 border-[#2fc7bf] py-1.5"
      >
        <div className={styles.shine}>
          <span>{t('layout.upload')}</span>
        </div>
      </Link>
    </nav>
  )
}
