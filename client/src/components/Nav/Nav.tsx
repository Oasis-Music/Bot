import React from 'react'
import SvgIcon from '../../shared/SvgIcon'
import { routeNames } from '../../utils/history'
import SearchIcon from '../../assets/svg/search.svg?react'
import MusicListIcon from '../../assets/svg/list-music.svg?react'
import CogIcon from '../../assets/svg/cog.svg?react'
import { Container, UploadTrackLink, BaseLink } from './Nav.styled'
import { useTranslation } from 'react-i18next'

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
