import { cva } from 'cva'
import { Icon } from '@/shared/ui/icon'
import { IconButton } from '@/shared/ui/icon-button'
import { PlayPauseButton } from '@/features/soundtrack/play-pause'

export interface ControlsProps {
  readyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
}

const subControl = cva('text-[20px]', {
  variants: {
    enabled: {
      true: 'text-white',
      false: 'text-gray-500'
    }
  }
})

export function MainControls({
  withLoop,
  withRandom,
  readyForPlay,
  onPlayPause,
  onPlayNext,
  onPlayPrev,
  onLoop,
  onRandom
}: ControlsProps) {
  return (
    <div className="mt-2.5 flex justify-around">
      <IconButton onClick={onRandom} className={subControl({ enabled: withRandom })}>
        <Icon name="common/random" />
      </IconButton>
      {/*  */}
      <IconButton onClick={onPlayPrev} className="rotate-180 text-[26px]">
        <Icon name="common/arrow-alt" />
      </IconButton>
      {/*  */}
      <PlayPauseButton variant="attractive" disabled={!readyForPlay} onClick={onPlayPause} />
      {/*  */}
      <IconButton onClick={onPlayNext} className="text-[26px]">
        <Icon name="common/arrow-alt" />
      </IconButton>
      {/*  */}
      <IconButton onClick={onLoop} className={subControl({ enabled: withLoop })}>
        <Icon name="common/repeat" />
      </IconButton>
    </div>
  )
}
