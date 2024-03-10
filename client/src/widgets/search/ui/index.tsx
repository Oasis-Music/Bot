import SearchIcon from '@/shared/assets/svg/search.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'
import { IconButton } from '@/shared/ui/icon-button'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { SearchSchema, type SearchSchemaType } from '../model/validation-schema'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './search.module.scss'

interface SearchProps {
  placeholder?: string
  onSubmit(value: string): void
}

export function Search({ placeholder, onSubmit }: SearchProps) {
  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: valibotResolver(SearchSchema)
  })

  const handleSearch: SubmitHandler<SearchSchemaType> = (value) => {
    console.log('search', value)
    onSubmit(value.searchQuery)
  }

  return (
    <section>
      <form noValidate onSubmit={handleSubmit(handleSearch)} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          placeholder={placeholder}
          className={styles.searchField}
          {...register('searchQuery')}
        />
        <IconButton type="submit" className={styles.searchButton}>
          <SvgIcon>
            <SearchIcon />
          </SvgIcon>
        </IconButton>
      </form>
    </section>
  )
}
