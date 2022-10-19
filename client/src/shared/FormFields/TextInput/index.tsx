import React from 'react'
import styled, { css } from 'styled-components'
import { useSpring, animated } from 'react-spring'
import { useField } from 'formik'

interface TextInputProps {
  name: string
  type?: string
  rows?: number
  disabled?: boolean
  multiline?: boolean
  maxLength?: number
  placeholder?: string
  autoComplete?: string
  hiddenLabel?: boolean
  hideErrorMessage?: boolean
  onChange?(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void
}

interface BaseInputStyles {
  $error: boolean
}

const baseStyles = css<BaseInputStyles>`
  font: inherit;
  display: block;
  color: currentColor;
  box-sizing: border-box;
  user-select: text;
  width: 100%;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  padding: 13px 8px 11px 10px;
  margin-bottom: 5px;
  color: #fff;
  outline-width: 0;
  user-select: text;
  border-radius: 8px;
  background-color: #434343;
  border: 1px solid;
  border-color: ${({ $error }) => ($error ? '#ff182e' : '#6a6a6a')};
  -webkit-tap-highlight-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  transition: all 0.2s;

  &:focus {
    border: 1px solid #989898;
  }
  &:focus::placeholder {
    opacity: 0.25;
  }
  &::placeholder {
    color: #919191;
    font-size: 14px;
    font-weight: 400;
  }
  &:disabled {
    cursor: not-allowed;
    background-color: #3d3d3d;
    border: 1px solid transparent;
  }
`

const MultilineInput = styled.textarea<BaseInputStyles>`
  ${baseStyles}
  resize: none;
`

const BaseInput = styled.input<BaseInputStyles>`
  ${baseStyles}
`

const ErrorMessage = styled.p`
  height: 24px;
  font-size: 13px;
  margin: 0;
  color: #ff182e;
  padding-left: 10px;
  opacity: 1;
  transition: all 0.3s linear;
`

const TextInput: React.FC<TextInputProps> = ({
  autoComplete = 'off',
  maxLength = 50,
  hideErrorMessage = false,
  type = 'text',
  multiline,
  ...restProps
}) => {
  const [field, meta] = useField(restProps)

  const isErr = meta.touched && !!meta.error

  const fadeStyles = useSpring({
    config: { duration: 250 },
    from: { opacity: 0 },
    to: {
      opacity: isErr ? 1 : 0
    }
  })

  return (
    <div>
      {!!multiline ? (
        <MultilineInput {...field} {...restProps} $error={isErr} />
      ) : (
        <BaseInput {...field} {...restProps} $error={isErr} type={type} />
      )}
      {!hideErrorMessage && (
        <animated.div style={fadeStyles}>
          <ErrorMessage>{meta.touched && meta.error}</ErrorMessage>
        </animated.div>
      )}
    </div>
  )
}

export default TextInput
