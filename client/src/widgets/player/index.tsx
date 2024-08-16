import { forwardRef, ComponentPropsWithRef, ForwardRefRenderFunction } from 'react'
import clsx from 'clsx'
import Trackline from './Trackline'
import { TopControls } from './TopControls'
import { Details } from './Details'
import { Controls } from './Controls'
import { timeFormater } from '@/shared/lib/helpers'
import { useReactiveVar } from '@apollo/client'
import { currentTrackVar } from '@/entities/soundtrack'

import styles from './player.module.scss'

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
    <div className={clsx(styles.player, isOpen && styles.open)}>
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
      <Controls
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
