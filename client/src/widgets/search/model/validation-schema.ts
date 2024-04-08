import { Input, object, string, toTrimmed, maxLength, minLength } from 'valibot'

export const SearchSchema = object({
  searchQuery: string([toTrimmed(), minLength(1, '____'), maxLength(70, '* максимум 70 символов')])
})

export type SearchSchemaType = Input<typeof SearchSchema>
