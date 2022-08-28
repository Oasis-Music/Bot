import React from 'react'
import SvgIcon from '../../shared/SvgIcon'
import { Container, SearchButton } from './Nav.styled'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'
import history from '../../utils/history'

const Nav: React.FC = () => {
  const searchClickHandler = () => {
    history.push('/test')
  }

  return (
    <Container>
      <SearchButton onClick={searchClickHandler}>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </SearchButton>
    </Container>
  )
}

export default Nav
