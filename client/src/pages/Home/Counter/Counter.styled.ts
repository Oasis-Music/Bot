import styled from 'styled-components'

export const Container = styled.div`
  color: #cbcbcb;
  display: flex;
  justify-content: space-between;
  padding: 0 11px 3px 9px;
  font-size: 15px;
  font-weight: 500;
`

export const Line = styled.div`
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
`
