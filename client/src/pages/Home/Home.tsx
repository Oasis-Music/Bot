import React from 'react'
import styled from 'styled-components'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import { useQuery, useReactiveVar } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'
import { currentTrackIdVar } from '../../apollo/cache/variables'

const Container = styled.div`
  height: 100vh;
  background-color: #101318;
`

interface listStyleProps {
  $isPlay: boolean
}

const List = styled.ul<listStyleProps>`
  height: ${({ $isPlay }) => ($isPlay ? 'calc(60vh - 52px)' : '60vh')};
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: #9f9f9f !important;
  }
  @media ${({ theme }) => theme.media.hxs} {
    max-height: calc(100% - 265px);
  }
`

const Home: React.FC = () => {
  const nowPlayingID = useReactiveVar<string>(currentTrackIdVar)

  const { data, loading } = useQuery<AllSoundtracksQuery, AllSoundtracksVariables>(
    AllSoundtracksDocument,
    {
      variables: {
        page: 1
      }
    }
  )

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <NowPlaying />
      <List $isPlay={!!nowPlayingID}>
        {data?.soundtracks.soundtracks.map((track) => (
          <PlaylistItem
            key={track.id}
            id={track.id}
            title={track.title}
            author={track.author}
            duration={track.duration}
            coverImage={track.coverImage}
            fileURL={track.fileURL}
            isPlaying={nowPlayingID === track.id}
          />
        ))}
      </List>
    </Container>
  )
}

export default Home
