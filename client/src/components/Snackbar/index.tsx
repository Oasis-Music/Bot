import React, { useEffect } from 'react'
import styled, { css } from 'styled-components'
import SvgIcon from '../../shared/SvgIcon'
import { ReactComponent as CheckIcon } from '../../assets/svg/check-circle.svg'
import { ReactComponent as TimesIcon } from '../../assets/svg/times-circle.svg'
import { useReactiveVar } from '@apollo/client'
import { isSnackbarOpenVar, snackbarEventVar } from '../../apollo/cache/variables'
import { UiMutations } from '../../apollo/cache/mutations'

type eventType = 'error' | 'success'

const Container = styled.div<{ $open: boolean }>`
  position: fixed;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  z-index: 1000;
  width: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: ${({ $open }) => ($open ? '1' : '0')};
  bottom: ${({ $open }) => ($open ? '17%' : '-10%')};
  color: #1e1e1e;
  border-radius: 8px;
  padding: 12px 15px;
  font-weight: 500;
  transition: all 0.2s;
  & > p {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`

const IconWrapper = styled.div<{ $type: eventType }>`
  padding: 7px;
  border-radius: 8px;
  margin-right: 10px;
  ${({ $type }) => {
    switch ($type) {
      case 'success':
        return css`
          background-color: #2bab2b;
        `
      case 'error':
        return css`
          background-color: #ff3131;
        `
      default:
        return css`
          color: #bfbfbf;
        `
    }
  }}
`

const SideIcon = styled(SvgIcon)`
  display: block;
  color: #f0f0f0;
`

const NOTIFICATION_ICON = {
  success: CheckIcon,
  error: TimesIcon
}

const Snackbar: React.FC = () => {
  const isOpen = useReactiveVar(isSnackbarOpenVar)
  const event = useReactiveVar(snackbarEventVar)

  const Icon = NOTIFICATION_ICON[event.type]

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
    <Container $open={isOpen} onClick={handleSnackbarClick}>
      <div>
        <IconWrapper $type={event.type}>
          <SideIcon>
            <Icon />
          </SideIcon>
        </IconWrapper>
      </div>
      <p>{event.message}</p>
    </Container>
  )
}

export default Snackbar
