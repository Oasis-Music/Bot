import styled from 'styled-components'

export const Container = styled.div``

export const WaveWrapper = styled.div`
  margin: 1vh 0;
  margin-top: 4vh;
  padding: 0 15px;
  @media ${({ theme }) => theme.media.hxs} {
    margin: 13px 0;
    margin-top: 35px;
  }
`

export const TimeBox = styled.div`
  display: flex;
  margin: 0;
  padding: 0 19px;
  color: #b1b1b1;
  font-weight: 500;
  font-size: 14px;
  justify-content: space-between;
`

export const LoaderWrapper = styled.div``
