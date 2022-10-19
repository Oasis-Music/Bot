import React, { useState, useEffect } from 'react'
// import clsx from 'clsx'
import Button from '../../../shared/Button'

import { useDropzone } from 'react-dropzone'
import { ReactComponent as DeleteIcon } from '../../../assets/svg/trash.svg'
import SvgIcon from '../../../shared/SvgIcon'
import { ReactComponent as CoverPlaceholderIcon } from '../../../assets/svg/cover_placeholder.svg'
import {
  Container,
  Title,
  ContainerUpload,
  Preview,
  Plug,
  PlugIcon,
  DeleteButton
} from './Cover.styled'

interface UploadedFile extends File {
  preview: string
}

interface CoverProps {
  onNextStep(): void
  onPrevStep(): void
}

const Cover: React.FC<CoverProps> = ({ onNextStep, onPrevStep }) => {
  const [mainPhoto, setMainPhoto] = useState<UploadedFile | null>()

  useEffect(() => {
    console.log('Mount: Cover')

    return () => {
      console.log('Unmount: Cover')
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
      'image/*': ['.jpeg', '.jpg']
    },
    maxSize: 700000, // 700KB
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
    setMainPhoto(null)
  }

  return (
    <Container>
      <Title>Обложка</Title>
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
      <Button disableShadow fullWidth onClick={onPrevStep}>
        Prev
      </Button>
      <Button disableShadow fullWidth onClick={onNextStep}>
        Next
      </Button>
    </Container>
  )
}

export default Cover
