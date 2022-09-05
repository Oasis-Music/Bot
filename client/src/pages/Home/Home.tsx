import React from 'react'
import styled from 'styled-components'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import { useQuery } from '@apollo/client'
import {
  AllSoundtracksQuery,
  AllSoundtracksVariables,
  AllSoundtracksDocument
} from '../../graphql/soundtrack/_gen_/soundtracks.query'

const Container = styled.div`
  height: 100vh; // TODO: dev temp
  background-color: #101318;
`
const List = styled.ul`
  height: 100%;
  max-height: 50vh;
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
  const nowPlayingID = '1'

  const { data, loading } = useQuery<AllSoundtracksQuery, AllSoundtracksVariables>(
    AllSoundtracksDocument,
    {
      variables: {
        page: 1
      }
    }
  )

  console.log(data)

  if (loading) {
    return <div>Loading</div>
  }

  return (
    <Container>
      <NowPlaying />
      <List>
        {data?.soundtracks.soundtracks.map((track) => (
          <PlaylistItem
            key={track.id}
            id={track.id}
            title={track.title}
            author={track.author}
            duration={track.duration}
            coverImage={track.coverImage}
            isPlaying={nowPlayingID === track.id}
          />
        ))}
      </List>
    </Container>
  )
}

export default Home
