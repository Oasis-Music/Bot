import { ReactNode } from 'react'
import { Button } from '@/shared/ui/button'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from '@tanstack/react-router'

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

    navigate({ to: '/' })
  }

  return (
    <Button color="secondary" onClick={handleClick} className="bg-transparent underline">
      {children}
    </Button>
  )
}
