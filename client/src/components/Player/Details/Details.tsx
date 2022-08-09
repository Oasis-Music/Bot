import React from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'

import { Container, ImageWrapper, Title, Author } from './Details.styled'

interface DetailsProps {
  title: string
  author: string
  coverImageURL: string
}

const Details: React.FC<DetailsProps> = ({ coverImageURL, title, author }) => {
  return (
    <Container>
      <ImageWrapper>
        <ImagePlaceholder src={coverImageURL} altText={title} />
      </ImageWrapper>
      <Title>{title}</Title>
      <Author>{author}</Author>
    </Container>
  )
}

export default Details
