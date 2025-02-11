import { Loader } from '@/shared/ui/loader'

export function Fallback() {
  return (
    <div className="flex h-screen items-center justify-center">
      <Loader />
    </div>
  )
}
