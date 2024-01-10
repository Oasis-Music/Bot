import React from 'react'
import SvgIcon from '../../../shared/SvgIcon'
import ArrowIcon from '../../../assets/svg/angle-arrow.svg?react'
import MusicListIcon from '../../../assets/svg/list-music.svg?react'

import { Container, MinimizeButton, Title, PlaylistButton } from './TopControls.styled'
import { useTranslation } from 'react-i18next'

interface TopControlsProps {
  id: string
  onClose(): void
}

const TopControls: React.FC<TopControlsProps> = ({ onClose }) => {
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

export default TopControls
