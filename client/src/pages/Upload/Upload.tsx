import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import Info from './Info/Info'
import Cover from './Cover/Cover'
import Audio from './Audio/Audio'
import { useMutation } from '@apollo/client'
import { Formik, Form } from 'formik'
import { useWindowRatio } from '../../hooks'
import { createTrackStepsSchema } from '../../utils/validationSchemas'
import {
  AddSoundtrackMutation,
  AddSoundtrackVariables,
  AddSoundtrackDocument
} from '../../graphql/soundtrack/_gen_/addSoundtrack.mutation'

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
  audiofile: any
}

const Upload: React.FC = () => {
  const [page, setPage] = useState<number>(0)
  const [windowWidth] = useWindowRatio()

  const [addSoundtrack] = useMutation<AddSoundtrackMutation, AddSoundtrackVariables>(
    AddSoundtrackDocument,
    {
      onCompleted: (data) => {
        console.log(data)
      },
      onError: (err) => {
        console.log(err)
      }
    }
  )

  const slideNext = () => {
    if (page === 2) return
    setPage((prev) => prev + 1)
  }

  const slidePrev = () => {
    if (page === 0) return
    setPage((prev) => prev - 1)
  }

  const handleSubmit = (values: SubmitValues) => {
    if (page === 2) {
      addSoundtrack({
        variables: {
          title: values.title,
          author: values.author,
          coverImage: values.coverImage,
          audiofile: values.audiofile
        }
      })
    } else {
      slideNext()
    }
    console.log(values)
  }

  const curentSchema = useMemo(() => {
    return createTrackStepsSchema[page]
  }, [page])

  return (
    <Container>
      <Formik
        validateOnMount
        onSubmit={handleSubmit}
        validationSchema={curentSchema}
        initialValues={{
          title: '',
          author: '',
          coverImage: null,
          audiofile: null
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
