import { forwardRef, ComponentPropsWithRef, ForwardRefRenderFunction } from 'react'

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
      <div className="mt-10 mb-4 px-4">
        <div ref={waveContainerRef} />
      </div>
      <div className="mt-2.5 flex justify-between px-5 text-sm font-medium text-gray-500">
        <span>{currentTime}</span>
        <span>{duration}</span>
      </div>
    </div>
  )
}

export default forwardRef(Trackline)
