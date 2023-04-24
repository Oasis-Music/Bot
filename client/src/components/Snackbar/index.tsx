import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import { useReactiveVar } from '@apollo/client'
import { isSnackbarOpenVar, snackbarEventVar } from '../../apollo/cache/variables'
import { UiMutations } from '../../apollo/cache/mutations'

interface containerStyles {
  $open: boolean
  $type: 'error' | 'success'
}

const Container = styled.div<containerStyles>`
  position: fixed;
  z-index: 1000;
  width: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  bottom: ${({ $open }) => ($open ? '17%' : '-10%')};
  color: #fff;
  border: 2px solid;
  border-radius: 6px;
  padding: 15px 15px 15px 20px;
  font-weight: 500;
  transition: all 0.2s;
  & > p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ${({ $type }) => {
    switch ($type) {
      case 'success':
        return css`
          border-color: #006f00;
          background-color: #2bab2b;
        `
      case 'error':
        return css`
          border-color: #9b0000;
          background-color: #ff3131;
        `
      default:
        return css`
          background-color: #bfbfbf;
        `
    }
  }}
`

const Snackbar: React.FC = () => {
  const isOpen = useReactiveVar(isSnackbarOpenVar)
  const event = useReactiveVar(snackbarEventVar)

  const handleSnackbarClick = () => {
    UiMutations.closeSnackbar()
  }

  useEffect(() => {
    const t = setTimeout(() => {
      UiMutations.closeSnackbar()
    }, 5000)

    return () => {
      clearTimeout(t)
    }
  }, [isOpen])

  return (
    <Container $open={isOpen} $type={event.type} onClick={handleSnackbarClick}>
      <p>{event.message}</p>
    </Container>
  )
}

export default Snackbar
