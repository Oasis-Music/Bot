import React from 'react'
import SvgIcon from '../../../shared/SvgIcon'
import { ReactComponent as ArrowIcon } from '../../../assets/svg/angle-arrow.svg'
import { ReactComponent as MusicListIcon } from '../../../assets/svg/list-music.svg'

import { Container, MinimizeButton, Title, PlaylistButton } from './TopControls.styled'

interface TopControlsProps {
  id: string
}

const TopControls: React.FC<TopControlsProps> = () => {
  return (
    <Container>
      <MinimizeButton withoutShadow>
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
