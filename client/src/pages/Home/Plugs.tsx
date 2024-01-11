import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import thinkEmojiImage from '@/assets/rastr/thinking.png'

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
  const { t } = useTranslation()

  return (
    <PlugWrapper>
      <PlugBox>
        <Image src={thinkEmojiImage} />
        <div>
          <h1>{t('pages.home.plugs.fetchErr.title')}</h1>
          <p>{t('pages.home.plugs.fetchErr.subtitle')}</p>
        </div>
      </PlugBox>
    </PlugWrapper>
  )
}

export const NoDataPlug: React.FC = () => {
  const { t } = useTranslation()

  return (
    <PlugWrapper>
      <PlugBox>
        <NoDataTextBox>
          <h1>{t('pages.home.plugs.nodata.title')}</h1>
          <p>{t('pages.home.plugs.nodata.subtitle')}</p>
        </NoDataTextBox>
      </PlugBox>
    </PlugWrapper>
  )
}
