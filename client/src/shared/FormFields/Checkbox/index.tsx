import React from 'react'
import styled from 'styled-components'
import { useField } from 'formik'

interface CheckboxProps {
  name: string
  checked?: boolean
  label?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const Wrapper = styled.span`
  display: -webkit-inline-box;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  vertical-align: middle;
  -moz-appearance: none;
  -webkit-appearance: none;
  -webkit-text-decoration: none;
  text-decoration: none;
  color: inherit;
  padding: 9px;
  border-radius: 50%;
`

const BaseCheckbox = styled.input`
  cursor: inherit;
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  margin: 0;
  padding: 0;
  z-index: 1;
`

const Icon = styled.svg<{ $checked: boolean }>`
  font-size: 2rem;
  user-select: none;
  width: 1em;
  height: 1em;
  display: inline-block;
  fill: ${({ $checked, theme }) => ($checked ? theme.colors.primary : '#868686')};
  flex-shrink: 0;
  transition: fill 200ms ease;
  -webkit-flex-shrink: 0;
  -ms-flex-negative: 0;
  -webkit-transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
`

const Label = styled.label`
  color: inherit;
  font-size: inherit;
  font-weight: 500;
  padding-left: 5px;
`

const uncheckedPath = (
  <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
)

const checkedPath = (
  <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
)

const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, ...restProps }) => {
  const [field] = useField(restProps)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(event)
    field.onChange(event)
  }

  return (
    <Wrapper>
      <BaseCheckbox type="checkbox" {...field} {...restProps} onChange={handleChange} />
      <Icon $checked={field.value} focusable="false" viewBox="0 0 24 24">
        {field.value ? checkedPath : uncheckedPath}
      </Icon>
      {label && <Label>{label}</Label>}
    </Wrapper>
  )
}

export default Checkbox
