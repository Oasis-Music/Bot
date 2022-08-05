import styled, { css } from 'styled-components'
import IconButton from '../../../../shared/IconButton'
import SvgIcon from '../../../../shared/SvgIcon'

const arrowButtonStyles = css`
  color: #fff;
  font-size: 17px;
  background: none;
  &:hover:not(:disabled) {
    background-color: #fff;

    background-color: transparent;
  }
`

const subControlsBtsStyles = css`
  color: #838383;
  background: none;
  font-size: 13px;
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
`

export const InnerWrapper = styled.div``

export const PlayBotton = styled(IconButton)`
  && {
    color: #1b1818;
    background-color: #fff;
    font-size: 20px;
    padding: 25px;
    /* box-shadow: 0 0 10px #9521f3, 0 0 40px #c600ee, 0 0 80px #f704f7; */
    /* box-shadow: 0 0 0px #fff, 0 0 20px #fff, 0 0 60px #fff; */
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
      0 0 70px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);

    &:hover:not(:disabled) {
      background-color: #fff;
    }
  }
`

export const PrevBotton = styled(IconButton)`
  && {
    ${arrowButtonStyles}
  }
`

export const NextBotton = styled(IconButton)`
  && {
    ${arrowButtonStyles}
  }
`

export const RandomButton = styled(IconButton)`
  ${subControlsBtsStyles}
`
export const RepeatButton = styled(IconButton)`
  ${subControlsBtsStyles}
`

export const PrevArrowIcon = styled(SvgIcon)`
  transform: rotateY(180deg);
`
