import React from 'react'
import Controls from './Controls/Controls'
import { Container, WaveWrapper, TimeBox } from './Trackline.styled'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../../apollo/cache/variables'

interface TracklineProps extends React.ComponentPropsWithRef<'div'> {
  currentTime: string
  duration: string
  isReadyForPlay: boolean
  withLoop: boolean
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
}

const Trackline: React.ForwardRefRenderFunction<HTMLDivElement, TracklineProps> = (
  { currentTime, duration, isReadyForPlay, withLoop, onPlayPause, onPlayNext, onPlayPrev, onLoop },
  waveContainerRef
) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <Container>
      <WaveWrapper>
        <div ref={waveContainerRef} />
      </WaveWrapper>
      <TimeBox>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </TimeBox>
      <Controls
        isPlay={currentTrack.isPlaying}
        readyForPlay={isReadyForPlay}
        withLoop={withLoop}
        onPlayPause={onPlayPause}
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        onLoop={onLoop}
      />
    </Container>
  )
}

export default React.forwardRef(Trackline)
