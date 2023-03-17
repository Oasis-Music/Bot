import React, { useState } from 'react'
import Controls from './Controls/Controls'
import { Container, WaveWrapper, TimeBox } from './Trackline.styled'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../../apollo/cache/variables'

interface TracklineProps extends React.ComponentPropsWithRef<'div'> {
  currentTime: string
  duration: string
  isReadyForPlay: boolean
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
}

const Trackline: React.ForwardRefRenderFunction<HTMLDivElement, TracklineProps> = (
  { currentTime, duration, isReadyForPlay, onPlayPause, onPlayNext, onPlayPrev },
  waveContainerRef
) => {
  const [loop, setLoop] = useState<boolean>(false)

  const currentTrack = useReactiveVar(currentTrackVar)

  const loopButtonHandler = () => {
    setLoop(!loop)
  }

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
        isLoop={loop}
        onPlayPause={onPlayPause}
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        onLoop={loopButtonHandler}
      />
    </Container>
  )
}

export default React.forwardRef(Trackline)
