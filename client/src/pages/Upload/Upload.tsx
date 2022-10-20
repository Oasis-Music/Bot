import React, { useState } from 'react'
import styled from 'styled-components'
import Info from './Info/Info'
import Cover from './Cover/Cover'
import Audio from './Audio/Audio'
import { Formik, Form } from 'formik'
import { useWindowRatio } from '../../hooks'
import { createTrackStepsSchema } from '../../utils/validationSchemas'

interface WrapperStyles {
  $page: number
}

const Container = styled.div`
  overflow: hidden;
`

const Wrapper = styled.div<WrapperStyles>`
  background-color: #101318;
  display: flex;
  transform: ${(props) => `translate3d(-${props.$page}px, 0, 0)`};
  transition: transform 0.3s;
`

const Slide = styled.div`
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: #101318;
`

interface Track {
  id: string
  title: string
  author: string
  duration: number
  coverImage: string
  fileURL: string
}

interface SubmitValues {
  title: string
  author: string
  coverImage: any
}

const Upload: React.FC = () => {
  const [page, setPage] = useState<number>(1)
  const [windowWidth] = useWindowRatio()

  const slideNext = () => setPage((prev) => prev + 1)

  const slidePrev = () => setPage((prev) => prev - 1)

  const handleSubmit = (values: SubmitValues) => {
    console.log(values)
  }

  return (
    <Container>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        validationSchema={createTrackStepsSchema[page]}
        initialValues={{
          title: 'xxx',
          author: 'xxx',
          coverImage: undefined
        }}
      >
        {() => (
          <Form>
            <Wrapper $page={page * window.innerWidth}>
              <Slide style={{ width: `${windowWidth}px` }}>
                <Info onNextStep={slideNext} />
              </Slide>
              <Slide style={{ width: `${windowWidth}px` }}>
                <Cover onPrevStep={slidePrev} onNextStep={slideNext} />
              </Slide>
              <Slide style={{ width: `${windowWidth}px` }}>
                <Audio onPrevStep={slidePrev} />
              </Slide>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Container>
  )
}

export default Upload
