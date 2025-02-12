import { Button } from '@/shared/ui/button'
import { Icon } from '@/shared/ui/icon'

export function BackButton({ onClick }: { onClick(): void }) {
  return (
    <Button
      color="secondary"
      onClick={onClick}
      className="px-3.5! py-0! text-sm"
      startIcon={<Icon name="common/angle-arrow" className="rotate-90 text-[20px]" />}
    >
      Назад
    </Button>
  )
}
