import styled from 'styled-components'
import IconButton from '@/components/ui/IconButton'
import { Form, Field } from 'formik'

const borderRadius = '10px'

export const Container = styled(Form)`
  display: flex;
  padding: 20px 10px;
`

export const SearchField = styled(Field)`
  padding: 0 10px 0 15px;
  width: 100%;
  background-color: #3c4144;
  border: none;
  border-top-left-radius: ${borderRadius};
  border-bottom-left-radius: ${borderRadius};
  outline: none;
  font-size: 15px;
  color: #fff;
  font-weight: 500;
`

export const SearchButton = styled(IconButton)`
  padding: 16px 20px;
  border-radius: 0;
  background-color: #3c4144;
  color: #c3c3c3;

  border-top-right-radius: ${borderRadius};
  border-bottom-right-radius: ${borderRadius};
  outline: none;
  &:hover:not(:disabled) {
    color: #fff;
    background-color: #3c4144;
  }
  &:focus {
    color: ${({ theme }) => theme.colors.primary};
  }
`
