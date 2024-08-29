import { ReactNode } from 'react'

export function StepSlide({ children, width }: { children: ReactNode; width: number }) {
  return <div style={{ width: width + 'px', minHeight: '100vh', flexShrink: 0 }}>{children}</div>
}
