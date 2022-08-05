import React from 'react'
import IconButton from '../../../../shared/IconButton'
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
  RepeatButton,
  RandomButton
} from './Controls.styled'

interface ControlsProps {
  isPlay: boolean
  onPlayPause?(): void
}

const Controls: React.FC<ControlsProps> = ({ isPlay, onPlayPause }) => {
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
      <PlayBotton withoutShadow onClick={onPlayPause}>
        <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
      </PlayBotton>
      {/*  */}
      <NextBotton withoutShadow>
        <SvgIcon>
          <ArrowAltIcon />
        </SvgIcon>
      </NextBotton>
      {/*  */}
      <RepeatButton withoutShadow>
        <SvgIcon>
          <RepeatIcon />
        </SvgIcon>
      </RepeatButton>
    </Container>
  )
}

export default Controls
