import React from 'react'
import { SvgIcon } from '@/components/ui/SvgIcon'
import ArrowIcon from '@/assets/svg/angle-arrow.svg?react'
import MusicListIcon from '@/assets/svg/list-music.svg?react'
import { useTranslation } from 'react-i18next'
import { Container, MinimizeButton, Title, PlaylistButton } from './TopControls.styled'

interface TopControlsProps {
  id: string
  onClose(): void
}

export function TopControls({ onClose }: TopControlsProps) {
  const { t } = useTranslation()

  return (
    <Container>
      <MinimizeButton withoutShadow onClick={onClose}>
        <SvgIcon>
          <ArrowIcon />
        </SvgIcon>
      </MinimizeButton>
      <Title>{t('player.header')}</Title>
      <PlaylistButton withoutShadow>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </PlaylistButton>
    </Container>
  )
}
