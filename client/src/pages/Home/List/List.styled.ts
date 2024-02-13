import styled from 'styled-components'

export const ItemsList = styled.ul<{ $isPlay: boolean }>`
  height: ${({ $isPlay }) => ($isPlay ? 'calc(60vh - 60px)' : '60vh')};
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
  @media ${({ theme }) => theme.media.hsd} {
    height: 100%;
    padding-bottom: ${({ $isPlay }) => ($isPlay ? '20vh' : '10vh')};
  }
  @media ${({ theme }) => theme.media.hxs} {
    padding-bottom: ${({ $isPlay }) => ($isPlay ? '17vh' : '7vh')};
  }
`
