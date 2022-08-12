import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import MiniPlayer from '../MiniPlayer/MiniPlayer'
import Nav from '../Nav/Nav'
import Player from '../Player'

const Box = styled.div`
  position: relative;
`

export const Wrapper = styled.div`
  width: 100%;
  left: 0;
  position: fixed;
  bottom: 0;
`

const AppLayout: React.FC = () => {
  const [isPlayerOpen, setPlayerOpen] = useState<boolean>(false)

  const handlePlayerOpen = () => {
    setPlayerOpen(true)
  }
  const handlePlayerClose = () => {
    setPlayerOpen(false)
  }

  return (
    <Box>
      <main>
        <Outlet />
      </main>
      <Wrapper>
        <MiniPlayer onPlayerOpen={handlePlayerOpen} />
        <Nav />
      </Wrapper>
      <Player isOpen={isPlayerOpen} onClose={handlePlayerClose} />
    </Box>
  )
}

export default AppLayout
