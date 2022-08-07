import React from 'react'
import Loader from '../../shared/Loader'
import styled from 'styled-components'

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Fallback: React.FC = () => {
  return (
    <Box>
      <Loader fallback />
    </Box>
  )
}

export default Fallback
