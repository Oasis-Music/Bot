import React from 'react'
import styled from 'styled-components'
import localTrack from './track.mp3'
import TopControls from './TopControls/TopControls'
import Details from './Details/Details'
import Trackline from './Trackline/Trackline'

const Container = styled.div`
  height: 100vh;
  background-color: #101318;
`

const TEMP_DATA = {
  id: 's001',
  title: 'Cristal & МОЁТ',
  author: 'MORGENSHTERN',
  coverImageURL: 'https://dl.muzonovs.ru/files/image/2020/12/morgenshtern-kristal-moyot.jpg',
  soundtrackURL: localTrack
}

const Player: React.FC = () => {
  return (
    <Container>
      <TopControls id={TEMP_DATA.id} />
      <Details
        title={TEMP_DATA.title}
        author={TEMP_DATA.author}
        coverImageURL={TEMP_DATA.coverImageURL}
      />
      <Trackline soundtrack={TEMP_DATA.soundtrackURL} />
    </Container>
  )
}

export default Player
