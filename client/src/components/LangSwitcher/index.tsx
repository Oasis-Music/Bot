import React from 'react'
import styled from 'styled-components'
import { useLang } from '@/hooks'

const Switch = styled.div`
  position: relative;
  width: 130px;
  height: 50px;
  border-radius: 25px;
`

const Input = styled.input`
  margin: 3px 3px 3px 3px;
  appearance: none;
  width: 130px;
  height: 50px;
  border-radius: 25px;
  background-color: #343434;
  outline: none;
  transition: 0.25s;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  &::before,
  &::after {
    z-index: 2;
    position: absolute;
    top: 54%;
    transform: translateY(-50%);
    font-weight: 500;
  }

  &::before {
    content: 'Ru';
    left: 21px;
  }
  &::after {
    content: 'En';
    right: 21px;
  }

  &:checked {
    background-color: ${({ theme }) => theme.colors.primary};
  }

  &:checked::after,
  &:checked::before {
    color: #fff;
    transition: color 0.5s;
  }

  &:checked + label {
    left: 10px;
    right: 80px;
    background-color: #1e1e1e;
    transition:
      left 0.5s,
      right 0.5s 0.2s;
  }

  &:not(:checked) {
    background-color: #1e1e1e;
    transition: background-color 0.4s;
  }

  &:not(:checked)::before {
    color: #fff;
    transition: color 0.5s;
  }

  &:not(:checked)::after {
    color: #1e1e1e;
    transition: color 0.5s 0.2s;
  }

  &:not(:checked) + label {
    left: 80px;
    right: 10px;
    background: ${({ theme }) => theme.colors.primary};
    transition:
      left 0.4s 0.2s,
      right 0.5s,
      background 0.35s;
  }
`

const Label = styled.label`
  z-index: 1;
  position: absolute;
  top: 10px;
  bottom: 4px;
  border-radius: 20px;
`

export function LangSwitcher() {
  const [lng, changeLang] = useLang()

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeLang(e.target.checked ? 'ru' : 'en')
  }

  return (
    <Switch>
      <Input
        id="lng-swithc"
        type="checkbox"
        onChange={checkHandler}
        defaultChecked={lng === 'ru'}
      />
      <Label htmlFor="lng-swithc" />
    </Switch>
  )
}
