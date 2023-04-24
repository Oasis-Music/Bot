import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import LazyLoad from 'react-lazy-load'
import SvgIcon from '../SvgIcon'
import { ReactComponent as PlaceholderImage } from '../../assets/svg/music.svg'
import './styles.css'

export interface ImagePlaceholderProps {
  src: string
  altText: string
  plain?: boolean
  backgroundColor?: string
}

interface StyleProps {
  $plain: boolean
  $backgroundColor?: string
}

interface ImageStyles {
  $loading: boolean
  $plain: boolean
}

const PlugIcon = styled(SvgIcon)`
  color: inherit;
  font-size: inherit;
`

const wrapperStyles = css<StyleProps>`
  display: block;
  outline: none;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  padding-top: ${({ $plain }) => ($plain ? '0px' : '100%')};
  height: ${({ $plain }) => ($plain ? '100%' : 'auto')};
`

const imageStyles = css`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100%;
  max-height: 100%;
  margin: auto;
  outline: none;
  object-fit: cover;
  user-select: none;
  transition: all 0.3s ease-in-out;
`

const Image = styled.img<ImageStyles>`
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
  border-radius: ${({ $plain }) => ($plain ? '10px' : '15px')};
  ${imageStyles}
`

const ImagePlug = styled.div<StyleProps>`
  border-radius: ${({ $plain }) => ($plain ? '10px' : '15px')};
  ${imageStyles}
`

const ShineBox = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  background-color: ${({ $backgroundColor }) => ($backgroundColor ? $backgroundColor : '#15191e')};
  border-radius: 15px;
  border-radius: ${({ $plain }) => ($plain ? '10px' : '15px')};
`

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  outline: none;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Wrapper = styled(LazyLoad)<{ $plain: boolean }>`
  ${wrapperStyles}
`

const PlugWrapper = styled.div`
  ${wrapperStyles}
`

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  src,
  altText,
  backgroundColor,
  plain = false
}) => {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [src])

  const placeholderPlug = (
    <ImagePlug $plain={plain}>
      <ShineBox $plain={plain} $backgroundColor={backgroundColor} />
      <ImageWrapper>
        <PlugIcon>
          <PlaceholderImage />
        </PlugIcon>
      </ImageWrapper>
    </ImagePlug>
  )

  const plainPlug = <ShineBox $plain={plain} $backgroundColor={backgroundColor} />

  if (src === '' || error) {
    return <PlugWrapper $plain={plain}>{plain ? plainPlug : placeholderPlug}</PlugWrapper>
  }

  const handleImageLoadErr = () => {
    setError(true)
  }

  return (
    <Wrapper $plain={plain}>
      <Image $plain={plain} $loading={false} src={src} alt={altText} onError={handleImageLoadErr} />
    </Wrapper>
  )
}

export default ImagePlaceholder
