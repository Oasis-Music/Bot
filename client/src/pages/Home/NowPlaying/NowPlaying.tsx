import React, { useState } from 'react'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg'
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/cloud-download.svg'
import { ReactComponent as CopyIcon } from '../../../assets/svg/copy.svg'
import {
  Container,
  ImageWrapper,
  Details,
  TrackTitle,
  AuthorTitle,
  AddBotton,
  AddIcon,
  DeleteBotton,
  DownloadBotton,
  ControlsWrapper,
  CopyInfoBotton
} from './NowPlaying.styled'
import SvgIcon from '../../../shared/SvgIcon'

const TEMP = {
  title: 'The Scientist',
  author: 'Cold play',
  coverImage: 'https://dl.muzonovs.ru/files/image/2020/12/morgenshtern-kristal-moyot.jpg'
}

const NowPlaying: React.FC = () => {
  const [isAdded, setIsAdded] = useState<boolean>(false)

  const addButtonHandler = () => {
    setIsAdded(true)
  }

  return (
    <Container>
      <ImageWrapper>
        <ImagePlaceholder src={TEMP.coverImage} altText={TEMP.title} />
      </ImageWrapper>
      <Details>
        <TrackTitle>{TEMP.title}</TrackTitle>
        <AuthorTitle>{TEMP.author}</AuthorTitle>
        {isAdded ? (
          <ControlsWrapper>
            <DeleteBotton>
              <SvgIcon>
                <TrashIcon />
              </SvgIcon>
            </DeleteBotton>
            <DownloadBotton>
              <SvgIcon>
                <DownloadIcon />
              </SvgIcon>
            </DownloadBotton>
            <CopyInfoBotton>
              <SvgIcon>
                <CopyIcon />
              </SvgIcon>
            </CopyInfoBotton>
          </ControlsWrapper>
        ) : (
          <AddBotton
            fullWidth
            disableShadow
            onClick={addButtonHandler}
            startIcon={
              <AddIcon>
                <PlusIcon />
              </AddIcon>
            }
          >
            Добавить
          </AddBotton>
        )}
      </Details>
    </Container>
  )
}

export default NowPlaying
