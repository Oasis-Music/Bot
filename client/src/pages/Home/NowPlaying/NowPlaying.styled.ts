import styled, { css } from 'styled-components'
import Button from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { SvgIcon } from '@/components/ui/SvgIcon'

const buttonsStyles = css`
  flex-grow: 1;
  border-radius: 0;
  color: #2e2e2e;
  padding: 10px 5px;
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

export const InnerContainer = styled.div<{ $isAdded: boolean }>`
  display: flex;
  position: relative;
  padding: 3vh 1vh 2vh 3vh;
  padding-bottom: ${({ $isAdded }) => ($isAdded ? '0' : '2vh')};
  @media ${({ theme }) => theme.media.hsd} {
    padding: 35px 13px 15px 17px;
    padding-top: 2vh;
  }
`

export const ImageWrapper = styled.div`
  width: 23vh;
  height: 23vh;
  font-size: 4.5vh;
  margin-right: 17px;
  border-radius: 16px;
  background-color: #d6d6d6;
  padding: 2px;
  @media ${({ theme }) => theme.media.hsm} {
    width: 123px;
    height: 123px;
  }
`

export const Details = styled.div`
  flex-grow: 1;
  padding-top: 1.7vh;
`

export const TrackTitle = styled.h1`
  font-size: 3vh;
  color: #fff;
  font-weight: 600;
  margin: 0;
  margin-bottom: 7px;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 17px;
  }
`
export const AuthorTitle = styled.p`
  font-size: 2.4vh;
  color: #878787;
  font-weight: 500;
  margin: 0;
  @media ${({ theme }) => theme.media.hsm} {
    font-size: 14px;
  }
`

export const SaveBotton = styled(Button)`
  color: #080808;
  max-width: 220px;
  padding: 2vh 2.5vh;
  background-color: #fff;
  font-size: 2.7vh;
  border: none;
  margin-top: 4vh;
  box-shadow:
    0 0 25px rgba(255, 255, 255, 0.6),
    0 0 50px rgba(255, 255, 255, 0.45),
    0 0 70px rgba(255, 255, 255, 0.25),
    0 0 70px rgba(255, 255, 255, 0.1);

  &:disabled {
    box-shadow: none;
  }

  &:hover:not(:disabled) {
    background-color: #fff;
  }

  @media ${({ theme }) => theme.media.hsm} {
    padding: 1.5vh 2vh;
    margin-top: 2.7vh;
  }

  @media ${({ theme }) => theme.media.hsd} {
    padding: 7px 10px;
    font-size: 14px;
    max-width: 100%;
  }
`

export const AddIcon = styled(SvgIcon)`
  font-size: 2.5vh;
  margin-right: 5px;
  @media ${({ theme }) => theme.media.hsd} {
    font-size: 12px;
  }
`

export const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2vh;
  background-color: #fff;
  border-radius: 14px;
  max-width: 175px;
  @media ${({ theme }) => theme.media.hxs} {
    margin-top: 10px;
  }
`

export const DeleteBotton = styled(IconButton)`
  ${buttonsStyles}
  font-size: 16px;
`

export const ShareBotton = styled(IconButton)`
  ${buttonsStyles}
  font-size: 16px;
`

export const CopyInfoBotton = styled(IconButton)`
  ${buttonsStyles}
  font-size: 16px;
`

export const InfoLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 11px 3px 9px;
  font-size: 15px;
  font-weight: 500;
  color: #898989;
  & span:last-child {
    color: #cbcbcb;
  }
  & div {
    position: relative;
    width: 100%;
    &::after {
      content: '';
      position: absolute;
      width: 80%;
      height: 2px;
      border-radius: 2px;
      background: #808080;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`
