import React from 'react'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/apollo/cache/variables'
import { Container, ImageWrapper, Title, Author } from './Details.styled'

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
