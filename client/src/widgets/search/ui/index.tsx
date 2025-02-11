import { valibotResolver } from '@hookform/resolvers/valibot'
import { searchSchema, type SearchSchemaType } from '../model/validation-schema'
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form'

import { SearchField } from '@/shared/ui/search-field'

interface SearchProps {
  placeholder?: string
  onSubmit(value: string): void
}

export function Search({ placeholder, onSubmit }: SearchProps) {
  const formMethods = useForm<SearchSchemaType>({
    resolver: valibotResolver(searchSchema)
  })

  const handleSearch: SubmitHandler<SearchSchemaType> = (value) => {
    console.log('search', value)
    onSubmit(value.searchQuery)
  }

  return (
    <section>
      <FormProvider {...formMethods}>
        <form
          noValidate
          onSubmit={formMethods.handleSubmit(handleSearch)}
          className="flex px-1.5 py-5"
        >
          <SearchField name="searchQuery" placeholder={placeholder} />
        </form>
      </FormProvider>
    </section>
  )
}
