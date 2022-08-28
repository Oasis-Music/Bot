import React from 'react'
import styled from 'styled-components'
import NowPlaying from './NowPlaying/NowPlaying'
import PlaylistItem from '../../components/PlaylistItem/PlaylistItem'
import TEMP_DATA from './temp'

const Container = styled.div`
  height: 100vh; // TODO: dev temp
  background-color: #101318;
`
const List = styled.ul`
  height: 100%;
  max-height: 50vh;
  overflow-y: auto;
  @media ${({ theme }) => theme.media.hxs} {
    max-height: calc(100% - 265px);
  }
`

const coverImageURL = 'https://dl.muzonovs.ru/files/image/2020/12/morgenshtern-kristal-moyot.jpg'

const Home: React.FC = () => {
  const nowPlayingID = 'x5'

  return (
    <Container>
      <NowPlaying />
      <List>
        {TEMP_DATA.map((track) => (
          <PlaylistItem
            key={track.id}
            id={track.id}
            title={track.title}
            author={track.author}
            duration={track.duration}
            coverImage={coverImageURL}
            isPlaying={nowPlayingID === track.id}
          />
        ))}
      </List>
    </Container>
  )
}

export default Home
