import React from 'react'
import SvgIcon from '@/components/ui/SvgIcon'
import SearchIcon from '@/assets/svg/search.svg?react'
import { Formik } from 'formik'
import { ExploreSearchSchema, ExploreSearchSchemaTypes } from '@/utils/validationSchemas'
import { Container, SearchField, SearchButton } from './Search.styled'

interface SearchProps {
  placeholder?: string
  onSubmit(value: string): void
}

const Search: React.FC<SearchProps> = ({ placeholder, onSubmit }) => {
  const initialValues: ExploreSearchSchemaTypes = { searchQuery: '' }

  const handleSearch = (value: ExploreSearchSchemaTypes) => {
    onSubmit(value.searchQuery.trim())
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
            <SearchField name="searchQuery" autoComplete="off" placeholder={placeholder} />
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
