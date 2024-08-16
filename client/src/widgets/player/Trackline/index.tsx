import { forwardRef, ComponentPropsWithRef, ForwardRefRenderFunction } from 'react'
import styles from './Trackline.module.scss'

interface TracklineProps extends ComponentPropsWithRef<'div'> {
  currentTime: string
  duration: string
}

const Trackline: ForwardRefRenderFunction<HTMLDivElement, TracklineProps> = (
  { currentTime, duration },
  waveContainerRef
) => {
  return (
    <div>
      <div className={styles.waveWrapper}>
        <div ref={waveContainerRef} />
      </div>
      <div className={styles.timings}>
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  )
}

export default forwardRef(Trackline)
