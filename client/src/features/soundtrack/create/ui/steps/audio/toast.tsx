import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { type ReactNode } from 'react'
import { toast } from 'sonner'

export const soundtrackExistsToast = ({ soundtrack }: { soundtrack: ReactNode }) => {
  toast.custom(
    (t) => (
      <div className="relative border border-white bg-black px-1 py-2 text-white">
        <p className="py-2 text-sm font-medium">Трек уже существует</p>
        <div className="rounded-md bg-gray-800">{soundtrack}</div>
        <IconButton
          onClick={() => toast.dismiss(t)}
          className="absolute top-2.5 right-2.5 rotate-45 p-0! text-[13px]"
        >
          <Icon name="common/play" />
        </IconButton>
      </div>
    ),
    {
      duration: Infinity
    }
  )
}
