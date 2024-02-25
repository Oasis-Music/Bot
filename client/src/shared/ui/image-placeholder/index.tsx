import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import LazyLoad from 'react-lazy-load'
import PlaceholderImage from '@/assets/svg/music.svg?react'
import { SvgIcon } from '@/shared/ui/svg-icon'

import styles from './imagePlaceholder.module.scss'

export interface ImagePlaceholderProps {
  src: string
  altText: string
  plain?: boolean
  backgroundColor?: string
}

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
      className={styles.imageStyles}
      style={{
        borderRadius: plain ? '10px' : '15px'
      }}
    >
      <div
        className={styles.shineBox}
        style={{
          backgroundColor: backgroundColor ? backgroundColor : '#15191e',
          borderRadius: plain ? '10px' : '15px'
        }}
      />
      <div className={styles.imageWrapper}>
        <SvgIcon className={styles.plugIcon}>
          <PlaceholderImage />
        </SvgIcon>
      </div>
    </div>
  )

  const plainPlug = (
    <div
      className={styles.shineBox}
      style={{
        backgroundColor: backgroundColor ? backgroundColor : '#15191e',
        borderRadius: plain ? '10px' : '15px'
      }}
    />
  )

  if (src === '' || error) {
    return (
      <div className={clsx(styles.wrapper, plain && styles.plain)}>
        {plain ? plainPlug : placeholderPlug}
      </div>
    )
  }

  const handleImageLoadErr = () => {
    setError(true)
  }

  return (
    <LazyLoad className={clsx(styles.wrapper, plain && styles.plain)}>
      <img
        className={styles.imageStyles}
        style={{
          opacity: 1,
          borderRadius: plain ? '10px' : '15px'
        }}
        src={src}
        alt={altText}
        onError={handleImageLoadErr}
      />
    </LazyLoad>
  )
}
