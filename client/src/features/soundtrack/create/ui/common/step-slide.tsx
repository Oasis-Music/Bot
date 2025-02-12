import { type ReactNode } from 'react'

export function StepSlide({ children, width }: { children: ReactNode; width: number }) {
  return (
    <div className="min-h-screen shrink-0" style={{ width: width + 'px' }}>
      {children}
    </div>
  )
}
