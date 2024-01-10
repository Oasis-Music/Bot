import React from 'react'
import styled, { css } from 'styled-components'
import TopControls from './TopControls'
import Details from './Details'
import Trackline from './Trackline'
import Controls from './Controls'
import { timeFormater } from '@/utils/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/apollo/cache/variables'

interface PlayerProps extends React.ComponentPropsWithRef<'div'> {
  currentTime: string
  isOpen: boolean
  isReadyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onClose(): void
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
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
    isReadyForPlay,
    withLoop,
    withRandom,
    onPlayPause,
    onPlayNext,
    onPlayPrev,
    onLoop,
    onRandom,
    onClose
  },
  waveContainerRef
) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <Container $open={isOpen}>
      <TopControls id={currentTrack.id} onClose={onClose} />
      <Details
        title={currentTrack.title}
        author={currentTrack.author}
        coverImage={currentTrack.coverURL}
      />
      <Trackline
        ref={waveContainerRef}
        currentTime={currentTime}
        duration={timeFormater(currentTrack.duration)}
      />
      <Controls
        isPlay={currentTrack.isPlaying}
        readyForPlay={isReadyForPlay}
        withLoop={withLoop}
        withRandom={withRandom}
        onPlayPause={onPlayPause}
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        onLoop={onLoop}
        onRandom={onRandom}
      />
    </Container>
  )
}

export default React.forwardRef(Player)
