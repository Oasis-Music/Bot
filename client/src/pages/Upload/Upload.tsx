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
  $shift: number
}

const Container = styled.div`
  overflow: hidden;
`

const Wrapper = styled.div<WrapperStyles>`
  display: flex;
  transform: ${({ $shift }) => `translate3d(-${$shift}px, 0, 0)`};
  transition: transform 0.3s;
`

interface SlideStyles {
  $width: number
  $active?: boolean
}

const Slide = styled.div<SlideStyles>`
  width: ${({ $width }) => `${$width}px`};
  height: 100vh;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: #101318;
  & > div {
    display: ${({ $active }) => ($active ? 'block' : 'none')};
  }
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
  const [step, setStep] = useState<number>(0)
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
    if (step === 2) return
    setStep((prev) => prev + 1)
  }

  const slidePrev = () => {
    if (step === 0) return
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (values: SubmitValues) => {
    if (step === 2) {
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
    return createTrackStepsSchema[step]
  }, [step])

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
            <Wrapper $shift={step * window.innerWidth}>
              <Slide $active={0 === step} $width={windowWidth}>
                <Info onNextStep={slideNext} />
              </Slide>
              <Slide $active={1 === step} $width={windowWidth}>
                <Cover onPrevStep={slidePrev} onNextStep={slideNext} />
              </Slide>
              <Slide $active={2 === step} $width={windowWidth}>
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
