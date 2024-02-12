import styled from 'styled-components'

export const PlugWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10vh;
`

export const PlugBox = styled.div`
  align-items: center;
  padding: 0 13px;
  text-align: center;
  & h1 {
    font-size: 4vh;
    margin: 0;
    margin-bottom: 1vh;
  }

  & p {
    margin: 0 auto;
    max-width: 350px;
  }
`

export const Image = styled.img`
  display: block;
  width: 18vh;
  margin-right: 10px;
  margin: 0 auto;
  margin-bottom: 3vh;
`

export const NoDataTextBox = styled.div`
  color: #afafaf;
`
