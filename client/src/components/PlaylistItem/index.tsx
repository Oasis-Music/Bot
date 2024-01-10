import React, { forwardRef } from 'react'
import styled from 'styled-components'
import ScaleLoader from '@/components/ui/Loader'
import ImagePlaceholder from '@/components/ImagePlaceholder'
import { timeFormater } from '@/utils/helpers'
import { PlaylistMutations, SoundtrackMutations } from '@/apollo/cache/mutations'
import type { Playlist } from '@/apollo/cache/types'

interface PlaylistItemProps extends React.ComponentPropsWithRef<'li'> {
  id: string
  title: string
  author: string
  duration: number
  coverURL: string
  audioURL: string
  isPlaying: boolean
  isAttached: boolean
  playlist: Playlist.User | Playlist.Explore
}

const Container = styled.li`
  display: flex;
  align-items: center;
  margin: 11px 0;
  padding: 0 11px 0 7px;
`

const ImageWrapper = styled.div`
  font-size: 2vh;
  margin-right: 7px;
  color: #dddddd;
  width: 50px;
  height: 50px;
`

const InfoBox = styled.div``

const TrackTitle = styled.p`
  font-size: 15px;
  color: #fff;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
`
const AuthorTitle = styled.p`
  font-size: 11px;
  color: #bbbbbb;
  font-weight: 400;
  margin: 0;
`

const SideBox = styled.div`
  margin-left: auto;
  font-size: 16px;
  margin-left: auto;
  color: #878787;
  font-weight: 400;
`

const PlaylistItem: React.ForwardRefRenderFunction<HTMLLIElement, PlaylistItemProps> = (
  { id, title, author, duration, coverURL, audioURL, isPlaying, isAttached, playlist },
  ref
) => {
  const trackClickHandler = () => {
    PlaylistMutations.bindMainPlaylist(playlist)
    SoundtrackMutations.setCurrentTrack({
      id,
      title,
      author,
      duration,
      coverURL,
      audioURL,
      isPlaying,
      attached: isAttached
    })
  }

  return (
    <Container ref={ref ? ref : undefined} onClick={trackClickHandler}>
      <ImageWrapper>
        <ImagePlaceholder src={coverURL} altText={title} />
      </ImageWrapper>
      <InfoBox>
        <TrackTitle>{title}</TrackTitle>
        <AuthorTitle>{author}</AuthorTitle>
      </InfoBox>
      <SideBox>
        {isPlaying ? <ScaleLoader fallback /> : <span>{timeFormater(duration)}</span>}
      </SideBox>
    </Container>
  )
}

export default forwardRef(PlaylistItem)
