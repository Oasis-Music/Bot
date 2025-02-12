import { forwardRef, ComponentPropsWithRef, ForwardRefRenderFunction } from 'react'
import { cva } from 'cva'
import Trackline from './trackline'
import { TopControls } from './top-controls'
import { Details } from './Details'
import { MainControls } from './main-controls'
import { timeFormater } from '@/shared/lib/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

interface PlayerProps extends ComponentPropsWithRef<'div'> {
  currentTime: string
  isOpen: boolean
  isReadyForPlay: boolean
  withLoop: boolean
  withRandom: boolean
  onClose(): void
  onPlayPause(): void
  onPlayNext(): void
  onPlayPrev(): void
  onLoop(): void
  onRandom(): void
}

const player = cva(
  'fixed top-0 left-0 z-50 h-full w-full overflow-y-auto bg-black transition-transform',
  {
    variants: {
      open: {
        true: 'translate-y-px',
        false: 'translate-y-full'
      }
    }
  }
)

const Player: ForwardRefRenderFunction<HTMLDivElement, PlayerProps> = (
  {
    isOpen,
    currentTime,
    isReadyForPlay,
    withLoop,
    withRandom,
    onPlayPause,
    onPlayNext,
    onPlayPrev,
    onLoop,
    onRandom,
    onClose
  },
  waveContainerRef
) => {
  const currentTrack = useReactiveVar(currentTrackVar)

  return (
    <div className={player({ open: isOpen })}>
      <TopControls id={currentTrack.id} onClose={onClose} />
      <Details
        title={currentTrack.title}
        author={currentTrack.author}
        coverImage={currentTrack.coverURL}
      />
      <Trackline
        ref={waveContainerRef}
        currentTime={currentTime}
        duration={timeFormater(currentTrack.duration)}
      />
      <MainControls
        readyForPlay={isReadyForPlay}
        withLoop={withLoop}
        withRandom={withRandom}
        onPlayPause={onPlayPause}
        onPlayNext={onPlayNext}
        onPlayPrev={onPlayPrev}
        onLoop={onLoop}
        onRandom={onRandom}
      />
    </div>
  )
}

export default forwardRef(Player)
