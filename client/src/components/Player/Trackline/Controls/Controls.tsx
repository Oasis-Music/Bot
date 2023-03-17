import React from 'react'
import { ReactComponent as PlayIcon } from '../../../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../../../assets/svg/pause.svg'
import { ReactComponent as ArrowAltIcon } from '../../../../assets/svg/arrow-alt.svg'
import { ReactComponent as RepeatIcon } from '../../../../assets/svg/repeat.svg'
import { ReactComponent as RandomIcon } from '../../../../assets/svg/random.svg'
import SvgIcon from '../../../../shared/SvgIcon'
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
  isLoop: boolean
  onPlayPause?(): void
  onLoop(): void
  onPlayNext(): void
  onPlayPrev(): void
}

const Controls: React.FC<ControlsProps> = ({
  isPlay,
  isLoop,
  readyForPlay,
  onPlayPause,
  onPlayNext,
  onPlayPrev,
  onLoop
}) => {
  return (
    <Container>
      <RandomButton withoutShadow>
        <SvgIcon>
          <RandomIcon />
        </SvgIcon>
      </RandomButton>
      {/*  */}
      <PrevButton withoutShadow onClick={onPlayPrev}>
        <PrevArrowIcon>
          <ArrowAltIcon />
        </PrevArrowIcon>
      </PrevButton>
      {/*  */}
      <PlayButtonBox>
        <PlayButton disabled={!readyForPlay} withoutShadow onClick={onPlayPause}>
          <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayButton>
      </PlayButtonBox>
      {/*  */}
      <NextButton withoutShadow onClick={onPlayNext}>
        <SvgIcon>
          <ArrowAltIcon />
        </SvgIcon>
      </NextButton>
      {/*  */}
      <LoopButton $loop={isLoop} onClick={onLoop} withoutShadow>
        <SvgIcon>
          <RepeatIcon />
        </SvgIcon>
      </LoopButton>
    </Container>
  )
}

export default Controls
