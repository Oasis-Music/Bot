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
import { useTranslation } from 'react-i18next'

interface NowPlayingProps {
  isAttached: boolean
}

const NowPlaying: React.FC<NowPlayingProps> = ({ isAttached }) => {
  const [_, setIsAdded] = useState<boolean>(isAttached)
  const track = useReactiveVar(currentTrackVar)

  console.log('t:', track)

  const { t } = useTranslation()
  const addButtonHandler = () => {
    setIsAdded(true)
  }

  return (
    <Container $isAdded={track.attached}>
      <div>
        <ImageWrapper>
          <ImagePlaceholder src={track.coverImage} altText={track.title} />
        </ImageWrapper>
      </div>
      <Details>
        <TrackTitle>{track.title}</TrackTitle>
        <AuthorTitle>{track.author}</AuthorTitle>
        {track.attached ? (
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
            {t('common.save')}
          </SaveBotton>
        )}
      </Details>
    </Container>
  )
}

export default NowPlaying
