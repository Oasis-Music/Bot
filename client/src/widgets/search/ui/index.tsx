import React from 'react'
import SearchIcon from '@/assets/svg/search.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { Formik, Form, Field } from 'formik'
import { ExploreSearchSchema, type ExploreSearchSchemaTypes } from '../model/validation-schema'

import styles from './search.module.scss'

interface SearchProps {
  placeholder?: string
  onSubmit(value: string): void
}

export function Search({ placeholder, onSubmit }: SearchProps) {
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
          <Form noValidate className={styles.form}>
            <Field
              name="searchQuery"
              autoComplete="off"
              placeholder={placeholder}
              className={styles.searchField}
            />
            <IconButton type="submit" className={styles.searchButton}>
              <SvgIcon>
                <SearchIcon />
              </SvgIcon>
            </IconButton>
          </Form>
        )}
      </Formik>
    </section>
  )
}
