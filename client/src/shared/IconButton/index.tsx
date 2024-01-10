import React from 'react'
import styled, { css } from 'styled-components'
import Loader from '@/shared/Loader'

enum ButtonColor {
  primary = 'primary',
  secondary = 'secondary',
  success = 'success',
  danger = 'danger'
}

interface BottonProps {
  to?: string
  color?: 'primary' | 'secondary' | 'success' | 'danger'
  type?: 'button' | 'reset' | 'submit'
  children: React.ReactNode
  loading?: boolean
  disabled?: boolean
  withoutShadow?: boolean
  onClick?(event: React.MouseEvent<HTMLButtonElement>): void
}

interface BaseButtonProps {
  $withoutShadow: boolean
  $color: ButtonColor
}

const BaseButton = styled.button<BaseButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 50%;
  border: none;
  transition: all 0.3s;
  -webkit-tap-highlight-color: transparent;
  &:disabled {
    cursor: not-allowed;
    pointer-events: initial;
    opacity: 0.7;
  }
  ${({ $withoutShadow }) =>
    $withoutShadow
      ? css`
          box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.3);
        `
      : css`
          box-shadow: none;
        `}
  ${({ $color, theme }) => {
    switch ($color) {
      case ButtonColor.primary:
        return css`
          color: ${theme.colors.primary};
          background-color: #363636;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #323232;
          }
        `
      case ButtonColor.secondary:
        return css`
          color: #343434;
          background-color: ${theme.colors.primary};
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #fff128;
          }
        `
      case ButtonColor.success:
        return css`
          color: #343434;
          background-color: #32cd32;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #45ff45;
          }
        `
      case ButtonColor.danger:
        return css`
          color: #343434;
          background-color: #f44336;
          &:hover:not(:disabled) {
            cursor: pointer;
            background-color: #f2554a;
          }
        `
    }
  }}
`

const IconButton: React.FC<BottonProps> = ({
  loading,
  children,
  color = ButtonColor.primary,
  withoutShadow = false,
  type = 'button',
  ...otherProps
}: BottonProps) => {
  return (
    <BaseButton
      $color={color as ButtonColor}
      $withoutShadow={!withoutShadow}
      type={type}
      {...otherProps}
    >
      {loading ? <Loader dark={color !== ButtonColor.primary} /> : children}
    </BaseButton>
  )
}

export default IconButton
