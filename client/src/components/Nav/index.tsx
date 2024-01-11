import React from 'react'
import SvgIcon from '@/components/ui/SvgIcon'
import SearchIcon from '@/assets/svg/search.svg?react'
import MusicListIcon from '@/assets/svg/list-music.svg?react'
import CogIcon from '@/assets/svg/cog.svg?react'
import { routeNames } from '@/utils/history'
import { useTranslation } from 'react-i18next'
import { Container, UploadTrackLink, BaseLink } from './Nav.styled'

const Nav: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Container>
      <BaseLink to={routeNames.explore}>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </BaseLink>
      <BaseLink to={routeNames.root}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </BaseLink>
      <BaseLink to={routeNames.settings}>
        <SvgIcon>
          <CogIcon />
        </SvgIcon>
      </BaseLink>
      <UploadTrackLink to={routeNames.upload}>
        <span>{t('layout.upload')}</span>
      </UploadTrackLink>
    </Container>
  )
}

export default Nav
