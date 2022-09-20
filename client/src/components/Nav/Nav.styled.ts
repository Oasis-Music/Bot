import styled from 'styled-components'
import IconButton from '../../shared/IconButton'

export const Container = styled.nav`
  z-index: 400;
  position: relative;
  background-color: #070c13;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ControlButton = styled(IconButton)`
  && {
    background: none;
    color: #fff;
    font-size: 3vh;
    padding: 2.7vh;
    &:hover:not(:disabled) {
      background-color: #fff;
      background-color: transparent;
    }
    @media ${({ theme }) => theme.media.hxs} {
      font-size: 17px;
      padding: 15px;
    }
  }
`
