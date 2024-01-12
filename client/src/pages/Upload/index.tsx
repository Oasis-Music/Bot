import React, { useState, useMemo } from 'react'
import styled from 'styled-components'
import { Alert } from './modals/Alert'
import { Feedback } from './modals/Feedback'
import { Info } from './Info'
import { Cover } from './Cover'
import { Audio } from './Audio'
import history, { routeNames } from '@/utils/history'
import { Formik, Form } from 'formik'
import { useWindowRatio } from '@/hooks'
import { createTrackStepsSchema } from '@/utils/validationSchemas'
import { useCreateSoundtrackMutation } from '@/graphql/soundtrack/_gen_/createSoundtrack.mutation'

const enum Step {
  INFO = 0,
  COVER,
  AUDIO
}

interface WrapperStyles {
  $shift: number
}

const Container = styled.div`
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`

const Wrapper = styled.div<WrapperStyles>`
  display: flex;
  transform: ${({ $shift }) => `translate3d(-${$shift}px, 0, 0)`};
  transition: transform 0.3s;
`

interface slideStyles {
  $width: number
  $active?: boolean
}

const Slide = styled.div<slideStyles>`
  width: ${({ $width }) => `${$width}px`};
  min-height: 100vh;
  flex-shrink: 0;
  box-sizing: border-box;
  background-color: #101318;
  & > div {
    visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  }
`

interface FormValues {
  title: string
  author: string
  attach: boolean
  coverImage: unknown
  audiofile: unknown
}

type feedbackModal = {
  open: boolean
  type: 'success' | 'fail'
}

export default function Upload() {
  const [step, setStep] = useState<number>(Step.INFO)
  const [isAttached, setAttached] = useState<boolean>(false)

  const [isAlertOpen, setAlertOpen] = useState<boolean>(false)
  const [feedbackModal, setFeedbackModal] = useState<feedbackModal>({
    open: false,
    type: 'success'
  })

  const [windowWidth] = useWindowRatio()

  const [createSoundtrack, { loading }] = useCreateSoundtrackMutation({
    onCompleted: (data) => {
      console.log(data)
      setFeedbackModal({
        type: 'success',
        open: true
      })
    },
    onError: () => {
      setFeedbackModal({
        type: 'fail',
        open: true
      })
    }
  })

  const slideNext = () => {
    if (step === 2) return
    setStep((prev) => prev + 1)
  }

  const slidePrev = () => {
    if (step === 0) return
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (values: FormValues) => {
    if (step === 2) {
      createSoundtrack({
        variables: { ...values, title: values.title.trim(), author: values.author.trim() }
      })
    } else {
      slideNext()
    }
  }

  const curentSchema = useMemo(() => {
    return createTrackStepsSchema[step]
  }, [step])

  const handleFeedbackOk = () => {
    if (isAttached) {
      history.push(routeNames.root)
      return
    }
    history.push(routeNames.explore)
  }

  const handleFeedbackErr = () => {
    setFeedbackModal((prev) => ({
      ...prev,
      open: false
    }))
  }

  const handleAlertInvoke = () => {
    setAlertOpen((prev) => !prev)
  }

  const handleAlertStay = () => {
    setAlertOpen(false)
  }

  const handleAlertLeave = () => {
    history.push(routeNames.root)
  }

  const handleAttachCheck = (value: boolean) => {
    setAttached(value)
  }

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
          audiofile: null,
          attach: false
        }}
      >
        {() => (
          <Form>
            <Wrapper $shift={step * window.innerWidth}>
              <Slide $active={Step.INFO === step} $width={windowWidth}>
                <Info onNextStep={slideNext} onAlert={handleAlertInvoke} />
              </Slide>
              <Slide $active={Step.COVER === step} $width={windowWidth}>
                <Cover onPrevStep={slidePrev} onNextStep={slideNext} onAlert={handleAlertInvoke} />
              </Slide>
              <Slide $active={Step.AUDIO === step} $width={windowWidth}>
                <Audio
                  loading={loading}
                  onPrevStep={slidePrev}
                  onAlert={handleAlertInvoke}
                  onAttachChecked={handleAttachCheck}
                />
              </Slide>
            </Wrapper>
          </Form>
        )}
      </Formik>
      <Feedback
        type={feedbackModal.type}
        isOpen={feedbackModal.open}
        onSubmit={handleFeedbackOk}
        onRetry={handleFeedbackErr}
      />
      <Alert isOpen={isAlertOpen} onStay={handleAlertStay} onLeave={handleAlertLeave} />
    </Container>
  )
}
