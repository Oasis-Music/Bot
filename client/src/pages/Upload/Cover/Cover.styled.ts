import styled from 'styled-components'
import IconButton from '../../../shared/IconButton'
import SvgIcon from '../../../shared/SvgIcon'

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  /* background-color: #3d3d33; */
  padding: 40px 50px 0 50px;
`

export const Title = styled.h2`
  text-align: center;
  color: #fff;
  margin: 0;
  margin-bottom: 15px;
`

interface containerStyles {
  dragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

const getColor = (props: containerStyles) => {
  if (props.dragActive) {
    return '#2196f3'
  }
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }

  return '#eeeeee'
}

export const ContainerUpload = styled.div<containerStyles>`
  box-sizing: border-box;
  position: relative;
  border: 3px dashed;
  border-color: #b5b5b5;
  border-radius: 8px;
  width: 100%;
  height: 100%;
  max-width: 240px;
  max-height: 240px;
  margin: 0 auto;
  outline: none;
  transition: border 0.3s;
  border-color: ${(props) => getColor(props)};
`

export const Preview = styled.img`
  display: block;
  width: inherit;
  height: inherit;
`

export const Plug = styled.div`
  color: #fff;
  /* background-color: #fff; */
  /* stroke: none; */
  height: 100%;
  display: flex;
  justify-content: center;
  font-size: 60px;
  align-items: center;
`

export const PlugIcon = styled(SvgIcon)`
  /* font-size: 60px; */
`

export const DeleteButton = styled(IconButton)`
  font-size: 13px;
  color: #ff0000;
  position: absolute;
  top: -19px;
  right: -19px;
  background-color: #fff;
  padding: 9px;
  &:active {
    color: #bbb;
  }
  &:hover:not(:disabled) {
    background-color: #fff;
  }
`
