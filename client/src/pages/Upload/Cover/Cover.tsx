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
      return '* тип файла только: .jpeg, .jpg'
    case 'file-too-large':
      return `* файл весит больше ${MAX_COVER_SIZE} KB`
    default:
      return '* что-то пошло не так'
  }
}

const Cover: React.FC<CoverProps> = ({ onNextStep, onPrevStep, onAlert }) => {
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
          setDropError('* ширина и высота должны быть одинаковы')
          return
        }

        if (w > 1000) {
          setDropError('* разрешение больше чем 1000×1000 px')
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
      <StepTitle>Шаг #2</StepTitle>
      <Title>Добавь изображение обложки</Title>
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
            alt="Загруженное обложки трека"
            onLoad={() => URL.revokeObjectURL(mainPhoto.preview)}
          />
        ) : (
          <Plug>
            <PlugIcon>
              <CoverPlaceholderIcon />
            </PlugIcon>
            <PlugInfo>
              <p>Перетащи файл сюда или нажми на область</p>
              <ul>
                <li>Не более&nbsp;{MAX_COVER_SIZE}&nbsp;KB</li>
                <li>Формат JPEG</li>
                <li>До 1000&#215;1000 px</li>
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
        <ErrorMessage>{dropError}</ErrorMessage>
      </animated.div>
      <StepControls
        disabled={!!!mainPhoto?.size || !!dropError}
        nextText="Продолжить"
        onBack={onPrevStep}
        onNext={onNextStep}
        onAlert={onAlert}
      />
    </Container>
  )
}

export default Cover
