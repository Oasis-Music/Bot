import React from 'react'
import styled from 'styled-components'
import LangSwitcher from '@/components/LangSwitcher'

const Wrapper = styled.div`
  padding: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Settings: React.FC = () => {
  return (
    <Wrapper>
      <LangSwitcher />
    </Wrapper>
  )
}

export default Settings
