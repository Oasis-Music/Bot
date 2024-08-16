import SearchIcon from '@/shared/assets/svg/search.svg?react'
import MusicListIcon from '@/shared/assets/svg/list-music.svg?react'
import CogIcon from '@/shared/assets/svg/cog.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import styles from './navbar.module.scss'

export function NavBar() {
  const { t } = useTranslation()

  return (
    <nav className={styles.container}>
      <NavLink to={ROUTER_NAMES.explore} className={styles.navLink}>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={ROUTER_NAMES.root} className={styles.navLink}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={ROUTER_NAMES.settings} className={styles.navLink}>
        <SvgIcon>
          <CogIcon />
        </SvgIcon>
      </NavLink>
      <Link to={ROUTER_NAMES.upload} className={styles.uploadLink}>
        <span>{t('layout.upload')}</span>
      </Link>
    </nav>
  )
}
