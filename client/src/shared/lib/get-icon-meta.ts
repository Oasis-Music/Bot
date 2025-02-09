import { type SpritesMap, SPRITES_META } from './sprite.gen'

export type IconName<Key extends keyof SpritesMap> = `${Key}/${SpritesMap[Key]}`
/**
 * A function to get and process icon metadata.
 * It was moved out of the Icon component to prevent type inference issues.
 */
export const getIconMeta = <Key extends keyof SpritesMap>(name: IconName<Key>) => {
  const [spriteName, iconName] = name.split('/') as [Key, SpritesMap[Key]]
  const {
    filePath,
    items: {
      [iconName]: { viewBox, width, height }
    }
  } = SPRITES_META[spriteName]
  const axis = width === height ? 'xy' : width > height ? 'x' : 'y'

  return { filePath, iconName, viewBox, axis }
}
