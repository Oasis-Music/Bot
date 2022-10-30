import styled from 'styled-components'
import IconButton from '../../../shared/IconButton'

export const Container = styled.div`
  color: #fff;
  padding: 20px 10px 0 10px;
`

export const StepTitle = styled.h2`
  margin: 0;
  font-size: 4.5vh;
  text-align: start;
  margin-left: 10px;
  margin-bottom: 1.5vh;
`

export const Title = styled.p`
  font-size: 2.6vh;
  color: #ababab;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 5vh;
`

export const WaveWrapper = styled.div`
  margin: 1vh 0;
  margin-top: 4vh;
  padding: 0 15px;
`

interface WavesStyles {
  $isFile: boolean
}

export const Waves = styled.div<WavesStyles>`
  position: relative;
  &::before {
    content: '';
    width: 100%;
    height: 5px;
    border-radius: 15px;
    background-color: #0093e9;
    background-image: linear-gradient(292deg, #0093e9 0%, #80d0c7 100%);
    position: absolute;
    top: 40%;
    visibility: ${({ $isFile }) => ($isFile ? 'hidden' : 'visible')};
    opacity: ${({ $isFile }) => ($isFile ? '0' : '1')};
  }
`

export const PlayBottonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  margin-bottom: 6vh;
`

export const PlayBotton = styled(IconButton)`
  /* && {} */
  color: #1b1818;
  background-color: #fff;
  font-size: 2.8vh;
  padding: 3.5vh;
  &:disabled {
    box-shadow: none;
  }
  &:hover:not(:disabled) {
    background-color: #fff;
  }
`
