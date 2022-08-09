import React from 'react'
import { ReactComponent as PlayIcon } from '../../../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../../../assets/svg/pause.svg'
import { ReactComponent as ArrowAltIcon } from '../../../../assets/svg/arrow-alt.svg'
import { ReactComponent as RepeatIcon } from '../../../../assets/svg/repeat.svg'
import { ReactComponent as RandomIcon } from '../../../../assets/svg/random.svg'
import SvgIcon from '../../../../shared/SvgIcon'
import {
  Container,
  PlayBotton,
  PrevBotton,
  NextBotton,
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
}

const Controls: React.FC<ControlsProps> = ({
  isPlay,
  isLoop,
  readyForPlay,
  onPlayPause,
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
      <PrevBotton withoutShadow color="primary">
        <PrevArrowIcon>
          <ArrowAltIcon />
        </PrevArrowIcon>
      </PrevBotton>
      {/*  */}
      <PlayBotton disabled={!readyForPlay} withoutShadow onClick={onPlayPause}>
        <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
      </PlayBotton>
      {/*  */}
      <NextBotton withoutShadow>
        <SvgIcon>
          <ArrowAltIcon />
        </SvgIcon>
      </NextBotton>
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
