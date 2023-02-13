import React from 'react'
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
import { useMutation, useReactiveVar } from '@apollo/client'
import { currentTrackVar, userVar } from '../../../apollo/cache/variables'
import { useTranslation } from 'react-i18next'
import { UserMutations } from '../../../apollo/cache/mutations'
import {
  AttachSoundtrackMutation,
  AttachSoundtrackVariables,
  AttachSoundtrackDocument
} from '../../../graphql/user/_gen_/attachSoundtrack.mutauion'
import {
  UnattachSoundtrackMutation,
  UnattachSoundtrackVariables,
  UnattachSoundtrackDocument
} from '../../../graphql/user/_gen_/unattachSoundtrack.mutation'

const NowPlaying: React.FC = () => {
  const { t } = useTranslation()
  const track = useReactiveVar(currentTrackVar)
  const user = useReactiveVar(userVar)

  const [onAttachSoundtrack, attachMeta] = useMutation<
    AttachSoundtrackMutation,
    AttachSoundtrackVariables
  >(AttachSoundtrackDocument, {
    onCompleted: (data) => {
      UserMutations.attachSoundtrack()
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const [onUnattachSoundtrack, _unattachMeta] = useMutation<
    UnattachSoundtrackMutation,
    UnattachSoundtrackVariables
  >(UnattachSoundtrackDocument, {
    onCompleted: () => {
      UserMutations.unattachSoundtrack()
    },
    onError: (err) => {
      console.log(err)
    }
  })

  const attachHandler = () => {
    onAttachSoundtrack({
      variables: {
        trackId: track.id,
        userId: user.id
      }
    })
  }

  const unattachHandler = () => {
    onUnattachSoundtrack({
      variables: {
        trackId: track.id,
        userId: user.id
      }
    })
  }

  return (
    <Container $isAdded={track.attached}>
      <div>
        <ImageWrapper>
          <ImagePlaceholder src={track.coverURL} altText={track.title} />
        </ImageWrapper>
      </div>
      <Details>
        <TrackTitle>{track.title}</TrackTitle>
        <AuthorTitle>{track.author}</AuthorTitle>
        {track.attached ? (
          <ControlsWrapper>
            <DeleteBotton onClick={unattachHandler}>
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
            loading={attachMeta.loading}
            fullWidth
            color="secondary"
            disableShadow
            onClick={attachHandler}
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
