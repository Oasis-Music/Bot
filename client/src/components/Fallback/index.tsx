import React from 'react'
import styled from 'styled-components'
import { ScaleLoader } from '@/components/ui/Loader'

const Box = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export function Fallback() {
  return (
    <Box>
      <ScaleLoader fallback />
    </Box>
  )
}
