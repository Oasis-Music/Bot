import React, { useState } from 'react'
import styled from 'styled-components'
import IconButton from '../../shared/IconButton'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import { ReactComponent as PlayIcon } from '../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/svg/pause.svg'
import SvgIcon from '../../shared/SvgIcon'

interface MiniPlayerProps {
  onPlayerOpen(): void
}

const Container = styled.div`
  display: flex;
  z-index: 100;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 5px 20px 5px 7px;
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
`

const TEMP_DATA = {
  id: 's001',
  title: 'The Scientist',
  author: 'Cold Play',
  coverImageURL: 'https://dl.muzonovs.ru/files/image/2020/12/morgenshtern-kristal-moyot.jpg'
}

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
  const [isPlay, setIsPlay] = useState<boolean>(true)

  const playButtonHandler = () => {
    setIsPlay(!isPlay)
  }

  return (
    <Container>
      <InnerContainer onClick={onPlayerOpen}>
        <ImageWrapper>
          <ImagePlaceholder src={TEMP_DATA.coverImageURL} plain altText={TEMP_DATA.title} />
        </ImageWrapper>
        <InfoBox>
          <Title>{TEMP_DATA.title}</Title>
          <Author>{TEMP_DATA.author}</Author>
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
