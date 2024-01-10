import styled from 'styled-components'
import SvgIcon from '@/components/ui/SvgIcon'

interface containerStyles {
  isError: boolean
  isDragActive: boolean
  isDragAccept: boolean
  isDragReject: boolean
}

const getColor = (props: containerStyles) => {
  if (props.isDragActive) {
    return '#2196f3'
  }
  if (props.isDragAccept) {
    return '#00e676'
  }
  if (props.isDragReject) {
    return '#ff1744'
  }
  if (props.isError) {
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
  width: 85vw;
  margin: 0 auto;
  outline: none;
  transition: border 0.3s;
  border-color: ${(props) => getColor(props)};
  margin: 0 auto;
  margin-bottom: 2vh;
`

export const Plug = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
`

export const PlugIconBox = styled.div`
  padding: 3vh 2vh;
`

export const PlugIcon = styled(SvgIcon)`
  font-size: 9vh;
`

export const PlugInfo = styled.div`
  padding-bottom: 1.5vh;
  & > p {
    font-size: 2.4vh;
    padding: 0 5px;
    text-align: center;
    margin-top: 1.5vh;
    margin-bottom: 1.5vh;
  }
  & > ul {
    font-size: 2.3vh;
    color: #b5b5b5;
    list-style: disc;
    display: table;
    margin: 0 auto;
  }
`

export const ErrorMessage = styled.p<{ $err: boolean }>`
  color: #ff182e;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  margin: 0;
  margin-top: 10px;
  height: 13px;
  transition: all 0.3s linear;
  margin-bottom: 3vh;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $err }) => ($err ? 1 : 0)};
`
