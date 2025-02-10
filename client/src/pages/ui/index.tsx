import { Inputs } from './inputs'
import { Buttons } from './Buttons/Buttons'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import * as v from 'valibot'

const UISchema = v.object({
  simpleInput: v.string(),
  errorInput: v.pipe(v.string(), v.trim(), v.minLength(3, '* минимум 3 символова'))
})

type formValues = v.InferOutput<typeof UISchema>

export default function UI() {
  const handleSubmit: SubmitHandler<formValues> = (data) => {
    console.log(data)
  }

  const formMethods = useForm<formValues>({
    mode: 'onChange',
    resolver: valibotResolver(UISchema)
  })

  return (
    <div className="bg-black">
      <div style={{ color: '#Fff' }}>
        <h3>Ваш шедевр готов!</h3>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <Inputs />
            <Buttons />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
