import React from 'react'
import styled, { css } from 'styled-components'
import TopControls from './TopControls/TopControls'
import Details from './Details/Details'
import Trackline from './Trackline/Trackline'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'

interface PlayerProps extends React.ComponentPropsWithRef<'div'> {
  currentTime: string
  duration: string
  isOpen: boolean
  isReadyForPlay: boolean
  onClose(): void
  onPlayPause(): void
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
  overflow-y: auto;
  z-index: 999;
  transform: translateY(100%);
  transition: transform 0.3s;
  ${({ $open }) =>
    $open &&
    css`
      transform: translateY(0);
    `}
`

const Player: React.ForwardRefRenderFunction<HTMLDivElement, PlayerProps> = (
  { isOpen, currentTime, duration, onClose, isReadyForPlay, onPlayPause },
  waveContainerRef
) => {
  const track = useReactiveVar(currentTrackVar)

  return (
    <Container $open={isOpen}>
      <TopControls id={track.id} onClose={onClose} />
      <Details title={track.title} author={track.author} coverImageURL={track.coverImage} />
      <Trackline
        ref={waveContainerRef}
        currentTime={currentTime}
        duration={duration}
        isReadyForPlay={isReadyForPlay}
        onPlayPause={onPlayPause}
      />
    </Container>
  )
}

export default React.forwardRef(Player)
