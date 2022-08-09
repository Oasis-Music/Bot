import styled from 'styled-components'
import Button from '../../../shared/Button'
import SvgIcon from '../../../shared/SvgIcon'

export const Container = styled.section`
  display: flex;
  padding: 15px 13px;
  margin-bottom: 20px;
`

export const ImageWrapper = styled.div`
  width: 150px;
  margin-right: 17px;
  border-radius: 15px;
  box-shadow: 0 0 0px rgb(255 255 255 / 60%), 0 0 6px rgb(255 255 255 / 45%),
    0 0 10px rgb(255 255 255 / 25%), 0 0 30px rgb(255 255 255 / 10%);
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
