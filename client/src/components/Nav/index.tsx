import React from 'react'
import SearchIcon from '@/assets/svg/search.svg?react'
import MusicListIcon from '@/assets/svg/list-music.svg?react'
import CogIcon from '@/assets/svg/cog.svg?react'
import { SvgIcon } from '@/components/ui/SvgIcon'
import { routeNames } from '@/utils/history'
import { useTranslation } from 'react-i18next'
import { Link, NavLink } from 'react-router-dom'

import styles from './Nav.module.scss'

export function Nav() {
  const { t } = useTranslation()

  return (
    <nav className={styles.container}>
      <NavLink to={routeNames.explore} className={styles.navLink}>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={routeNames.root} className={styles.navLink}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </NavLink>
      <NavLink to={routeNames.settings} className={styles.navLink}>
        <SvgIcon>
          <CogIcon />
        </SvgIcon>
      </NavLink>
      <Link to={routeNames.upload} className={styles.uploadLink}>
        <span>{t('layout.upload')}</span>
      </Link>
    </nav>
  )
}
