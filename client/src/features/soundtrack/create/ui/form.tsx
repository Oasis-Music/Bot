import { useState } from 'react'
import { Alert } from './modals/alert'
import { Feedback } from './modals/feedback'
import { Info } from './steps/info'
import { Cover } from './steps/cover'
import { Audio } from './steps/audio'
import { useNavigate } from '@tanstack/react-router'
import { useWindowRatio } from '@/shared/lib/hooks'
import { validationSchema } from '../model/validation-schema'
import { useCreateSoundtrackMutation } from '../api'
import { useForm, FormProvider } from 'react-hook-form'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { StepSlide } from './common/step-slide'
import type { FormValues, FeedbackModal } from '../model/types'

const enum Step {
  INFO,
  COVER,
  AUDIO
}

export function CreateSoundtrackForm() {
  const navigate = useNavigate()

  const [step, setStep] = useState(Step.AUDIO)

  const [isAlertOpen, setAlertOpen] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModal>({
    open: false,
    type: 'success'
  })

  const [windowWidth] = useWindowRatio()

  const currentValidationSchema = validationSchema[step]

  const formMethods = useForm<FormValues>({
    mode: 'onChange',
    resolver: valibotResolver(currentValidationSchema),
    defaultValues: {
      title: '',
      author: '',
      attach: false
    }
  })

  console.log(`step ${step + 1} err`, formMethods.formState.errors)

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

  const slideNext = async () => {
    if (step === Step.AUDIO) return
    const isStepValid = await formMethods.trigger()

    if (isStepValid) {
      setStep((prev) => prev + 1)
    }
  }

  const slidePrev = () => {
    if (step === 0) return
    setStep((prev) => prev - 1)
  }

  const handleSubmit = () => {
    // INFO: why getValues
    // https://github.com/orgs/react-hook-form/discussions/4028#discussioncomment-7542160
    const data = formMethods.getValues()

    console.log('SubmitHandler', data)
    createSoundtrack({
      // TODO: rename audiofile -> audioFile
      variables: {
        ...data,
        title: data.title.trim(),
        author: data.author.trim(),
        audiofile: data.audioFile
      }
    })
  }

  const handleFeedbackOk = () => {
    const { attach } = formMethods.getValues()

    if (attach) {
      navigate({ to: '/' })
      return
    }
    navigate({ to: '/explore' })
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
    navigate({ to: '/' })
  }

  return (
    <div className="h-screen overflow-x-hidden overflow-y-auto">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div
            className="flex transition-transform duration-400"
            style={{
              transform: `translate3d(-${step * window.innerWidth}px, 0, 0)`
            }}
          >
            <StepSlide width={windowWidth}>
              <Info onNextStep={slideNext} onAlert={handleAlertInvoke} />
            </StepSlide>
            <StepSlide width={windowWidth}>
              <Cover onPrevStep={slidePrev} onNextStep={slideNext} onAlert={handleAlertInvoke} />
            </StepSlide>
            <StepSlide width={windowWidth}>
              <Audio loading={loading} onPrevStep={slidePrev} onAlert={handleAlertInvoke} />
            </StepSlide>
          </div>
        </form>
      </FormProvider>
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
