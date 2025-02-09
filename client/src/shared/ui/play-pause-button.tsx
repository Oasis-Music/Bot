import { cva } from 'cva'
import { IconButton } from './icon-button'
import { Icon } from './icon'

const button = cva('relative', {
  variants: {
    view: {
      plain: 'bg-[#1b1818]! p-5 text-[20px] text-white',
      attractive: 'shadow-white-glow bg-white p-5 text-[23px] text-black disabled:shadow-none'
    }
  }
})

const icon = cva('', {
  variants: {
    pause: {
      true: 'left-[50%] translate-x-[12%]',
      false: ''
    }
  }
})

export function PlayPauseButtonUI({
  isPlaying,
  variant,
  disabled,
  onClick
}: {
  variant: 'plain' | 'attractive'
  isPlaying: boolean
  disabled?: boolean
  onClick(): void
}) {
  return (
    <IconButton disabled={disabled} onClick={onClick} className={button({ view: variant })}>
      <Icon
        name={`common/${isPlaying ? 'pause' : 'play'}`}
        className={icon({ pause: !isPlaying })}
      />
    </IconButton>
  )
}
