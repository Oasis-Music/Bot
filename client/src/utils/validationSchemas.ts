import * as yup from 'yup'

export const createTrackStepsSchema = [
  yup.object().shape({
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
      .required('* обязательное поле')
  }),
  yup.object().shape({
    coverImage: yup.mixed().required()
  })
]

// export type CreateTrackSchemaType = yup.InferType<typeof createTrackSchema>
