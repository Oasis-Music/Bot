import React from 'react'
import { Formik } from 'formik'
import { Container, SearchField, SearchButton } from './Search.styled'
import { ExploreSearchSchema, ExploreSearchSchemaTypes } from '../../utils/validationSchemas'
import SvgIcon from '../../shared/SvgIcon'
import { ReactComponent as SearchIcon } from '../../assets/svg/search.svg'

const Search: React.FC = () => {
  const initialValues: ExploreSearchSchemaTypes = { searchQuery: '' }

  const handleSearch = (values: ExploreSearchSchemaTypes) => {
    console.log('search:', values.searchQuery)
  }

  return (
    <section>
      <Formik
        onSubmit={handleSearch}
        initialValues={initialValues}
        validationSchema={ExploreSearchSchema}
      >
        {() => (
          <Container noValidate>
            <SearchField name="searchQuery" autoComplete="off" placeholder="Я ищу..." />
            <SearchButton withoutShadow color="secondary" type="submit">
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </SearchButton>
          </Container>
        )}
      </Formik>
    </section>
  )
}

export default Search
