import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import MiniPlayer from '../MiniPlayer/MiniPlayer'
import Nav from '../Nav/Nav'

// import Player from '../Player'

const Box = styled.div``

export const Wrapper = styled.div`
  width: 100%;
  left: 0;
  position: fixed;
  bottom: 0;
`

const AppLayout: React.FC = () => {
  return (
    <Box>
      {/* <Player /> */}
      <main>
        <Outlet />
      </main>
      <Wrapper>
        <MiniPlayer />
        <Nav />
      </Wrapper>
    </Box>
  )
}

export default AppLayout
