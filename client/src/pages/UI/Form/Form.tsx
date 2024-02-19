import React from 'react'
import { TextInput } from '@/components/ui/TextInput'
import { Checkbox } from '@/components/ui/Checkbox'

import styles from './Form.module.scss'

export function TextInputs() {
  return (
    <div>
      <h4>Text Inputs:</h4>
      <div className={styles.box}>
        <div className={styles.inputWrapper}>
          <TextInput name="simpleInput" placeholder="Simple Input" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput name="errorInput" placeholder="With Error Input" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput name="price" placeholder="Number Input" type="number" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput name="price" placeholder="Disabled" disabled />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput name="password" type="password" placeholder="Password" />
        </div>
        <div className={styles.inputWrapper}>
          <TextInput name="simpleInput" placeholder="Multiline Input" multiline rows={5} />
        </div>
      </div>
      <h4>Checkbox:</h4>
      <div>
        <Checkbox name="baseCheckbox" />
      </div>
      <div style={{ color: '#fff' }}>
        <Checkbox name="baseCheckbox" label="with label" />
      </div>
    </div>
  )
}
