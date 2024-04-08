import { Checkbox } from '@/shared/ui/checkbox'
import { TextInput } from '@/shared/ui/text-input'
import { useFormContext } from 'react-hook-form'

import styles from './Form.module.scss'

export function TextInputs() {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div>
      <h4>Text Inputs:</h4>
      <div className={styles.box}>
        <div className={styles.inputWrapper}>
          <TextInput
            name="simpleInput"
            placeholder="Simple Input"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            name="errorInput"
            placeholder="With Error Input"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            name="price"
            placeholder="Number Input"
            type="number"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            name="price"
            placeholder="Disabled"
            disabled
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            errors={errors}
          />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput
            name="simpleInput"
            placeholder="Multiline Input"
            multiline
            rows={5}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <h4>Checkbox:</h4>
      <div>
        <Checkbox register={register} name="baseCheckbox" />
      </div>
      <div style={{ color: '#fff' }}>
        <Checkbox register={register} name="baseCheckbox" label="with label" />
      </div>
    </div>
  )
}
