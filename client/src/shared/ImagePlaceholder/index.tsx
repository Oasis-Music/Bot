import React from 'react'
import styled, { css, keyframes } from 'styled-components'
import { ReactComponent as PlaceholderImage } from '../../assets/svg/music.svg'
import ProgressiveImage from 'react-progressive-graceful-image'
import SvgIcon from '../SvgIcon'

export interface ImagePlaceholderProps {
  src: string
  altText: string
  plain?: boolean
}

interface StyleProps {
  $plain: boolean
}

const PlugIcon = styled(SvgIcon)`
  color: #515151;
  font-size: 40px;
`

const Box = styled.picture<StyleProps>`
  display: block;
  outline: none;
  position: relative;
  overflow: hidden;
  transform: translateZ(0);
  padding-top: ${({ $plain }) => ($plain ? '0px' : '100%')};
  height: ${({ $plain }) => ($plain ? '100%' : 'auto')};
`

const imageStyles = css<StyleProps>`
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
  border-radius: ${({ $plain }) => ($plain ? '10px' : '15px')};
`

const Image = styled.img`
  ${imageStyles}
`

const ImagePlug = styled.div`
  ${imageStyles}
`

const shineAnimation = keyframes`
    0% {
        background-position: 0% 0%;  
    }
    100% {
        background-position: -135% 0%;
    }
`

const ShineBox = styled.div<StyleProps>`
  width: 100%;
  height: 100%;
  transition: 0.3s;
  background: linear-gradient(-90deg, #efefef 0%, #fcfcfc 50%, #efefef 100%);
  background-size: 300% 300%;
  opacity: 0.8;
  border-radius: 15px;
  animation: ${shineAnimation} 1.3s infinite;
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

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ src, altText, plain = false }) => {
  const placeholderPlug = (
    <ImagePlug $plain={plain}>
      <ShineBox $plain={plain} />
      <ImageWrapper>
        <PlugIcon>
          <PlaceholderImage />
        </PlugIcon>
      </ImageWrapper>
    </ImagePlug>
  )

  const plainPlug = <ShineBox $plain={plain} />

  const plug = plain ? plainPlug : placeholderPlug

  return (
    <Box $plain={plain}>
      <ProgressiveImage src={src} placeholder="">
        {(src, loading) => {
          return loading ? plug : <Image $plain={plain} src={src} alt={altText} />
        }}
      </ProgressiveImage>
    </Box>
  )
}

export default ImagePlaceholder
