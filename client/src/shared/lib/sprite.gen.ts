export interface SpritesMap {
  action: 'trash'
  common:
    | 'angle-arrow'
    | 'arrow-alt'
    | 'list-music'
    | 'pause'
    | 'play'
    | 'random'
    | 'repeat'
    | 'search'
    | 'settings'
  other: 'file-mp3'
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
  action: {
    filePath: 'action.8daedcba.svg',
    items: {
      trash: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      }
    }
  },
  common: {
    filePath: 'common.0b383065.svg',
    items: {
      'angle-arrow': {
        viewBox: '0 0 320 512',
        width: 320,
        height: 512
      },
      'arrow-alt': {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      'list-music': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      pause: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      play: {
        viewBox: '0 0 448 512',
        width: 448,
        height: 512
      },
      random: {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      },
      repeat: {
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
  },
  other: {
    filePath: 'other.03a6a34f.svg',
    items: {
      'file-mp3': {
        viewBox: '0 0 512 512',
        width: 512,
        height: 512
      }
    }
  }
}
