import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from '../../shared/IconButton'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import { ReactComponent as PlayIcon } from '../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/svg/pause.svg'
import SvgIcon from '../../shared/SvgIcon'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar, isPlayingVar, currentTrackIdVar } from '../../apollo/cache/variables'
import { SoundtrackMutations } from '../../apollo/cache/mutations'

interface MiniPlayerProps {
  onPlayerOpen(): void
}

interface containerStylesProps {
  $isPlaying: boolean
}

const Container = styled.div<containerStylesProps>`
  display: flex;
  z-index: 100;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 5px 20px 5px 7px;
  transform: translateY(100%);
  transition: transform 0.3s;
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      transform: translateY(0);
    `}
`

const InnerContainer = styled.div`
  display: flex;
  width: 100%;
`

const ImageWrapper = styled.div`
  margin-right: 7px;
  width: 10vh;
  @media ${({ theme }) => theme.media.hxs} {
    width: 75px;
    height: 75px;
  }
`

const InfoBox = styled.div`
  font-size: 2.7vh;
  padding-top: 0.7vh;
  max-width: 275px;
  @media ${({ theme }) => theme.media.hxs} {
    padding-top: 7px;
    font-size: 16px;
  }
`

const Title = styled.h3`
  margin: 0;
  font-weight: 500;
`
const Author = styled.p`
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const PlayBottonWrapper = styled.div`
  align-content: center;
  align-self: center;
  margin-left: auto;
  padding-left: 15px;
`

const PlayBotton = styled(IconButton)`
  && {
    color: #fff;
    background-color: #1b1818;
    font-size: 2.7vh;
    padding: 2vh;
    box-shadow: none;
    &:disabled {
      box-shadow: none;
    }
    &:hover:not(:disabled) {
      background-color: #1b1818;
    }
    @media ${({ theme }) => theme.media.hxs} {
      font-size: 17px;
      padding: 15px;
    }
  }
`

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onPlayerOpen }) => {
  const isPlay = useReactiveVar(isPlayingVar)
  const trackId = useReactiveVar(currentTrackIdVar)
  const track = useReactiveVar(currentTrackVar)

  const playButtonHandler = () => {
    SoundtrackMutations.playPouse()
  }

  return (
    <Container $isPlaying={!!trackId}>
      <InnerContainer onClick={onPlayerOpen}>
        <ImageWrapper>
          <ImagePlaceholder src={track.coverImage} plain altText={track.title} />
        </ImageWrapper>
        <InfoBox>
          <Title>{track.title}</Title>
          <Author>{track.author}</Author>
        </InfoBox>
      </InnerContainer>
      <PlayBottonWrapper>
        <PlayBotton onClick={playButtonHandler}>
          <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayBotton>
      </PlayBottonWrapper>
    </Container>
  )
}

export default MiniPlayer
