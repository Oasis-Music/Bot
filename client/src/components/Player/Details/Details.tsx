import React from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { isPlayingVar } from '../../../apollo/cache/variables'
import { Container, ImageWrapper, Title, Author } from './Details.styled'
import { useReactiveVar } from '@apollo/client'

interface DetailsProps {
  title: string
  author: string
  coverImageURL: string
}

const Details: React.FC<DetailsProps> = ({ coverImageURL, title, author }) => {
  const isPlay = useReactiveVar(isPlayingVar)

  return (
    <Container>
      <ImageWrapper $stopPlaying={!isPlay}>
        <ImagePlaceholder src={coverImageURL} altText={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Container>
  )
}

export default Details
