import styled from 'styled-components'
import IconButton from '../../../shared/IconButton'

export const WaveWrapper = styled.div`
  margin: 1vh 0;
  margin-top: 4vh;
  padding: 0 15px;
  @media ${({ theme }) => theme.media.hxs} {
    margin: 13px 0;
    margin-top: 35px;
  }
`

export const PlayBotton = styled(IconButton)`
  && {
    color: #1b1818;
    background-color: #fff;
    font-size: 2.8vh;
    padding: 3vh;
    &:disabled {
      box-shadow: none;
    }
    &:hover:not(:disabled) {
      background-color: #fff;
    }

    @media ${({ theme }) => theme.media.hxs} {
      font-size: 15px;
      padding: 15px;
    }
  }
`
