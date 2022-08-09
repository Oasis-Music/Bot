import React from 'react'
import styled from 'styled-components'
import ImagePlaceholder from '../../shared/ImagePlaceholder'
import ScaleLoader from '../../shared/Loader'
import { timeFormater } from '../../utils/helpers'

interface PlaylistItemProps {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  isPlaying: boolean
}

const Container = styled.li`
  display: flex;
  align-items: center;
  margin: 11px 0;
  padding: 0 11px 0 7px;
`

const ImageWrapper = styled.div`
  margin-right: 7px;
  width: 50px;
  height: 50px;
`

const InfoBox = styled.div``

const TrackTitle = styled.p`
  font-size: 15px;
  color: #fff;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
`
const AuthorTitle = styled.p`
  font-size: 11px;
  color: #bbbbbb;
  font-weight: 400;
  margin: 0;
`

const SideBox = styled.div`
  margin-left: auto;
  font-size: 16px;
  margin-left: auto;
  color: #878787;
  font-weight: 400;
`

const PlaylistItem: React.FC<PlaylistItemProps> = ({
  id,
  title,
  author,
  duration,
  coverImage,
  isPlaying
}) => {
  return (
    <Container>
      <ImageWrapper>
        <ImagePlaceholder plain src={coverImage} altText={title} />
      </ImageWrapper>
      <InfoBox>
        <TrackTitle>{title}</TrackTitle>
        <AuthorTitle>{author}</AuthorTitle>
      </InfoBox>
      <SideBox>
        {isPlaying ? <ScaleLoader fallback /> : <span>{timeFormater(duration)}</span>}
      </SideBox>
    </Container>
  )
}

export default PlaylistItem