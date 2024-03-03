import * as yup from 'yup'

export const ExploreSearchSchema = yup.object({
  searchQuery: yup.string().trim().required()
})

export type ExploreSearchSchemaTypes = yup.InferType<typeof ExploreSearchSchema>
