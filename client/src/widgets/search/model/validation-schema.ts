import * as v from 'valibot'

export const searchSchema = v.object({
  searchQuery: v.pipe(v.string(), v.trim(), v.nonEmpty(), v.maxLength(70, '* максимум 70 символов'))
})

export type SearchSchemaType = v.InferOutput<typeof searchSchema>
