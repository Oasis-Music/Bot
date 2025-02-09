import { cva } from 'cva'
import SearchIcon from '@/shared/assets/svg/search.svg?react'
import MusicListIcon from '@/shared/assets/svg/list-music.svg?react'
import CogIcon from '@/shared/assets/svg/cog.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import styles from './navbar.module.css'

const navLink = cva('inline-flex p-4 text-base transition-colors', {
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
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={ROUTER_NAMES.root} className={({ isActive }) => navLink({ isActive })}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={ROUTER_NAMES.settings} className={({ isActive }) => navLink({ isActive })}>
        <SvgIcon>
          <CogIcon />
        </SvgIcon>
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
