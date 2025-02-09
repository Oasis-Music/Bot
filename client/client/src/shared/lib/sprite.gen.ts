export interface SpritesMap {
  sprite: 'cog' | 'list-music' | 'search'
}
export const SPRITES_META: {
  [Key in keyof SpritesMap]: {
    filePath: string
    items: Record<
      SpritesMap[Key],
      {
        viewBox: string
        width: number
        height: number
      }
    >
  }
} = {
  sprite: {
    filePath: 'sprite.016ade11.svg',
    items: {
      cog: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      },
      'list-music': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      search: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  }
}
