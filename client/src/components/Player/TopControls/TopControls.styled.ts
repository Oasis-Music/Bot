import styled, { css } from 'styled-components'
import IconButton from '../../../shared/IconButton'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.span`
  color: #cbcbcb;
  font-size: 18px;
  font-weight: 500;
`

const controlButtonStyles = css`
  color: #838383;
  background: none;
  &:active {
    color: #bbb;
  }
  &:hover:not(:disabled) {
    background-color: #fff;
    background-color: transparent;
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
