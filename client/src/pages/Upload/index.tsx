import React, { useState, useMemo } from 'react'
import { Alert } from './modals/Alert'
import { Feedback } from './modals/Feedback'
import { Info } from './Info'
import { Cover } from './Cover'
import { Audio } from './Audio'
import { routeNames } from '@/utils/history'
import { Formik, Form } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useWindowRatio } from '@/hooks'
import { createTrackStepsSchema } from '@/utils/validationSchemas'
import { useCreateSoundtrackMutation } from '@/graphql/soundtrack/_gen_/createSoundtrack.mutation'

import styles from './Upload.module.scss'

const enum Step {
  INFO = 0,
  COVER,
  AUDIO
}

function Slide({ children, width }: { children: React.ReactNode; width: number }) {
  return (
    <div className={styles.slide} style={{ width: width + 'px' }}>
      {children}
    </div>
  )
}

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
  const navigate = useNavigate()

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
      navigate(routeNames.root)
      return
    }
    navigate(routeNames.explore)
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
    navigate(routeNames.root)
  }

  const handleAttachCheck = (value: boolean) => {
    setAttached(value)
  }

  return (
    <div className={styles.container}>
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
            <div
              className={styles.inner}
              style={{
                transform: `translate3d(-${step * window.innerWidth}px, 0, 0)`
              }}
            >
              <Slide width={windowWidth}>
                <Info onNextStep={slideNext} onAlert={handleAlertInvoke} />
              </Slide>
              <Slide width={windowWidth}>
                <Cover onPrevStep={slidePrev} onNextStep={slideNext} onAlert={handleAlertInvoke} />
              </Slide>
              <Slide width={windowWidth}>
                <Audio
                  loading={loading}
                  onPrevStep={slidePrev}
                  onAlert={handleAlertInvoke}
                  onAttachChecked={handleAttachCheck}
                />
              </Slide>
            </div>
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
    </div>
  )
}
