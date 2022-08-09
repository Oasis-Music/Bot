import React from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg'
import {
  Container,
  ImageWrapper,
  Details,
  TrackTitle,
  AuthorTitle,
  AddBotton,
  AddIcon
} from './NowPlaying.styled'

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
        <AddBotton
          fullWidth
          disableShadow
          startIcon={
            <AddIcon>
              <PlusIcon />
            </AddIcon>
          }
        >
          Add Song
        </AddBotton>
      </Details>
    </Container>
  )
}

export default NowPlaying
