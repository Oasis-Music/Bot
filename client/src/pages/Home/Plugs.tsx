import React from 'react'
import styled from 'styled-components'
import thinkEmojiImage from '../../assets/rastr/thinking.png'

const PlugWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 10vh;
`

const PlugBox = styled.div`
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

const Image = styled.img`
  display: block;
  width: 18vh;
  margin-right: 10px;
  margin: 0 auto;
  margin-bottom: 3vh;
`

const NoDataTextBox = styled.div`
  color: #777777;
`

export const ErrorPlug: React.FC = () => {
  return (
    <PlugWrapper>
      <PlugBox>
        <Image src={thinkEmojiImage} />
        <div>
          <h1>Ой!</h1>
          <p>Похоже произошла ошибка, попробуйте повторить попытку</p>
        </div>
      </PlugBox>
    </PlugWrapper>
  )
}

export const NoDataPlug: React.FC = () => {
  return (
    <PlugWrapper>
      <PlugBox>
        <NoDataTextBox>
          <h1>Это твои плейлист </h1>
          <p>тут будут отображаться добавленные тобой треки</p>
        </NoDataTextBox>
      </PlugBox>
    </PlugWrapper>
  )
}
