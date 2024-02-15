import React, { forwardRef } from 'react'
import { Container, WaveWrapper, TimeBox } from './Trackline.styled'

interface TracklineProps extends React.ComponentPropsWithRef<'div'> {
  currentTime: string
  duration: string
}

const Trackline: React.ForwardRefRenderFunction<HTMLDivElement, TracklineProps> = (
  { currentTime, duration },
  waveContainerRef
) => {
  return (
    <Container>
      <WaveWrapper>
        <div ref={waveContainerRef} />
      </WaveWrapper>
      <TimeBox>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </TimeBox>
    </Container>
  )
}

export default forwardRef(Trackline)
