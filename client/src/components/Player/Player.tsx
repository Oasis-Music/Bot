import React from 'react'
import styled, { css } from 'styled-components'
import TopControls from './TopControls/TopControls'
import Details from './Details/Details'
import Trackline from './Trackline/Trackline'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'

interface PlayerProps {
  isOpen: boolean
  onClose(): void
}

interface containerStylesProps {
  $open: boolean
}

const Container = styled.div<containerStylesProps>`
  position: fixed;
  top: 0;
  width: 100%;
  left: 0;
  height: 100%;
  background-color: #101318;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s;
  ${({ $open }) =>
    $open &&
    css`
      transform: translateY(0);
    `}
`

const Player: React.FC<PlayerProps> = ({ isOpen, onClose }) => {
  const track = useReactiveVar(currentTrackVar)

  return (
    <Container $open={isOpen}>
      <TopControls id={track.id} onClose={onClose} />
      <Details title={track.title} author={track.author} coverImageURL={track.coverImage} />
      <Trackline soundtrack={track.fileURL} />
    </Container>
  )
}

export default Player
