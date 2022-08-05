import React from 'react'
import styled from 'styled-components'
import Trackline from './Trackline/Trackline'

const Container = styled.div`
  height: 100vh;
  background-color: #171c26;
`

const Player: React.FC = () => {
  return (
    <Container>
      <Trackline />
    </Container>
  )
}

export default Player
