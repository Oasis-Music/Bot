import React from 'react'
import styled from 'styled-components'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'

const Container = styled.section`
  display: flex;
  padding: 15px 10px;
`

const ImageWrapper = styled.div`
  width: 150px;
  margin-right: 15px;
  border-radius: 15px;
  box-shadow: 0 0 0px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
    0 0 10px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);
`

const Details = styled.div`
  padding: 23px 7px 10px 0;
`

const TrackTitle = styled.h1`
  font-size: 17px;
  color: #fff;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
`
const AuthorTitle = styled.p`
  font-size: 14px;
  color: #878787;
  font-weight: 400;
  margin: 0;
`

const TEMP = {
  title: 'The Scientist',
  author: 'Cold play',
  coverImage: 'https://dl.muzonovs.ru/files/image/2020/12/morgenshtern-kristal-moyot.jpg'
}

const NowPlaying: React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <ImagePlaceholder src={TEMP.coverImage} altText={TEMP.title} />
      </ImageWrapper>
      <Details>
        <TrackTitle>{TEMP.title}</TrackTitle>
        <AuthorTitle>{TEMP.title}</AuthorTitle>
      </Details>
    </Container>
  )
}

export default NowPlaying
