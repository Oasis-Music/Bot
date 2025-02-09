import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { searchSchema, type SearchSchemaType } from '../model/validation-schema'
import { SubmitHandler, useForm } from 'react-hook-form'

import styles from './styles.module.scss'

interface SearchProps {
  placeholder?: string
  onSubmit(value: string): void
}

export function Search({ placeholder, onSubmit }: SearchProps) {
  const { register, handleSubmit } = useForm<SearchSchemaType>({
    resolver: valibotResolver(searchSchema)
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
          className={styles.searchInput}
          {...register('searchQuery')}
        />
        <IconButton type="submit" className={styles.searchButton}>
          <Icon name="common/search" className="text-[24px]" />
        </IconButton>
      </form>
    </section>
  )
}
