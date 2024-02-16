import React from 'react'
import PlayIcon from '@/assets/svg/play.svg?react'
import PauseIcon from '@/assets/svg/pause.svg?react'
import ArrowAltIcon from '@/assets/svg/arrow-alt.svg?react'
import RepeatIcon from '@/assets/svg/repeat.svg?react'
import RandomIcon from '@/assets/svg/random.svg?react'
import { SvgIcon } from '@/components/ui/SvgIcon'
import {
  Container,
  PlayButtonBox,
  PlayButton,
  PrevButton,
  NextButton,
  PrevArrowIcon,
  LoopButton,
  RandomButton
} from './Controls.styled'

interface ControlsProps {
  isPlay: boolean
  readyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onPlayPause?(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
}

export function Controls({
  isPlay,
  withLoop,
  withRandom,
  readyForPlay,
  onPlayPause,
  onPlayNext,
  onPlayPrev,
  onLoop,
  onRandom
}: ControlsProps) {
  return (
    <Container>
      <RandomButton $random={withRandom} onClick={onRandom}>
        <SvgIcon>
          <RandomIcon />
        </SvgIcon>
      </RandomButton>
      {/*  */}
      <PrevButton onClick={onPlayPrev}>
        <PrevArrowIcon>
          <ArrowAltIcon />
        </PrevArrowIcon>
      </PrevButton>
      {/*  */}
      <PlayButtonBox>
        <PlayButton disabled={!readyForPlay} $isPlay={isPlay} onClick={onPlayPause}>
          <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayButton>
      </PlayButtonBox>
      {/*  */}
      <NextButton onClick={onPlayNext}>
        <SvgIcon>
          <ArrowAltIcon />
        </SvgIcon>
      </NextButton>
      {/*  */}
      <LoopButton $loop={withLoop} onClick={onLoop}>
        <SvgIcon>
          <RepeatIcon />
        </SvgIcon>
      </LoopButton>
    </Container>
  )
}
