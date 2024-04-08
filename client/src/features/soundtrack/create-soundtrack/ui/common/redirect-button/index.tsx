import Button from '@/shared/ui/button'
import { useFormContext } from 'react-hook-form'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router-dom'

import styles from './styles.module.scss'

interface RedirectButtonProps {
  onAlert(): void
  children: React.ReactNode
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
    <Button onClick={handleClick} className={styles.redirectButton}>
      {children}
    </Button>
  )
}
