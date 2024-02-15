import React, { useEffect, useState } from 'react'
import { SvgIcon } from '@/components/ui/SvgIcon'
import PlusIcon from '@/assets/svg/plus.svg?react'
import TrashIcon from '@/assets/svg/trash.svg?react'
import ShareIcon from '@/assets/svg/share.svg?react'
import CopyIcon from '@/assets/svg/copy.svg?react'
import CheckIcon from '@/assets/svg/check-circle.svg?react'
import { ImagePlaceholder } from '@/components/ImagePlaceholder'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar, userVar } from '@/apollo/cache/variables'
import { useTranslation } from 'react-i18next'
import { UserMutations, UiMutations } from '@/apollo/cache/mutations'
import { useAttachSoundtrackMutation } from '@/graphql/user/_gen_/attachSoundtrack.mutauion'
import { useUnattachSoundtrackMutation } from '@/graphql/user/_gen_/unattachSoundtrack.mutation'

import {
  InnerContainer,
  ImageWrapper,
  Details,
  TrackTitle,
  AuthorTitle,
  SaveBotton,
  AddIcon,
  DeleteBotton,
  ShareBotton,
  ControlsWrapper,
  CopyInfoBotton
} from './NowPlaying.styled'

interface NowPlayingProps {
  trackCounter?: number
  onTrackAttach?(): void
  onTrackUnattach?(): void
}

export function NowPlaying({ onTrackAttach, onTrackUnattach }: NowPlayingProps) {
  const [wasCopied, setCopied] = useState(false)

  const { t } = useTranslation()
  const track = useReactiveVar(currentTrackVar)
  const user = useReactiveVar(userVar)

  useEffect(() => {
    setCopied(false)
  }, [track.id])

  const [onAttachSoundtrack, attachMeta] = useAttachSoundtrackMutation({
    onCompleted: () => {
      UserMutations.attachSoundtrack()

      if (onTrackAttach) {
        onTrackAttach()
      }
    },
    onError: () => {
      UiMutations.openSnackbar({
        type: 'error',
        message: t('snackbar.trackSaveFail')
      })
    }
  })

  const [onUnattachSoundtrack, _unattachMeta] = useUnattachSoundtrackMutation({
    onCompleted: () => {
      UserMutations.unattachSoundtrack()
      if (onTrackUnattach) {
        onTrackUnattach()
      }
    },
    onError: () => {
      UiMutations.openSnackbar({
        type: 'error',
        message: t('snackbar.trackDeleteFail')
      })
    }
  })

  const onCopyTrackInfo = () => {
    // INFO: it is a query permission for Blink only engines
    // Is there a need to check permissions?

    // navigator.permissions.query({ name: 'clipboard-write' as PermissionName }).then((result) => {
    //   if (result.state == 'granted' || result.state == 'prompt') {
    //     console.log('Write access granted!')
    //   }
    // })

    navigator.clipboard.writeText(`${track.title} - ${track.author}`).then(
      () => {
        setCopied(true)
      },
      () => {
        console.log('falied')
      }
    )
  }

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
    <div>
      <InnerContainer $isAdded={track.attached}>
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
              <CopyInfoBotton onClick={onCopyTrackInfo}>
                <SvgIcon>{wasCopied ? <CheckIcon /> : <CopyIcon />}</SvgIcon>
              </CopyInfoBotton>
              <ShareBotton>
                <SvgIcon>
                  <ShareIcon />
                </SvgIcon>
              </ShareBotton>
            </ControlsWrapper>
          ) : (
            <SaveBotton
              disabled={!track.id}
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
              {t('common.add')}
            </SaveBotton>
          )}
        </Details>
      </InnerContainer>
    </div>
  )
}
