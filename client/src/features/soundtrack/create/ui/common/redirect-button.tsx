import { ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import { useFormContext } from 'react-hook-form'
import { ROUTER_NAMES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router-dom'

export function RedirectButton({ onAlert, children }: { onAlert(): void; children: ReactNode }) {
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
    <Button color="secondary" onClick={handleClick} className="bg-transparent underline">
      {children}
    </Button>
  )
}
