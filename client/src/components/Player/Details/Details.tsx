import React from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { Container, ImageWrapper, Title, Author } from './Details.styled'
import { currentTrackVar } from '../../../apollo/cache/variables'
import { useReactiveVar } from '@apollo/client'

interface DetailsProps {
  title: string
  author: string
  coverImage?: string | null | undefined
}

const Details: React.FC<DetailsProps> = ({ coverImage, title, author }) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <Container>
      <ImageWrapper $stopPlaying={!currentTrack.isPlaying}>
        <ImagePlaceholder
          backgroundColor="rgba(21,25,30, 0.8)"
          src={coverImage || ''}
          altText={title}
        />
      </ImageWrapper>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Container>
  )
}

export default Details
