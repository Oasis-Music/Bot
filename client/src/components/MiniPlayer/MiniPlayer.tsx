import React from 'react'
import styled, { css } from 'styled-components'
import IconButton from '../../shared/IconButton'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import SvgIcon from '../../shared/SvgIcon'
import { ReactComponent as PlayIcon } from '../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/svg/pause.svg'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../apollo/cache/variables'

interface MiniPlayerProps {
  onPlayerOpen(): void
  onPlayPause(): void
}

interface containerStylesProps {
  $isPlaying: boolean
}

const Container = styled.div<containerStylesProps>`
  display: flex;
  width: 100%;
  z-index: 100;
  height: 0;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 5px 5px 5px 7px;
  transform: translateY(100%);
  transition: transform 0.3s;
  visibility: hidden;
  ${({ $isPlaying }) =>
    $isPlaying &&
    css`
      visibility: visible;
      height: auto;
      transform: translateY(0);
    `}
`

const InnerContainer = styled.div`
  flex: 1 1 100%;
  min-width: 0;
  display: flex;
`

const ImageWrapper = styled.div`
  font-size: 2.5vh;
  margin-right: 7px;
  width: 10vh;
`

const InfoBox = styled.div`
  padding-top: 0.7vh;
  flex: 1 1 100%;
  min-width: 0;
`

const Title = styled.h3`
  color: #000;
  font-size: 2.7vh;
  margin: 0;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 18px;
  }
`
const Author = styled.p`
  color: #4e4e4e;
  font-size: 2vh;
  margin: 0;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 13px;
  }
`

const PlayBottonWrapper = styled.div`
  flex-basis: 18%;
  align-content: center;
  align-self: center;
  margin-left: auto;
  margin: 0 4%;
`

const PlayBotton = styled(IconButton)`
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
`

const MiniPlayer: React.FC<MiniPlayerProps> = ({ onPlayerOpen, onPlayPause }) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <Container $isPlaying={!!currentTrack.id}>
      <InnerContainer onClick={onPlayerOpen}>
        <ImageWrapper>
          <ImagePlaceholder src={currentTrack.coverImage} altText={currentTrack.title} />
        </ImageWrapper>
        <InfoBox>
          <Title>{currentTrack.title}</Title>
          <Author>{currentTrack.author}</Author>
        </InfoBox>
      </InnerContainer>
      <PlayBottonWrapper>
        <PlayBotton onClick={onPlayPause}>
          <SvgIcon>{currentTrack.isPlaying ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayBotton>
      </PlayBottonWrapper>
    </Container>
  )
}

export default MiniPlayer
