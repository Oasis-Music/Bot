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

export const TimeBox = styled.div`
  display: flex;
  margin-top: 9px;
  padding: 0 19px;
  color: #b1b1b1;
  font-weight: 500;
  font-size: 14px;
  justify-content: space-between;
`

export const PlayBottonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2vh;
  margin-bottom: 4vh;
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

export const AttachWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1vh;
`
