import React, { useState } from 'react'
import styled from 'styled-components'

import Info from './Info/Info'
import Cover from './Cover/Cover'
import Audio from './Audio/Audio'

interface sty {
  $page: number
}

const Container = styled.div<sty>`
  width: 100%;
  background-color: #101318;
  display: flex;
  transform: ${(props) => `translate3d(${props.$page}px, 0, 0)`};
  transition: transform 0.3s;
  /* overflow: hidden; */
  & > div {
    width: 100vw;
    height: 500px;
    flex-shrink: 0;
    box-sizing: border-box;
  }
`

interface SlideStyles {
  $color: string
}

const Slide = styled.div<SlideStyles>`
  /* width: calc(100 * var(--vw)); */
  width: 100vw;
  background-color: ${(props) => props.$color};
`

interface Track {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  fileURL: string
}

const Upload: React.FC = () => {
  const [page, setPage] = useState<number>(0)

  const slideNext = () => {
    setPage((prev) => prev + 1)
  }

  const slidePrev = () => {
    setPage((prev) => prev - 1)
  }

  // useEffect(() => {
  //   const t = setInterval(() => {
  //     slideNext()
  //   }, 5000)

  //   return () => {
  //     clearInterval(t)
  //   }
  // }, [])

  return (
    <Container $page={-page * window.innerWidth}>
      <Info onNextStep={slideNext} />
      <Cover onPrevStep={slidePrev} onNextStep={slideNext} />
      <Audio onPrevStep={slidePrev} />
      {/* <Slide $color="orange">1</Slide>
      <Slide $color="gold">2</Slide>
      <Slide $color="blue">3</Slide> */}
    </Container>
  )
}

export default Upload
