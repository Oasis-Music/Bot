import React, { useState, useEffect } from 'react'
import { useSpring, animated } from 'react-spring'
import { useDropzone, FileRejection } from 'react-dropzone'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/trash.svg'
import { ReactComponent as CoverPlaceholderIcon } from '../../../assets/svg/cover_placeholder.svg'
import {
  Container,
  StepTitle,
  Title,
  ContainerUpload,
  Preview,
  Plug,
  PlugIcon,
  PlugInfo,
  ErrorMessage,
  DeleteButton
} from './Cover.styled'
import { useFormikContext } from 'formik'
import { useTranslation } from 'react-i18next'
import SvgIcon from '../../../shared/SvgIcon'
import StepControls from '../StepControls'

interface CoverProps {
  onNextStep(): void
  onPrevStep(): void
  onAlert(): void
}

const MAX_COVER_SIZE = 700

interface UploadedFile extends File {
  preview: string
}

function dropzoneCodeToMsg(code: string): string {
  switch (code) {
    case 'file-invalid-type':
      return 'pages.upload.cover.errors.invalidType'
    case 'file-too-large':
      return 'pages.upload.cover.errors.tooLarge'
    default:
      return 'pages.upload.cover.errors.shared'
  }
}

const Cover: React.FC<CoverProps> = ({ onNextStep, onPrevStep, onAlert }) => {
  const { t } = useTranslation()
  const { setFieldValue } = useFormikContext()
  const [mainPhoto, setMainPhoto] = useState<UploadedFile>()
  const [dropError, setDropError] = useState<string>('')

  useEffect(() => {
    return () => {
      if (mainPhoto) {
        URL.revokeObjectURL(mainPhoto.preview)
      }
    }
  }, [])

  const fadeStyles = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: {
      opacity: dropError ? 1 : 0
    }
  })

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (mainPhoto) URL.revokeObjectURL(mainPhoto.preview)

    if (acceptedFiles.length) {
      if (dropError) setDropError('')

      const file = acceptedFiles[0] as UploadedFile
      file.preview = URL.createObjectURL(file)

      const image = new Image()
      image.src = file.preview
      image.onload = () => {
        const w = image.width,
          h = image.height

        if (w !== h) {
          setDropError(t('pages.upload.cover.errors.dimensionEquals'))
          return
        }

        if (w > 1000) {
          setDropError(t('pages.upload.cover.errors.dimensionMax'))
        }
      }

      setMainPhoto(file)
      setFieldValue('coverImage', file)
    }
  }

  const handleDropReject = (fileRejections: FileRejection[]) => {
    console.log(fileRejections)
    const { errors } = fileRejections[0]
    console.log('e', errors)
    const { code } = errors[0]
    console.log(code)
    setDropError(dropzoneCodeToMsg(code))
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg']
    },
    maxSize: 716800,
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()
    setDropError('')

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(mainPhoto!.preview)
    setMainPhoto(undefined)
    setFieldValue('coverImage', null)
  }

  return (
    <Container>
      <StepTitle>{t('pages.upload.cover.title')}</StepTitle>
      <Title>{t('pages.upload.cover.subTitle')}</Title>
      <ContainerUpload
        {...{
          isDragActive,
          isDragAccept,
          isDragReject
        }}
        {...getRootProps()}
        isError={dropError}
        $droped={!!mainPhoto?.size}
      >
        <input {...getInputProps()} />
        {mainPhoto ? (
          <Preview
            src={mainPhoto.preview}
            alt={t('pages.upload.cover.previewAlt')}
            onLoad={() => URL.revokeObjectURL(mainPhoto.preview)}
          />
        ) : (
          <Plug>
            <PlugIcon>
              <CoverPlaceholderIcon />
            </PlugIcon>
            <PlugInfo>
              <p>{t('pages.upload.cover.dropzone.title')}</p>
              <ul>
                <li>
                  {t('pages.upload.cover.dropzone.size', {
                    size: MAX_COVER_SIZE
                  })}
                </li>
                <li>{t('pages.upload.cover.dropzone.ext')}</li>
                <li>{t('pages.upload.cover.dropzone.dimension')}</li>
              </ul>
            </PlugInfo>
          </Plug>
        )}
        {mainPhoto && (
          <DeleteButton withoutShadow onClick={handleRemoveClick}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </DeleteButton>
        )}
      </ContainerUpload>
      <animated.div style={fadeStyles}>
        <ErrorMessage>
          {t(dropError, {
            size: MAX_COVER_SIZE
          })}
        </ErrorMessage>
      </animated.div>
      <StepControls
        disabled={!!!mainPhoto?.size || !!dropError}
        nextText={t('pages.upload.cover.continue')}
        onBack={onPrevStep}
        onNext={onNextStep}
        onAlert={onAlert}
      />
    </Container>
  )
}

export default Cover
