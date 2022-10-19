import React from 'react'
import styled from 'styled-components'
import Button from '../../../shared/Button'

const Container = styled.div`
  background-color: #bf00ff;
  height: 100vh;
`

interface AudioProps {
  onPrevStep(): void
}

const Audio: React.FC<AudioProps> = ({ onPrevStep }) => {
  return (
    <Container>
      <p>Audio</p>
      <Button disableShadow fullWidth onClick={onPrevStep}>
        Prev
      </Button>
    </Container>
  )
}

export default Audio
