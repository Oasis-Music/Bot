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
  SaveBotton,
  AddIcon,
  DeleteBotton,
  DownloadBotton,
  ControlsWrapper,
  CopyInfoBotton
} from './NowPlaying.styled'
import SvgIcon from '../../../shared/SvgIcon'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '../../../apollo/cache/variables'

interface NowPlayingProps {
  isAttached: boolean
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isAttached }) => {
  const [isAdded, setIsAdded] = useState<boolean>(isAttached)
  const track = useReactiveVar(currentTrackVar)

  const addButtonHandler = () => {
    setIsAdded(true)
  }

  return (
    <Container $isAdded={isAdded}>
      <div>
        <ImageWrapper>
          <ImagePlaceholder src={track.coverImage} altText={track.title} />
        </ImageWrapper>
      </div>
      <Details>
        <TrackTitle>{track.title}</TrackTitle>
        <AuthorTitle>{track.author}</AuthorTitle>
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
          <SaveBotton
            disabled={!!!track.id}
            fullWidth
            disableShadow
            onClick={addButtonHandler}
            startIcon={
              <AddIcon>
                <PlusIcon />
              </AddIcon>
            }
          >
            ??????????????????
          </SaveBotton>
        )}
      </Details>
    </Container>
  )
}

export default NowPlaying
