import { object, string, minLength, maxLength, optional, instance, toTrimmed } from 'valibot'

export const validationSchema = [
  // step #1
  object({
    title: string([
      toTrimmed(),
      minLength(3, '* минимум 3 символова'),
      maxLength(70, '* максимум 70 символов')
    ]),
    author: string([
      toTrimmed(),
      minLength(3, '* минимум 3 символова'),
      maxLength(70, '* максимум 70 символов')
    ])
  }),
  // step #2
  object({
    coverImage: optional(instance(File))
  }),
  // step #3
  object({
    audioFile: instance(File)
  })
]
