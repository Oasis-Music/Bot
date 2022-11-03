import React from 'react'
import history from '../../utils/history'
import routeNames from '../../utils/routeNames'
import SvgIcon from '../../shared/SvgIcon'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'
import { ReactComponent as MusicListIcon } from '../../assets/svg/list-music.svg'
import { ReactComponent as CogIcon } from '../../assets/svg/cog.svg'
import { Container, ControlButton, AddTrackLink } from './Nav.styled'

const Nav: React.FC = () => {
  const searchClickHandler = () => {
    history.push('/search')
  }

  const playlistClickHandler = () => {
    history.push('/')
  }

  const cogClickHandler = () => {
    history.push('/test')
  }

  return (
    <Container>
      <ControlButton onClick={searchClickHandler}>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </ControlButton>
      <ControlButton onClick={playlistClickHandler}>
        <SvgIcon>
          <MusicListIcon />
        </SvgIcon>
      </ControlButton>
      {process.env.NODE_ENV === 'development' && (
        <ControlButton onClick={cogClickHandler}>
          <SvgIcon>
            <CogIcon />
          </SvgIcon>
        </ControlButton>
      )}
      <AddTrackLink to={routeNames.upload}>
        <span>Добавить трек</span>
      </AddTrackLink>
    </Container>
  )
}

export default Nav
