import React from 'react'
import history, { routeNames } from '../../utils/history'
import SvgIcon from '../../shared/SvgIcon'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'
import { ReactComponent as MusicListIcon } from '../../assets/svg/list-music.svg'
import { ReactComponent as CogIcon } from '../../assets/svg/cog.svg'
import { Container, ControlButton, UploadTrackLink } from './Nav.styled'

const Nav: React.FC = () => {
  const searchClickHandler = () => {
    history.push(routeNames.explore)
  }

  const playlistClickHandler = () => {
    history.push(routeNames.root)
  }

  const cogClickHandler = () => {
    history.push(routeNames.test)
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
      <UploadTrackLink to={routeNames.upload}>
        <span>Загрузить трек</span>
      </UploadTrackLink>
    </Container>
  )
}

export default Nav
