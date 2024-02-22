import * as yup from 'yup'

export const uploadTrackSchema = yup.object({
  title: yup
    .string()
    .min(3, '* минимум 3 символова')
    .max(70, '* максимум 70 символов')
    .trim()
    .required('* обязательное поле'),
  author: yup
    .string()
    .min(3, '* минимум 3 символа')
    .max(70, '* максимум 70 символов')
    .trim()
    .required('* обязательное поле'),

  coverImage: yup.mixed(),
  audiofile: yup.mixed().required()
})

export type SchemaType = yup.InferType<typeof uploadTrackSchema>
