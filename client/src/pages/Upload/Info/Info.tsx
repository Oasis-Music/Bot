import React from 'react'
import styled from 'styled-components'
import Button from '../../../shared/Button'

const Container = styled.div`
  color: red;
`

interface InfoProps {
  onNextStep(): void
}

const Info: React.FC<InfoProps> = ({ onNextStep }) => {
  return (
    <Container>
      <Button disableShadow fullWidth onClick={onNextStep}>
        Next
      </Button>
    </Container>
  )
}

export default Info
