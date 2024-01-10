import React from 'react'
import styled from 'styled-components'
import Loader from '@/shared/Loader'

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
