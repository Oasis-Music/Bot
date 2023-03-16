import styled, { css } from 'styled-components'
import IconButton from '../../../../shared/IconButton'
import SvgIcon from '../../../../shared/SvgIcon'

const arrowButtonStyles = css`
  color: #fff;
  font-size: 3vh;
  background: none;
  outline: none;
  &:hover:not(:disabled) {
    background-color: #fff;
    background-color: transparent;
  }
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 17px;
  }
`

const subControlsBtsStyles = css`
  color: #838383;
  background: none;
  font-size: 13px;
  outline: none;
  &:focus-visible {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:active {
    color: #bbb;
  }
  &:hover:not(:disabled) {
    background-color: transparent;
  }
`

export const Container = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`

export const PlayButtonBox = styled.div`
  align-self: center;
`

export const PlayButton = styled(IconButton)`
  color: #1b1818;
  background-color: #fff;
  font-size: 3vh;
  padding: 4vh;
  outline: none;
  &:focus-visible {
    background-color: ${({ theme }) => theme.colors.primary};
  }
  /* box-shadow: 0 0 10px #9521f3, 0 0 40px #c600ee, 0 0 80px #f704f7; */
  /* box-shadow: 0 0 0px #fff, 0 0 20px #fff, 0 0 60px #fff; */
  box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
    0 0 70px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);

  &:disabled {
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
  }

  @media ${({ theme }) => theme.media.hxs} {
    font-size: 20px;
    padding: 25px;
  }
`

export const PrevButton = styled(IconButton)`
  && {
    ${arrowButtonStyles}
  }
`

export const NextButton = styled(IconButton)`
  && {
    ${arrowButtonStyles}
  }
`
interface loopButtonStyles {
  $loop: boolean
}

export const RandomButton = styled(IconButton)`
  ${subControlsBtsStyles}
`
export const LoopButton = styled(IconButton)<loopButtonStyles>`
  ${subControlsBtsStyles}
  color: ${({ $loop }) => ($loop ? '#fff' : '#838383')};
`

export const PrevArrowIcon = styled(SvgIcon)`
  transform: rotateY(180deg);
`
