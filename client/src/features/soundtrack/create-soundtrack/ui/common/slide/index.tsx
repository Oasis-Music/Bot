export function StepSlide({ children, width }: { children: React.ReactNode; width: number }) {
  return <div style={{ width: width + 'px', minHeight: '100vh', flexShrink: 0 }}>{children}</div>
}
