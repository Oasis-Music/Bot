import React from 'react'
import SvgIcon from '../../../shared/SvgIcon'
import { ReactComponent as ArrowIcon } from '../../../assets/svg/angle-arrow.svg'
import { ReactComponent as MusicListIcon } from '../../../assets/svg/list-music.svg'

import { Container, MinimizeButton, Title, PlaylistButton } from './TopControls.styled'

interface TopControlsProps {
  id: string
  onClose(): void
}

const TopControls: React.FC<TopControlsProps> = ({ onClose }) => {
  return (
    <Container>
      <MinimizeButton withoutShadow onClick={onClose}>
        <SvgIcon>
          <ArrowIcon />
        </SvgIcon>
      </MinimizeButton>
      <Title>Now Playing</Title>
      <PlaylistButton withoutShadow>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </PlaylistButton>
    </Container>
  )
}

export default TopControls
