import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
// import Player from '../Player'

const Box = styled.div``

const MainContent = styled.main``

const AppLayout: React.FC = () => {
  return (
    <Box>
      {/* <Player /> */}
      <MainContent>
        <Outlet />
      </MainContent>
    </Box>
  )
}

export default AppLayout
