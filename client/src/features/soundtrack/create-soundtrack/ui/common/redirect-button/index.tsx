import { ReactNode } from 'react'
import Button from '@/shared/ui/button'
import { useFormContext } from 'react-hook-form'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'

interface RedirectButtonProps {
  onAlert(): void
  children: ReactNode
}

export function RedirectButton({ onAlert, children }: RedirectButtonProps) {
  const navigate = useNavigate()

  const {
    formState: { isDirty }
  } = useFormContext()

  const handleClick = () => {
    if (isDirty) {
      onAlert()
      return
    }

    navigate(ROUTER_NAMES.root)
  }

  return (
    <Button color="secondary" onClick={handleClick} className={styles.redirectButton}>
      {children}
    </Button>
  )
}
