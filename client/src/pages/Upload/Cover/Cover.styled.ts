import styled from 'styled-components'
import IconButton from '../../../shared/IconButton'
import SvgIcon from '../../../shared/SvgIcon'

export const Container = styled.div`
  color: #fff;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  padding: 20px 10px 0 10px;
`

export const StepTitle = styled.h2`
  margin: 0;
  margin-left: 10px;
  margin-bottom: 20px;
  text-align: start;
`

export const Title = styled.p`
  color: #aaaaaa;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 20px;
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
  border: 2px dashed;
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
  margin: 0 auto;
  margin-bottom: 20px;
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
  flex-direction: column;
  font-size: 60px;
  align-items: center;
  border-radius: 8px;
`

export const PlugIcon = styled(SvgIcon)`
  /* font-size: 60px; */
`

export const PlugInfo = styled.div`
  font-size: 14px;
  & > p {
    padding: 0 5px;
    text-align: center;
  }
  & > ul {
    list-style: disc;
  }
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
