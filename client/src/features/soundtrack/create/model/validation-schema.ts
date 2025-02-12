import * as v from 'valibot'

const infoSchema = v.object({
  title: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common.validation.requiredField'),
    v.minLength(2, 'common.validation.minLength2'),
    v.maxLength(70, 'common.validation.maxLength70')
  ),
  author: v.pipe(
    v.string(),
    v.trim(),
    v.nonEmpty('common.validation.requiredField'),
    v.minLength(2, 'common.validation.minLength2'),
    v.maxLength(70, 'common.validation.maxLength70')
  )
})

export const validationSchema = [
  infoSchema,
  // step #2
  v.object({
    coverImage: v.optional(v.instance(File))
  }),
  // step #3
  v.object({
    audioFile: v.instance(File)
  })
]

export type InfoValues = v.InferOutput<typeof infoSchema>
