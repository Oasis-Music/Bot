import React from 'react'
import clsx from 'clsx'
import MusicListIcon from '@/shared/assets/svg/list-music.svg?react'
import ArrowIcon from '@/shared/assets/svg/angle-arrow.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { useTranslation } from 'react-i18next'

import styles from './TopControls.module.scss'

interface TopControlsProps {
  id: string
  onClose(): void
}

export function TopControls({ onClose }: TopControlsProps) {
  const { t } = useTranslation()

  return (
    <div className={styles.container}>
      <IconButton onClick={onClose} className={clsx(styles.control, styles.minimizeButton)}>
        <SvgIcon>
          <ArrowIcon />
        </SvgIcon>
      </IconButton>
      <span className={styles.title}>{t('player.header')}</span>
      <IconButton className={clsx(styles.control, styles.playlistButton)}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </IconButton>
    </div>
  )
}
