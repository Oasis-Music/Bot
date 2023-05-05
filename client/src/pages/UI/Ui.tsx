import React from 'react'
import * as yup from 'yup'
import { Formik, Form } from 'formik'

import FormUI from './Form/Form'
import Buttons from './Buttons/Buttons'

const UISchema = yup.object({
  simpleInput: yup.string(),
  errorInput: yup.string().min(10, 'Мин 10 символов').required('Необходимое поле')
})

const UI: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (values: any) => {
    console.log(values)
  }

  return (
    <div>
      <div style={{ paddingLeft: 20, color: '#Fff' }}>
        <h3>Ваш шедевр готов!</h3>
        <Formik
          onSubmit={handleSubmit}
          validationSchema={UISchema}
          initialValues={{
            simpleInput: '',
            errorInput: '',
            password: 'password',
            price: '',
            baseCheckbox: false
          }}
          initialErrors={{
            input: '',
            errorInput: 'errorInput'
          }}
        >
          {() => (
            <Form>
              <FormUI />
              <Buttons />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default UI
