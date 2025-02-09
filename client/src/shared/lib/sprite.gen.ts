export interface SpritesMap {
  common: 'angle-arrow' | 'list-music' | 'search' | 'settings'
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
  common: {
    filePath: 'common.5c22d149.svg',
    items: {
      'angle-arrow': {
        viewBox: '0 0 320 512',
        width: 320,
        height: 512
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
      },
      settings: {
        viewBox: '0 0 20 20',
        width: 20,
        height: 20
      }
    }
  }
}
