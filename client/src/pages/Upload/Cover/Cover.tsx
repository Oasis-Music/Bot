import React, { useState, useEffect } from 'react'
// import clsx from 'clsx'
import Button from '../../../shared/Button'

import { useDropzone } from 'react-dropzone'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/trash.svg'
import SvgIcon from '../../../shared/SvgIcon'
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
  DeleteButton
} from './Cover.styled'
import { useFormikContext } from 'formik'

interface UploadedFile extends File {
  preview: string
}

interface CoverProps {
  onNextStep(): void
  onPrevStep(): void
}

const Cover: React.FC<CoverProps> = ({ onNextStep, onPrevStep }) => {
  const { setFieldValue, errors } = useFormikContext()
  const [mainPhoto, setMainPhoto] = useState<UploadedFile>()

  useEffect(() => {
    return () => {
      if (mainPhoto) {
        URL.revokeObjectURL(mainPhoto.preview)
      }
    }
  }, [])

  const handleFileDrop = (acceptedFiles: globalThis.File[]) => {
    if (mainPhoto) URL.revokeObjectURL(mainPhoto.preview)

    if (acceptedFiles.length) {
      const uploaded: unknown = acceptedFiles[0] // Type assertions
      const file = uploaded as UploadedFile

      const s: unknown = file

      file.preview = URL.createObjectURL(s as Blob)

      //   onMainPhotoUpload(file)

      setMainPhoto(file)
      setFieldValue('coverImage', file)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDropReject = (rejectedFiles: any) => {
    console.log(rejectedFiles)
    const { errors } = rejectedFiles[0]
    const { code } = errors[0]
    // code: "file-too-large"
    console.log(code)
    // TODO custom error on drop rejected
  }

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    accept: {
      'image/jpeg': ['.jpg']
    },
    maxSize: 716800, // 700KB
    maxFiles: 1,
    multiple: false,
    onDrop: handleFileDrop,
    onDropRejected: handleDropReject
  })

  const handleRemoveClick = (event: React.MouseEvent<HTMLElement>): void => {
    event.stopPropagation()

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    URL.revokeObjectURL(mainPhoto!.preview)
    // onMainPhotoUpload(null)
    setMainPhoto(undefined)
    setFieldValue('coverImage', null)
  }

  return (
    <Container>
      <StepTitle>Шаг #2</StepTitle>
      <Title>Добавить изображение обложки</Title>
      <ContainerUpload
        {...{
          isDragActive,
          isDragAccept,
          isDragReject
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {mainPhoto ? (
          <Preview src={mainPhoto?.preview} alt="Загруженное фото создаваемого товара" />
        ) : (
          <Plug>
            <PlugIcon>
              <CoverPlaceholderIcon />
            </PlugIcon>
            <PlugInfo>
              <p>Перетащи файл сюда или нажмите на область</p>
              <ul>
                <li>Не более 1 mb</li>
                <li>jpeg или jpg</li>
                <li>До 1000px&#215;1000px</li>
              </ul>
            </PlugInfo>
          </Plug>
        )}
        {isDragReject && <span>Типом файла может быть только: .jpeg, .jpg</span>}
        {mainPhoto && (
          <DeleteButton withoutShadow onClick={handleRemoveClick}>
            <SvgIcon>
              <DeleteIcon />
            </SvgIcon>
          </DeleteButton>
        )}
      </ContainerUpload>
      <Button tabIndex={-1} disableShadow fullWidth onClick={onPrevStep}>
        Prev
      </Button>
      <Button
        tabIndex={-1}
        disableShadow
        disabled={!!!mainPhoto?.name}
        fullWidth
        onClick={onNextStep}
      >
        Next
      </Button>
      <div color="white">{JSON.stringify(errors)}</div>
    </Container>
  )
}

export default Cover