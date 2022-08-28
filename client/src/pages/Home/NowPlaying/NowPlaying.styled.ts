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

interface ContainerProps {
  $isAdded: boolean
}

export const Container = styled.section<ContainerProps>`
  display: flex;
  position: relative;
  padding: 4vh 1vh 2vh 3vh;
  padding-bottom: ${({ $isAdded }) => ($isAdded ? '0' : '2vh')};
  margin-bottom: 3vh;
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
  @media ${({ theme }) => theme.media.hxs} {
    padding: 35px 13px 15px 17px;
    margin-bottom: 30px;
  }
`

export const ImageWrapper = styled.div`
  width: 21vh;
  height: 21vh;
  margin-right: 17px;
  border-radius: 15px;
  border: 1px solid #fff;
  @media ${({ theme }) => theme.media.hxs} {
    width: 150px;
    height: 150px;
  }
`

export const Details = styled.div`
  flex-grow: 1;
  padding: 2vh 0.5vh 1.2vh 0;
  @media ${({ theme }) => theme.media.hxs} {
    padding: 23px 7px 10px 0;
  }
`

export const TrackTitle = styled.h1`
  font-size: 3.5vh;
  color: #fff;
  font-weight: 500;
  margin: 0;
  margin-bottom: 5px;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 17px;
  }
`
export const AuthorTitle = styled.p`
  font-size: 3vh;
  color: #878787;
  font-weight: 400;
  margin: 0;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 14px;
  }
`

export const AddBotton = styled(Button)`
  && {
    color: #080808;
    max-width: 220px;
    padding: 2vh 2.5vh;
    background-color: #fff;
    font-size: 2.7vh;
    border: none;
    margin-top: 2.7vh;
    box-shadow: 0 0 25px rgba(255, 255, 255, 0.6), 0 0 50px rgba(255, 255, 255, 0.45),
      0 0 70px rgba(255, 255, 255, 0.25), 0 0 70px rgba(255, 255, 255, 0.1);

    &:disabled {
      box-shadow: none;
    }

    &:hover:not(:disabled) {
      background-color: #fff;
    }

    @media ${({ theme }) => theme.media.hxs} {
      margin-top: 27px;
      font-size: 15px;
      padding: 10px 15px;
      max-width: 100%;
    }
  }
`

export const AddIcon = styled(SvgIcon)`
  font-size: 2.5vh;
  margin-right: 5px;
  @media ${({ theme }) => theme.media.hxs} {
    font-size: 12px;
  }
`

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1vh;
  @media ${({ theme }) => theme.media.hxs} {
    margin-top: 10px;
  }
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
