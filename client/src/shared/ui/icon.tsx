import clsx from 'clsx'
import type { SVGProps } from 'react'
import { SPRITES_META, type SpritesMap } from '@/shared/lib/sprite.gen'
import { getIconMeta } from '@/shared/lib/get-icon-meta'

// Our icon will extend an SVG element and accept all its props
export interface IconProps extends SVGProps<SVGSVGElement> {
  name: AnyIconName
}

// Merging all possible icon names as `sprite/icon` string
export type AnyIconName = { [Key in keyof SpritesMap]: IconName<Key> }[keyof SpritesMap]

// Icon name for a specific sprite, e.g. "common/left"
export type IconName<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`

export function Icon({ name, className, ...props }: IconProps) {
  const { viewBox, filePath, iconName, axis } = getIconMeta(name)

  return (
    <svg
      // "icon" isn't inlined because of data-axis attribute
      className={clsx('icon', className)}
      viewBox={viewBox}
      /**
       * This prop is used by the "icon" class to set the icon's scaled size
       * @see https://github.com/secundant/neodx/issues/92
       */
      data-axis={axis}
      // prevent icon from being focused when using keyboard navigation
      focusable="false"
      // hide icon from screen readers
      aria-hidden
      {...props}
    >
      {/* For example, "/sprites/common.svg#favourite". Change a base path if you don't store sprites under the "/sprites". */}
      <use href={`/sprites/${filePath}#${iconName}`} />
    </svg>
  )
}
