import React, { useState } from 'react'
import styled from 'styled-components'
import IconButton from '../../shared/IconButton'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import { ReactComponent as PlayIcon } from '../../assets/svg/play.svg'
import { ReactComponent as PauseIcon } from '../../assets/svg/pause.svg'
import SvgIcon from '../../shared/SvgIcon'

const Container = styled.div`
  display: flex;
  background-color: #fff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 5px 20px 5px 7px;
`

const ImageWrapper = styled.div`
  margin-right: 7px;
  width: 75px;
  height: 75px;
`

const InfoBox = styled.div`
  padding-top: 7px;
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
`

const PlayBotton = styled(IconButton)`
  && {
    color: #fff;
    background-color: #1b1818;
    font-size: 17px;
    padding: 15px;
    box-shadow: none;
    &:disabled {
      box-shadow: none;
    }
    &:hover:not(:disabled) {
      background-color: #1b1818;
    }
  }
`

const MiniPlayer: React.FC = () => {
  const [isPlay, setIsPlay] = useState<boolean>(true)

  const playButtonHandler = () => {
    setIsPlay(!isPlay)
  }

  return (
    <Container>
      <ImageWrapper>
        <ImagePlaceholder src={TEMP_DATA.coverImageURL} plain altText={TEMP_DATA.title} />
      </ImageWrapper>
      <InfoBox>
        <Title>{TEMP_DATA.title}</Title>
        <Author>{TEMP_DATA.author}</Author>
      </InfoBox>
      <PlayBottonWrapper>
        <PlayBotton onClick={playButtonHandler}>
          <SvgIcon>{isPlay ? <PauseIcon /> : <PlayIcon />}</SvgIcon>
        </PlayBotton>
      </PlayBottonWrapper>
    </Container>
  )
}

export default MiniPlayer
