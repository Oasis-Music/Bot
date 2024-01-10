import styled from 'styled-components'
import IconButton from '@/components/ui/IconButton'
import SvgIcon from '@/components/ui/SvgIcon'

export const Container = styled.div`
  color: #fff;
  box-sizing: border-box;
  padding: 20px 10px 0 10px;
`

export const StepTitle = styled.h2`
  margin: 0;
  font-size: 4.5vh;
  text-align: start;
  margin-left: 10px;
  margin-bottom: 1.5vh;
`

export const Title = styled.p`
  font-size: 2.6vh;
  color: #ababab;
  margin: 0;
  margin-left: 10px;
  margin-bottom: 5vh;
`

interface containerStyles {
  $droped: boolean
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
  position: relative;
  border-width: 2px;
  border-style: ${({ $droped }) => ($droped ? 'solid' : 'dashed')};
  border-color: #b5b5b5;
  border-radius: 8px;
  width: 41vh;
  aspect-ratio: 1 / 1;
  margin: 0 auto;
  outline: none;
  transition: border 0.3s;
  border-color: ${(props) => getColor(props)};
  margin: 0 auto;
`

export const Preview = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 8px;
`

export const Plug = styled.div`
  color: #fff;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 8px;
  margin-bottom: 7px;
`

export const PlugIcon = styled(SvgIcon)`
  font-size: 9vh;
`

export const PlugInfo = styled.div`
  & > p {
    font-size: 2.7vh;
    padding: 0 5px;
    text-align: center;
    margin-bottom: 8px;
  }
  & > ul {
    font-size: 2.3vh;
    color: #b5b5b5;
    list-style: disc;
    display: table;
    margin: 0 auto;
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

export const ErrorMessage = styled.p<{ $err: boolean }>`
  color: #ff182e;
  text-align: center;
  font-size: 14px;
  line-height: 14px;
  margin: 0;
  margin-top: 10px;
  height: 13px;
  transition: all 0.3s linear;
  margin-bottom: 5vh;
  transition: opacity 0.2s ease-in-out;
  opacity: ${({ $err }) => ($err ? 1 : 0)};
`
