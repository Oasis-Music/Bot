import styled from 'styled-components'
import IconButton from '../../shared/IconButton'

export const Container = styled.nav`
  background-color: #070c13;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SearchButton = styled(IconButton)`
  && {
    background: none;
    color: #fff;
    &:hover:not(:disabled) {
      background-color: #fff;
      background-color: transparent;
    }
  }
`
