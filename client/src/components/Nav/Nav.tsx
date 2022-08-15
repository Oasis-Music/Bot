import React from 'react'
import SvgIcon from '../../shared/SvgIcon'
import { Container, SearchButton } from './Nav.styled'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'

const Nav: React.FC = () => {
  return (
    <Container>
      <SearchButton>
        <SvgIcon>
          <SearchIcon />
        </SvgIcon>
      </SearchButton>
    </Container>
  )
}

export default Nav
