import { useState, useEffect } from 'react'
import { cva } from 'cva'
import { Icon } from './icon'
import LazyLoad from 'react-lazy-load'

export interface ImagePlaceholderProps {
  src?: string | null
  altText: string
  plain?: boolean
  backgroundColor?: string
}

const wrapper = cva('relative h-auto translate-z-[0] overflow-hidden pt-[100%]', {
  variants: {
    plain: {
      true: 'h-full pt-0'
    }
  }
})

const plugWrapper = cva('absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center')

const image = cva(
  'absolute top-0 right-0 bottom-0 left-0 max-h-full max-w-full object-cover select-none'
)

const shineBox = cva('size-full rounded-2xl')

export function ImagePlaceholder({
  src,
  altText,
  backgroundColor,
  plain = false
}: ImagePlaceholderProps) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [src])

  const placeholderPlug = (
    <div
      className={image()}
      style={{
        borderRadius: plain ? '10px' : '15px'
      }}
    >
      <div
        className={shineBox()}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#15191e',
          borderRadius: plain ? '10px' : '15px'
        }}
      />
      <div className={plugWrapper()}>
        <Icon name="common/music" />
      </div>
    </div>
  )

  const plainPlug = (
    <div
      className={shineBox()}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#15191e',
        borderRadius: plain ? '10px' : '15px'
      }}
    />
  )

  if (!src || error) {
    return <div className={wrapper({ plain })}>{plain ? plainPlug : placeholderPlug}</div>
  }

  const handleImageLoadErr = () => {
    setError(true)
  }

  return (
    <LazyLoad className={wrapper({ plain })}>
      <img
        className={image()}
        style={{
          borderRadius: plain ? '10px' : '15px'
        }}
        src={src}
        alt={altText}
        onError={handleImageLoadErr}
      />
    </LazyLoad>
  )
}
