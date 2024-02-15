import React from 'react'
import thinkEmojiImage from '@/assets/rastr/thinking.png'
import { useTranslation } from 'react-i18next'

import { PlugWrapper, PlugBox, Image } from './Shared.styled'

export function ErrorPlug() {
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
