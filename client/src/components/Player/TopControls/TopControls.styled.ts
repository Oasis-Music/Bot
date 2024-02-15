import styled, { css } from 'styled-components'
import { IconButton } from '@/components/ui/IconButton'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.span`
  color: #cbcbcb;
  font-size: 3vh;
  font-weight: 500;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 20px;
  }
`

const controlButtonStyles = css`
  color: #838383;
  background: none;
  outline: none;

  &:active {
    color: #bbb;
  }
  &:hover:not(:disabled) {
    background-color: #fff;
    background-color: transparent;
  }
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
  }
`

export const MinimizeButton = styled(IconButton)`
  ${controlButtonStyles}
  font-size: 16px;
`
export const PlaylistButton = styled(IconButton)`
  ${controlButtonStyles}
  font-size: 13px;
`
