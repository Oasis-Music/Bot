import * as v from 'valibot'

export const validationSchema = [
  // step #1
  v.object({
    title: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, '* минимум 3 символова'),
      v.maxLength(70, '* максимум 70 символов')
    ),
    author: v.pipe(
      v.string(),
      v.trim(),
      v.minLength(3, '* минимум 3 символова'),
      v.maxLength(70, '* максимум 70 символов')
    )
  }),
  // step #2
  v.object({
    coverImage: v.optional(v.instance(File))
  }),
  // step #3
  v.object({
    audioFile: v.instance(File)
  })
]
