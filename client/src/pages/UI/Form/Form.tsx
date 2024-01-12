import React from 'react'
import styled from 'styled-components'
import { TextInput } from '@/components/ui/TextInput'
import { Checkbox } from '@/components/ui/Checkbox'

const Container = styled.section``

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const InputWrapper = styled.div`
  flex-basis: 25%;
  padding: 20px 10px;
`

export function TextInputs() {
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
      <h4>Checkbox:</h4>
      <div>
        <Checkbox name="baseCheckbox" />
      </div>
      <div style={{ color: '#fff' }}>
        <Checkbox name="baseCheckbox" label="with label" />
      </div>
    </Container>
  )
}
