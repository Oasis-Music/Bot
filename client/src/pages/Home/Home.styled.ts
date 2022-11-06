import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  color: #fff;
`

interface listStyleProps {
  $isPlay: boolean
}

export const List = styled.ul<listStyleProps>`
  height: ${({ $isPlay }) => ($isPlay ? 'calc(60vh - 52px)' : '60vh')};
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background-color: #9f9f9f !important;
  }
  @media ${({ theme }) => theme.media.hxs} {
    max-height: calc(100% - 265px);
  }
`

export const MountLoader = styled.div`
  height: 100%;
  max-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ErrorPlugWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10vh;
`

export const ErrorPlugBox = styled.div`
  align-items: center;
  padding: 0 13px;
  text-align: center;
  & h1 {
    font-size: 4vh;
    margin: 0;
    margin-bottom: 1vh;
  }

  & p {
    margin: 0 auto;
    max-width: 350px;
  }
`

export const ErrorImg = styled.img`
  display: block;
  width: 18vh;
  margin-right: 10px;
  margin: 0 auto;
  margin-bottom: 3vh;
`
