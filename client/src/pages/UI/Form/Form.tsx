import React from 'react'
import styled from 'styled-components'
import TextInput from '../../../shared/FormFields/TextInput'

const Container = styled.section``

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const InputWrapper = styled.div`
  flex-basis: 25%;
  padding: 20px 10px;
`

const TextInputs: React.FC = () => {
  return (
    <Container>
      <h4>Text Inputs:</h4>
      <Box>
        <InputWrapper>
          <TextInput name="simpleInput" placeholder="Simple Input" />
        </InputWrapper>
        <InputWrapper>
          <TextInput name="errorInput" placeholder="With Error Input" />
        </InputWrapper>
        <InputWrapper>
          <TextInput name="price" placeholder="Number Input" type="number" />
        </InputWrapper>
        <InputWrapper>
          <TextInput name="price" placeholder="Disabled" disabled />
        </InputWrapper>
        <InputWrapper>
          <TextInput name="password" type="password" placeholder="Password" />
        </InputWrapper>
        <InputWrapper>
          <TextInput name="simpleInput" placeholder="Multiline Input" multiline rows={5} />
        </InputWrapper>
      </Box>
    </Container>
  )
}

export default TextInputs
