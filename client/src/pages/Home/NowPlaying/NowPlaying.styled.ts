import styled, { css } from 'styled-components'
import Button from '../../../shared/Button'
import IconButton from '../../../shared/IconButton'
import SvgIcon from '../../../shared/SvgIcon'

const buttonsStyles = css`
  color: #838383;
  padding: 15px;
  background: none;
  box-shadow: none;
  &:active {
    color: #bbb;
  }
  &:hover:not(:disabled) {
    background-color: #fff;
    background-color: transparent;
  }
`

export const Container = styled.section`
  display: flex;
  position: relative;
  padding: 35px 13px 15px 17px;
  margin-bottom: 30px;
  &::after {
    content: '';
    position: absolute;
    width: 60%;
    height: 2px;
    border-radius: 2px;
    background: #808080;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

export const ImageWrapper = styled.div`
  width: 150px;
  margin-right: 17px;
  border-radius: 15px;
  border: 1px solid #fff;
  /* box-shadow: 0 0 0px rgb(255 255 255 / 60%), 0 0 6px rgb(255 255 255 / 45%),
    0 0 10px rgb(255 255 255 / 25%), 0 0 30px rgb(255 255 255 / 10%); */
`

export const Details = styled.div`
  flex-grow: 1;
  padding: 23px 7px 10px 0;
`

export const TrackTitle = styled.h1`
  font-size: 17px;
  color: #fff;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
`
export const AuthorTitle = styled.p`
  font-size: 14px;
  color: #878787;
  font-weight: 400;
  margin: 0;
`

export const AddBotton = styled(Button)`
  && {
    color: #080808;
    padding: 10px 15px;
    background-color: #fff;
    font-size: 15px;
    border: none;
    margin-top: 27px;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
      0 0 70px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);

    &:disabled {
      box-shadow: none;
    }

    &:hover:not(:disabled) {
      background-color: #fff;
    }
  }
`

export const AddIcon = styled(SvgIcon)`
  font-size: 12px;
  margin-right: 5px;
`

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`

export const DeleteBotton = styled(IconButton)`
  && {
    ${buttonsStyles}
    padding: 0;
    font-size: 14px;
  }
`

export const DownloadBotton = styled(IconButton)`
  && {
    ${buttonsStyles}
    padding-top: 16px;
    font-size: 19px;
  }
`

export const CopyInfoBotton = styled(IconButton)`
  && {
    ${buttonsStyles}
    padding: 0;
    padding-top: 1px;
    font-size: 15px;
  }
`
