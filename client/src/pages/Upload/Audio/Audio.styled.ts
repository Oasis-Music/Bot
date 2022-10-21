import styled from 'styled-components'

export const UploadWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: lightcyan;
`

export const WaveWrapper = styled.div`
  margin: 1vh 0;
  margin-top: 4vh;
  padding: 0 15px;
  @media ${({ theme }) => theme.media.hxs} {
    margin: 13px 0;
    margin-top: 35px;
  }
`
