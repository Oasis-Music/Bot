import React from 'react'
import { useTranslation } from 'react-i18next'

import { PlugWrapper, PlugBox, NoDataTextBox } from './Shared.styled'

export function NoDataPlug() {
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
