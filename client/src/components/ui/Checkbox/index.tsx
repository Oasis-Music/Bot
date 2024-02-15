import React from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useField } from 'formik'

interface CheckboxProps {
  name: string
  value?: string
  checked?: boolean
  label?: string
  onChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

const wave = keyframes`
  50% {
    transform: scale(0.9);
  }
`

const LabelText = styled.span`
  color: inherit;
  font-size: inherit;
  font-weight: 500;
  padding-left: 11px;
`

const Input = styled.input`
  position: absolute;
  visibility: hidden;
  display: none;
`

const Box = styled.span<{ $checked: boolean }>`
  position: relative;
  display: block;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  transform: scale(1);
  border: 2px solid #dcdcdc;
  transition: all 0.2s ease;
  box-shadow: 0 1px 1px rgba(0, 16, 75, 0.05);

  & svg {
    position: absolute;
    top: 4px;
    left: 3px;
    fill: none;
    stroke: #101318;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 16px;
    stroke-dashoffset: 16px;
    transition: all 0.3s ease;
    transition-delay: 0.1s;
    transform: translate3d(0, 0, 0);
  }
  ${({ $checked }) =>
    $checked &&
    css`
      background: ${({ theme }) => theme.colors.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      animation: ${wave} 0.4s ease;
      & svg {
        stroke-dashoffset: 0;
      }
    `};
`

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  user-select: none;
  transition: all 0.2s ease;
  padding: 5px 8px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    & > span {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }
`

export function Checkbox({ name, value, label, onChange, checked = false }: CheckboxProps) {
  const [field] = useField({ name, value, type: 'checkbox' })

  const isChecked = field.checked || checked

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(event)
    if (onChange) onChange(event)
  }

  return (
    <Label>
      <Input type="checkbox" {...field} onChange={handleChange} />
      <Box $checked={isChecked}>
        <svg width="14px" height="12px" viewBox="0 0 12 10">
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </Box>
      {label && <LabelText>{label}</LabelText>}
    </Label>
  )
}
