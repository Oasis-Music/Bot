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
  withLoop: boolean
  onClose(): void
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
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
  {
    isOpen,
    currentTime,
    duration,
    isReadyForPlay,
    withLoop,
    onPlayPause,
    onPlayNext,
    onPlayPrev,
    onLoop,
    onClose
  },
  waveContainerRef
) => {
  const track = useReactiveVar(currentTrackVar)

  return (
    <Container $open={isOpen}>
      <TopControls id={track.id} onClose={onClose} />
      <Details title={track.title} author={track.author} coverImage={track.coverURL} />
      <Trackline
        ref={waveContainerRef}
        currentTime={currentTime}
        duration={duration}
        isReadyForPlay={isReadyForPlay}
        withLoop={withLoop}
        onPlayPause={onPlayPause}
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        onLoop={onLoop}
      />
    </Container>
  )
}

export default React.forwardRef(Player)
