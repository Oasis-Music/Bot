import React from 'react'
import SvgIcon from '../../../shared/SvgIcon'
import ImagePlaceholder from '../../../shared/ImagePlaceholder'
import { ReactComponent as PlusIcon } from '../../../assets/svg/plus.svg'
import { ReactComponent as TrashIcon } from '../../../assets/svg/trash.svg'
import { ReactComponent as DownloadIcon } from '../../../assets/svg/cloud-download.svg'
import { ReactComponent as CopyIcon } from '../../../assets/svg/copy.svg'
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
  CopyInfoBotton,
  Counter
} from './NowPlaying.styled'

interface NowPlayingProps {
  trackCounter?: number
  onTrackAttach?(): void
  onTrackUnattach?(): void
}

const NowPlaying: React.FC<NowPlayingProps> = ({
  trackCounter,
  onTrackAttach,
  onTrackUnattach
}) => {
  const { t } = useTranslation()
  const track = useReactiveVar(currentTrackVar)
  const user = useReactiveVar(userVar)

  const [onAttachSoundtrack, attachMeta] = useMutation<
    AttachSoundtrackMutation,
    AttachSoundtrackVariables
  >(AttachSoundtrackDocument, {
    onCompleted: () => {
      UserMutations.attachSoundtrack()
      if (onTrackAttach) {
        onTrackAttach()
      }
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
      if (onTrackUnattach) {
        onTrackUnattach()
      }
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
          <ImagePlaceholder src={track.coverURL || ''} altText={track.title} />
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
      {!!trackCounter && (
        <Counter>
          {trackCounter}/{process.env.REACT_APP_MAX_TRACK_AVAILABLE}
        </Counter>
      )}
    </Container>
  )
}

export default NowPlaying
