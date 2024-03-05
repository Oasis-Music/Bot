import { TextInputs } from './Form/Form'
import { Buttons } from './Buttons/Buttons'
import { valibotResolver } from '@hookform/resolvers/valibot'
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form'
import * as v from 'valibot'

const UISchema = v.object({
  simpleInput: v.string(),
  errorInput: v.string([v.toTrimmed(), v.minLength(3, '* минимум 3 символова')])
})

type formValues = v.Input<typeof UISchema>

export default function UI() {
  const handleSubmit: SubmitHandler<formValues> = (data) => {
    console.log(data)
  }

  const formMethods = useForm<formValues>({
    mode: 'onChange',
    resolver: valibotResolver(UISchema)
  })

  return (
    <div>
      <div style={{ paddingLeft: 20, color: '#Fff' }}>
        <h3>Ваш шедевр готов!</h3>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <TextInputs />
            <Buttons />
          </form>
        </FormProvider>
      </div>
    </div>
  )
}
