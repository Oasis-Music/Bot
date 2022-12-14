import React from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { Container, ImageWrapper, Title, Author } from './Details.styled'
import { currentTrackVar } from '../../../apollo/cache/variables'
import { useReactiveVar } from '@apollo/client'

interface DetailsProps {
  title: string
  author: string
  coverImageURL: string
}

const Details: React.FC<DetailsProps> = ({ coverImageURL, title, author }) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <Container>
      <ImageWrapper $stopPlaying={!currentTrack.isPlaying}>
        <ImagePlaceholder src={coverImageURL} altText={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Container>
  )
}

export default Details
